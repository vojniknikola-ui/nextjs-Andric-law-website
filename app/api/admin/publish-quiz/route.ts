import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { cmsPosts, getDb } from '@/db';
import { prestajeMiUgovorKvizPost } from '@/content/blog/prestaje-mi-ugovor-o-radu-fbih-kviz';

function toPublishedDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return parsed.toISOString().slice(0, 10);
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'object' && error && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message) return message;
  }
  return fallback;
}

export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  const post = prestajeMiUgovorKvizPost;
  const publishedAt = toPublishedDate(post.date);
  const now = new Date();

  const values = {
    id: randomUUID(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    contentMd: post.content,
    tags: post.tags,
    heroImageUrl: post.image ?? null,
    featured: Boolean(post.featured),
    isLawDocument: Boolean(post.isLawDocument),
    canonicalUrl: post.canonicalUrl ?? null,
    readMinutes: post.readMinutes ?? 3,
    lawSlug: post.lawSlug ?? null,
    lawMeta: post.lawMeta ?? null,
    authorName: post.author?.name ?? 'Andrić Law',
    authorRole: post.author?.role ?? 'Advokatski ured',
    publishedAt,
    createdAt: now,
    updatedAt: now,
  };

  const db = getDb();
  try {
    const [item] = await db
      .insert(cmsPosts)
      .values(values)
      .onConflictDoUpdate({
        target: cmsPosts.slug,
        set: {
          title: values.title,
          excerpt: values.excerpt,
          contentMd: values.contentMd,
          tags: values.tags,
          heroImageUrl: values.heroImageUrl,
          featured: values.featured,
          canonicalUrl: values.canonicalUrl,
          readMinutes: values.readMinutes,
          lawSlug: values.lawSlug,
          lawMeta: values.lawMeta,
          authorName: values.authorName,
          authorRole: values.authorRole,
          publishedAt: values.publishedAt,
          updatedAt: now,
        },
      })
      .returning();

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: unknown) {
    const message = getErrorMessage(error, 'Neuspjelo spremanje posta.');
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
