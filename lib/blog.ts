import { desc } from 'drizzle-orm';
import { BlogPost } from '@/types/blog';
import { getDb, cmsPosts } from '@/db';

const DEFAULT_AUTHOR = {
  name: 'Advokat Nikola Andrić',
  role: 'Advokat',
  image: '/fallbacks/author-placeholder.jpg',
} as const;

const fallbackPosts: BlogPost[] = [
  {
    slug: 'smjene-12h-vs-11h25-infografika',
    title: 'Smjene od 12 sati vs blokovi 11.25h – interaktivna infografika',
    excerpt:
      'Interaktivni prikaz dva modela smjena (48/36/36h naspram 45/33.75h) kroz 52 sedmice: ukupni sati, ritam i razlike.',
    content: `# Smjene 12h vs blokovi 11.25h

U nastavku je interaktivna infografika koja poredi dva modela rada u 12-satnim i 11.25-satnim blokovima tokom 52 sedmice. Kliknite na tabove za graf ili tabelu.
`,
    date: '2025-03-02',
    readMinutes: 4,
    tags: ['Radno pravo', 'Radno vrijeme', 'HR'],
    author: DEFAULT_AUTHOR,
    featured: true,
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1200&h=675&fit=crop',
  },
];

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getMergedPosts();
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getMergedPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getMergedPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getMergedPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

async function getMergedPosts(): Promise<BlogPost[]> {
  const remote = await getDbPosts();
  const merged = new Map<string, BlogPost>();
  remote.forEach((post) => merged.set(post.slug, post));
  fallbackPosts.forEach((post) => {
    if (!merged.has(post.slug)) {
      merged.set(post.slug, post);
    }
  });
  return Array.from(merged.values()).map((post) => normalizeAuthor(post));
}

async function getDbPosts(): Promise<BlogPost[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(cmsPosts)
      .orderBy(desc(cmsPosts.publishedAt), desc(cmsPosts.createdAt));

    return rows.map((row) => ({
      slug: row.slug,
      title: stripMarkdown(row.title),
      excerpt: stripMarkdown(row.excerpt ?? row.contentMd.slice(0, 180)),
      content: row.contentMd,
      date: row.publishedAt?.toString() ?? row.createdAt.toString(),
      readMinutes: row.readMinutes ?? 3,
      tags: Array.isArray(row.tags) ? row.tags.filter((t): t is string => typeof t === 'string') : [],
      author: {
        name: row.authorName ?? 'Andrić Law',
        role: row.authorRole ?? 'Advokatski ured',
      },
      featured: row.featured ?? false,
      image: row.heroImageUrl ?? undefined,
      isLawDocument: row.isLawDocument ?? false,
      canonicalUrl: row.canonicalUrl ?? undefined,
      lawFile:
        row.lawMeta && typeof row.lawMeta === 'object' && 'lawFile' in (row.lawMeta as Record<string, unknown>)
          ? ((row.lawMeta as Record<string, unknown>).lawFile as string | string[])
          : undefined,
      lawSlug: row.lawSlug ?? undefined,
      lawMeta: (row.lawMeta as BlogPost['lawMeta']) ?? undefined,
    }));
  } catch (error) {
    console.warn('[blog] Failed to fetch DB posts', error);
    return [];
  }
}

function stripMarkdown(value: string | null | undefined) {
  if (!value) return '';
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .trim();
}

function normalizeAuthor(post: BlogPost): BlogPost {
  if (!post.author) {
    return {
      ...post,
      author: DEFAULT_AUTHOR,
    };
  }

  const name = post.author.name?.trim();
  const role = post.author.role?.trim();
  const nameLower = name?.toLowerCase() ?? '';
  const roleLower = role?.toLowerCase() ?? '';
  const shouldDefaultName = !name || nameLower === 'andrić law' || nameLower === 'andric law';
  const shouldDefaultRole = !role || roleLower === 'advokatski ured';

  if (!shouldDefaultName && !shouldDefaultRole && post.author.image) {
    return post;
  }

  return {
    ...post,
    author: {
      name: shouldDefaultName ? DEFAULT_AUTHOR.name : post.author.name,
      role: shouldDefaultRole ? DEFAULT_AUTHOR.role : post.author.role,
      image: post.author.image ?? DEFAULT_AUTHOR.image,
    },
  };
}
