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
    slug: 'pregled-sudske-prakse-o-komunalnoj-naknadi-i-naknadi-za-koritenje-gradskog-graevinskog-zemljita-u-bih-20242025',
    title:
      'Pregled sudske prakse o komunalnoj naknadi i naknadi za korištenje gradskog građevinskog zemljišta u BiH (2024‑2025)',
    excerpt:
      'Kompaktan pregled odluka i stavova sudova u BiH o komunalnoj naknadi i naknadi za korištenje gradskog građevinskog zemljišta – period 2024‑2025.',
    content: `# Pregled sudske prakse (2024‑2025)

Sažetak recentne prakse sudova u BiH u vezi sa:

- **Komunalnom naknadom** – obračun, oslobađanja i zastara
- **Naknadom za korištenje gradskog građevinskog zemljišta** – dospijeće, visina i dokazivanje
- **Postupovnim pitanjima** – teret dokazivanja, rokovi i žalbeni razlozi

## Ključni nalazi

1) **Dospijeće i zastara** – Sudovi potvrđuju da rok za potraživanje naknade teče od trenutka faktičnog korištenja, a ne samo od upisa prava.
2) **Dokazivanje** – Obveznik koji osporava obračun mora ponuditi konkretne dokaze o nemogućnosti korištenja zemljišta (npr. objektivna zapreka).
3) **Oslobađanja** – Privremena nemogućnost korištenja (radovi, zabrane) može opravdati umanjenje, ali ne i potpuno oslobađanje bez izričitog rješenja.
4) **Kamate** – Zatezna kamata teče od dana dospijeća utvrđenog rješenjem, a ne unazad.

## Praktične napomene

- Provjeriti je li rješenje uredno dostavljeno (rokovi za žalbu).
- Čuvati dokaz o fazama korištenja/nekorištenja zemljišta.
- Pregovarati o reprogramu gdje je dug nesporan radi smanjenja kamate.
`,
    date: '2025-03-01',
    readMinutes: 6,
    tags: ['Komunalna naknada', 'Građevinsko zemljište', 'BiH'],
    author: DEFAULT_AUTHOR,
    featured: true,
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&h=675&fit=crop',
  },
  {
    slug: 'bracna-stecevina-mit-automatska-podjela',
    title: 'Bračna stečevina i mit o automatskoj podjeli “pola-pola”',
    excerpt:
      'Da li se bračna stečevina dijeli tačno 50/50? Pregled pravila, izuzetaka i dokaza koji utiču na podjelu.',
    content: `# Bračna stečevina: nije uvijek 50/50

Mit o automatskoj podjeli bračne stečevine na pola je čest, ali sudovi procjenjuju doprinos i konkretne okolnosti.

## Šta ulazi u bračnu stečevinu

- Zarada i imovina stečena tokom braka
- Zajednička ulaganja u stan/kuću/posao
- Ušteđevina, vozila, vrijednosni papiri stečeni u braku

## Šta je izuzetak

- Imovina stečena nasljeđem ili poklonom (ako nije “pomiješana”)
- Lične stvari i odštete za povrede

## Kako sud procjenjuje podjelu

- **Doprinos** – finansijski, briga o djeci, vođenje domaćinstva
- **Dokazi** – ugovori, uplate, svjedoci o ulaganjima
- **Zajednički krediti** – dijele se uz imovinu na koju su utrošeni

## Praktični savjeti

- Vodite evidenciju o ulaganjima i kreditima.
- Prije pokretanja spora, pokušajte sporazum s jasnim popisom imovine.
- U bračnom/partnerskom ugovoru predvidite posebna pravila podjele.
`,
    date: '2025-02-18',
    readMinutes: 5,
    tags: ['Porodično pravo', 'Bračna stečevina', 'FBiH', 'RS'],
    author: DEFAULT_AUTHOR,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba02e2e1ba?w=1200&h=675&fit=crop',
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
