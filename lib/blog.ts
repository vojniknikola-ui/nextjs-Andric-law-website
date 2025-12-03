import { desc } from 'drizzle-orm';
import { BlogPost } from '@/types/blog';
import { getDb, cmsPosts } from '@/db';
import { kaznenZakonFBiH } from '@/content/blog/kazneni-zakon-fbih-procisceni-tekst';
import { ustavBiHPost } from '@/content/blog/ustav-bosne-i-hercegovine';
import { advokatskaTarifaRSPort } from '@/content/blog/advokatska-tarifa-rs';
import { advokatskaTarifaFBiHPost } from '@/content/blog/advokatska-tarifa-fbih';
import { politikaDirektnihUlaganjaPost } from '@/content/blog/politika-direktnih-ulaganja';
import { zakonONasljedjivanjuPost } from '@/content/blog/zakon-o-nasljedjivanju';
import { zakonReprezentativnostiPost } from '@/content/blog/zakon-o-reprezentativnosti-sindikata-i-udruzenja-poslodavaca-fbih';
import { privremenaZabranaImovinePost } from '@/content/blog/zakon-o-privremenoj-zabrani-drzavne-imovine';
import { pdvPost } from '@/content/blog/zakon-o-pdv';
import { zakonOAdvokaturiFBiHPost } from '@/content/blog/zakon-o-advokaturi-fbih';

// Placeholder slike - zamijeni sa pravim Vercel Blob URL-ovima nakon upload-a
const BLOG_IMAGES = {
  'otkaz-ugovora-o-radu-fbih': 'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Book%20Lot%20on%20Shelf.jpg',
  'nda-it-projekti': 'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Books%20in%20Glass%20Bookcase.jpg',
  'osnivanje-doo-bih': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop',
  'gdpr-compliance-bih': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop',
  'ugovor-o-djelu-vs-ugovor-o-radu': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop',
  'intelektualno-vlasnistvo-software': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=675&fit=crop',
};

const fallbackPosts: BlogPost[] = [
  advokatskaTarifaFBiHPost,
  advokatskaTarifaRSPort,
  politikaDirektnihUlaganjaPost,
  zakonONasljedjivanjuPost,
  zakonReprezentativnostiPost,
  ustavBiHPost,
  kaznenZakonFBiH,
  privremenaZabranaImovinePost,
  pdvPost,
  zakonOAdvokaturiFBiHPost,
  {
    slug: 'otkaz-ugovora-o-radu-fbih',
    title: 'Otkaz ugovora o radu – vodič za poslodavce u FBiH',
    excerpt: 'Kratak pregled zakonitih razloga, procedura i tipičnih grešaka koje dovode do sporova.',
    content: `Otkaz ugovora o radu...`,
    date: '2025-01-28',
    readMinutes: 7,
    tags: ['Radno pravo', 'HR', 'FBiH'],
    author: {
      name: 'Andrić Law',
      role: 'Advokatski ured',
    },
    featured: true,
    image: BLOG_IMAGES['otkaz-ugovora-o-radu-fbih'],
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
  return Array.from(merged.values());
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
