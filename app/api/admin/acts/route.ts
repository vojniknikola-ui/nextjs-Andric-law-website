import { NextResponse } from 'next/server';
import { asc, eq } from 'drizzle-orm';
import { getDb, acts, provisions } from '@/db';
import { parseSmartLaw, generateSlug, autoFormatContent } from '@/lib/smartParsers';

function isAuthorized() {
  // Autorizacija nije potrebna (otključano po zahtjevu)
  return true;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'object' && error && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message) return message;
  }
  return fallback;
}

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')?.trim();
  if (!slug) {
    return NextResponse.json({ error: 'slug je obavezan.' }, { status: 400 });
  }

  const db = getDb();
  const [act] = await db.select().from(acts).where(eq(acts.slug, slug));
  if (!act) {
    return NextResponse.json({ error: 'Zakon nije pronađen.' }, { status: 404 });
  }

  const provisionsRows = await db
    .select({
      heading: provisions.heading,
      content: provisions.content,
      orderIndex: provisions.orderIndex,
    })
    .from(provisions)
    .where(eq(provisions.actId, act.id))
    .orderBy(asc(provisions.orderIndex));

  const lawText = provisionsRows
    .map((row) => {
      const heading = row.heading?.trim();
      const content = row.content?.trim();
      if (heading && content) return `${heading}\n${content}`;
      if (heading) return heading;
      return content ?? '';
    })
    .filter(Boolean)
    .join('\n\n');

  return NextResponse.json({
    act,
    lawText,
    provisionCount: provisionsRows.length,
  });
}

export async function POST(request: Request) {
  if (!isAuthorized()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  const payload = await request.json().catch(() => ({}));
  const rawSlug = (payload.slug ?? '').toString().trim();
  const rawTitle = (payload.title ?? '').toString().trim();
  const baseSlug = generateSlug(rawSlug || rawTitle || 'novi-zakon');
  const title = rawTitle || baseSlug || 'Novi zakon';
  const lawText = autoFormatContent((payload.lawText ?? payload.content ?? '').toString());
  const publishedAt = formatDateInput(payload.publishedAt);

  if (!baseSlug || !title || !lawText) {
    return NextResponse.json({ error: 'slug, title i lawText su obavezni.' }, { status: 400 });
  }

  const db = getDb();
  const now = new Date();

  try {
    const uniqueSlug = await ensureUniqueSlug(db, baseSlug);

    const [createdAct] = await db
      .insert(acts)
      .values({
        slug: uniqueSlug,
        title,
        jurisdiction: payload.jurisdiction ?? 'BiH',
        status: payload.status ?? 'active',
        officialNumber: payload.officialNumber ?? null,
        officialUrl: payload.officialUrl ?? null,
        summary: payload.summary ?? null,
        publishedAt,
        updatedAt: now,
      })
      .returning();

    const sections = parseSmartLaw(lawText);
    if (sections.length > 0) {
      await db.insert(provisions).values(
        sections.map((section) => ({
          actId: createdAct.id,
          provisionKey: section.id,
          heading: section.title,
          level: section.type,
          path: `#${section.id}`,
          orderIndex: section.orderIndex,
          validFrom: publishedAt,
          content: section.content,
          plainContent: section.content,
          createdAt: now,
        })),
      );
    }

    return NextResponse.json({
      act: createdAct,
      provisionsInserted: sections.length,
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error, 'Neuspjelo spremanje zakona.');
    if (message.includes('act_slug_idx')) {
      return NextResponse.json({ error: 'Zakon sa ovim slugom već postoji.' }, { status: 409 });
    }
    console.error('[acts] insert error', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function formatDateInput(value: unknown): string {
  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}



async function ensureUniqueSlug(db: ReturnType<typeof getDb>, base: string) {
  let candidate = base || 'novi-zakon';
  let suffix = 2;
  // quick check if exists
  const existing = await db.query.acts.findFirst({ where: (acts, { eq }) => eq(acts.slug, candidate) });
  while (existing) {
    const next = `${base}-${suffix}`;
    const existsNext = await db.query.acts.findFirst({ where: (acts, { eq }) => eq(acts.slug, next) });
    if (!existsNext) {
      candidate = next;
      break;
    }
    suffix += 1;
  }
  return candidate;
}
