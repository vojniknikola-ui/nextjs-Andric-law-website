import { BlogPost } from '@/types/blog';
import { kaznenZakonFBiH } from '@/content/blog/kazneni-zakon-fbih-procisceni-tekst';
import { ustavBiHPost } from '@/content/blog/ustav-bosne-i-hercegovine';
import { advokatskaTarifaRSPort } from '@/content/blog/advokatska-tarifa-rs';
import { politikaDirektnihUlaganjaPost } from '@/content/blog/politika-direktnih-ulaganja';
import { zakonONasljedjivanjuPost } from '@/content/blog/zakon-o-nasljedivanju';
import { zakonReprezentativnostiPost } from '@/content/blog/zakon-o-reprezentativnosti-sindikata-i-udruzenja-poslodavaca-fbih';
import { privremenaZabranaImovinePost } from '@/content/blog/zakon-o-privremenoj-zabrani-drzavne-imovine';
import { pdvPost } from '@/content/blog/zakon-o-pdv';

// Placeholder slike - zamijeni sa pravim Vercel Blob URL-ovima nakon upload-a
const BLOG_IMAGES = {
  'otkaz-ugovora-o-radu-fbih': 'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Book%20Lot%20on%20Shelf.jpg',
  'nda-it-projekti': 'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Books%20in%20Glass%20Bookcase.jpg',
  'osnivanje-doo-bih': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop',
  'gdpr-compliance-bih': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop',
  'ugovor-o-djelu-vs-ugovor-o-radu': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop',
  'intelektualno-vlasnistvo-software': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=675&fit=crop',
};

export const blogPosts: BlogPost[] = [
  advokatskaTarifaRSPort,
  politikaDirektnihUlaganjaPost,
  zakonONasljedjivanjuPost,
  zakonReprezentativnostiPost,
  ustavBiHPost,
  kaznenZakonFBiH,
  privremenaZabranaImovinePost,
  pdvPost,
  {
    slug: "otkaz-ugovora-o-radu-fbih",
    title: "Otkaz ugovora o radu – vodič za poslodavce u FBiH",
    excerpt: "Kratak pregled zakonitih razloga, procedura i tipičnih grešaka koje dovode do sporova.",
    content: `Otkaz ugovora o radu...`,
    date: "2025-01-28",
    readMinutes: 7,
    tags: ["Radno pravo", "HR", "FBiH"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    featured: true,
    image: BLOG_IMAGES['otkaz-ugovora-o-radu-fbih']
  },
];


export async function getAllPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.find(post => post.slug === slug);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.filter(post => post.featured).slice(0, 3);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
