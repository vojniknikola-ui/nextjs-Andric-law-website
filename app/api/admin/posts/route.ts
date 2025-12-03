import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { getDb, cmsPosts } from '@/db';
import { parseSmartBlog, generateSlug, autoFormatContent } from '@/lib/smartParsers';

function isAuthorized(request: Request) {
  // Autorizacija nije potrebna (otključano po zahtjevu)
  return true;
}

function parseCookies(header: string | null): Record<string, string> | null {
  if (!header) return null;
  return header.split(';').reduce((acc, part) => {
    const [k, ...v] = part.split('=');
    if (!k || !v.length) return acc;
    acc[k.trim()] = v.join('=').trim();
    return acc;
  }, {} as Record<string, string>);
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function stripMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .trim();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  const db = getDb();
  const query = db
    .select()
    .from(cmsPosts)
    .orderBy(desc(cmsPosts.publishedAt), desc(cmsPosts.createdAt));

  if (slug) {
    const [item] = await query.where(eq(cmsPosts.slug, slug));
    if (!item) {
      return NextResponse.json({ error: 'Članak nije pronađen.' }, { status: 404 });
    }
    return NextResponse.json({ item });
  }

  const posts = await query;
  return NextResponse.json({ items: posts });
}

export async function POST(request: Request) {
  // Authorization disabled

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  const payload = await request.json().catch(() => ({}));
  const rawContent = (payload.content ?? payload.contentMd ?? '').toString();
  const rawTitle = (payload.title ?? '').toString().trim();
  const rawSlug = (payload.slug ?? '').toString().trim();
  
  if (!rawContent) {
    return NextResponse.json({ error: 'Sadržaj je obavezan.' }, { status: 400 });
  }

  // Use smart parsing if no title/slug provided
  const shouldUseSmart = !rawTitle || !rawSlug;
  let title = rawTitle;
  let slug = rawSlug;
  let contentMd = rawContent;
  let excerpt = payload.excerpt;
  let tags = parseTags(payload.tags);
  let readMinutes = Number(payload.readMinutes ?? 3);

  if (shouldUseSmart) {
    const formatted = autoFormatContent(rawContent);
    const parsed = parseSmartBlog(formatted);
    
    title = title || parsed.title;
    slug = slug || generateSlug(title);
    contentMd = parsed.content;
    excerpt = excerpt || parsed.excerpt;
    tags = tags.length > 0 ? tags : parsed.tags;
    readMinutes = parsed.readMinutes;
  }

  const publishedAt = payload.publishedAt ? new Date(payload.publishedAt) : new Date();
  
  if (!slug || !title) {
    return NextResponse.json({ error: 'slug i title su obavezni.' }, { status: 400 });
  }

  const db = getDb();
  try {
    const [created] = await db
      .insert(cmsPosts)
      .values({
        slug,
        title,
        excerpt,
        contentMd,
        tags,
        heroImageUrl: payload.heroImageUrl ?? payload.image ?? null,
        featured: Boolean(payload.featured),
        isLawDocument: Boolean(payload.isLawDocument),
        canonicalUrl: payload.canonicalUrl ?? null,
        readMinutes,
        lawSlug: payload.lawSlug ?? null,
        lawMeta: payload.lawMeta ?? null,
        authorName: payload.authorName ?? 'Andrić Law',
        authorRole: payload.authorRole ?? 'Advokatski ured',
        publishedAt,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    const message = error?.message || 'Neuspjelo spremanje posta.';
    if (message.includes('cms_post_slug_idx')) {
      return NextResponse.json({ error: 'Slug već postoji.' }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Authorization disabled
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }
  const payload = await request.json().catch(() => ({}));
  const slug = (payload.slug ?? '').toString().trim();
  if (!slug) return NextResponse.json({ error: 'slug je obavezan.' }, { status: 400 });

  const db = getDb();
  try {
    const [updated] = await db
      .update(cmsPosts)
      .set({
        title: payload.title ? stripMarkdown(payload.title) : undefined,
        excerpt: payload.excerpt,
        contentMd: payload.content ?? payload.contentMd,
        tags: parseTags(payload.tags),
        heroImageUrl: payload.heroImageUrl ?? payload.image ?? null,
        featured: payload.featured ?? undefined,
        isLawDocument: payload.isLawDocument ?? undefined,
        canonicalUrl: payload.canonicalUrl ?? null,
        readMinutes: payload.readMinutes ?? undefined,
        lawSlug: payload.lawSlug ?? null,
        lawMeta: payload.lawMeta ?? null,
        authorName: payload.authorName ?? undefined,
        authorRole: payload.authorRole ?? undefined,
        publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(cmsPosts.slug, slug))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Post nije pronađen.' }, { status: 404 });
    }

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error('[posts] update error', error);
    return NextResponse.json({ error: 'Neuspjelo ažuriranje.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  // Authorization disabled
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }
  const payload = await request.json().catch(() => ({}));
  const slug = (payload.slug ?? '').toString().trim();
  if (!slug) return NextResponse.json({ error: 'slug je obavezan.' }, { status: 400 });

  const db = getDb();
  await db.delete(cmsPosts).where(eq(cmsPosts.slug, slug));
  return NextResponse.json({ ok: true });
}
