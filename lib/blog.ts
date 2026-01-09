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
    slug: "zakon-o-izmjenama-stvarnih-prava-rs",
    title: "Zakon o izmjenama i dopunama Zakona o stvarnim pravima RS",
    excerpt: "Zakon koji uređuje pretvaranje prava korištenja, upravljanja i raspolaganja u pravo svojine u Republici Srpskoj.",
    content: `# ZAKON O IZMJENAMA I DOPUNAMA ZAKONA O STVARNIM PRAVIMA

**Službeni glasnik Republike Srpske, br. 124/08 i 58/09**

---

## Član 1. - Izmjena terminologije

U članu 21. u stavu 2. Zakona o stvarnim pravima ("Službeni glasnik Republike Srpske", br. 124/08 i 58/09), (u daljem tekstu: Zakon), riječi: **"žemiljišnu knjigu"**, zamjenjuju se riječima: **"javnu evidenciju"**, kao i u cijelom tekstu Zakona u odgovarajućem padežu.

---

## Član 2. - Pretvaranje prava korištenja, upravljanja ili raspolaganja

Član 324. mijenja se i glasi:

### Član 324.

**(1)** Ako posebnim zakonom nije drugačije propisano, **pravo upravljanja, korištenja ili raspolaganja** kao osnovno pravo na stvarima u društvenoj, odnosno državnoj svojini, koje do stupanja na snagu ovog zakona nisu postala svojina drugog lica, **pretvara se u pravo svojine** njegovog dosadašnjeg nosioca ili njegovog pravnog sljednika, ako te stvari mogu biti predmet svojine.

**(2)** Nosilac prava upravljanja, korištenja ili raspolaganja na nepokretnostima u društvenoj, odnosno državnoj svojini iz stava 1. ovog člana je **pravno lice čiji je kapital 100% u svojini Republike Srpske**.

**(3)** Pravo upravljanja, korištenja ili raspolaganja na nepokretnostima u društvenoj, odnosno državnoj svojini, koje do stupanja na snagu ovog zakona nisu postale svojina drugog lica, **pretvara se u pravo svojine jedinice lokalne samouprave** na čijoj se teritoriji nalazi ta nepokretnost, ako je nosilac tog prava prestao da postoji i nema pravnog sljednika.

---

## Član 3. - Pretvaranje prava na gradskom građevinskom zemljištu

Naslov člana i član 325. mijenjaju se i glase:

### Pretvaranje prava na gradskom građevinskom zemljištu u pravo svojine

### Član 325.

**Privremeno pravo korištenja do preuzimanja**, **pravo korištenja radi građenja** i **trajno pravo korištenja** na gradskom građevinskom zemljištu u društvenoj, odnosno državnoj svojini, koje do stupanja na snagu ovog zakona nije postalo svojina drugog lica, **pretvara se u pravo svojine** njegovog dosadašnjeg nosioca, odnosno njegovog pravnog sljednika.

---

## Ključne odredbe

### 1. Automatsko pretvaranje prava

Prava korištenja, upravljanja i raspolaganja **automatski se pretvaraju u pravo svojine** bez potrebe za posebnim postupkom.

### 2. Nosioci prava

- **Pravna lica sa 100% kapitalom RS** - postaju vlasnici nepokretnosti
- **Jedinice lokalne samouprave** - postaju vlasnici ako nosilac prava više ne postoji
- **Fizička i pravna lica** - nosioci prava na građevinskom zemljištu postaju vlasnici

### 3. Vrste prava koja se pretvaraju

- Pravo upravljanja
- Pravo korištenja
- Pravo raspolaganja
- Privremeno pravo korištenja
- Pravo korištenja radi građenja
- Trajno pravo korištenja

### 4. Uslov za pretvaranje

Nepokretnost **nije postala svojina drugog lica** do stupanja na snagu zakona.

---

## Praktične implikacije

### Za pravna lica

Pravna lica koja su imala pravo upravljanja na nepokretnostima u državnoj svojini, a čiji je kapital 100% u vlasništvu RS, **automatski postaju vlasnici** tih nepokretnosti.

### Za jedinice lokalne samouprave

Opštine i gradovi postaju vlasnici nepokretnosti na kojima su imala prava korištenja, upravljanja ili raspolaganja, **ako je prethodni nosilac prestao da postoji**.

### Za fizička lica

Nosioci prava na građevinskom zemljištu (privremeno, trajno ili radi građenja) **postaju vlasnici** tog zemljišta.

---

## Postupak upisa u javnu evidenciju

Prema članu 1. ovog zakona, umjesto termina "žemiljišna knjiga" koristi se termin **"javna evidencija"**.

Upis prava svojine vrši se na osnovu:

1. Dokaza o dosadašnjem pravu (rješenje, ugovor)
2. Dokaza o pravnom sljedništvu (ako je primjenjivo)
3. Zahtjeva za upis u javnu evidenciju

---

## Izuzeci

Pretvaranje prava **ne primjenjuje se** ako:

- Posebnim zakonom je drugačije propisano
- Nepokretnost je već postala svojina drugog lica
- Stvar ne može biti predmet svojine

---

## Zaključak

Ovaj zakon značajno pojednostavljuje vlasnike odnose na nepokretnostima u Republici Srpskoj, pretvarajući stara društvena prava u moderno pravo svojine.

Za konkretne slučajeve i pravne savjete, preporučujemo konsultacije sa advokatom.
    `,
    date: "2025-01-23",
    readMinutes: 8,
    tags: ["Zakoni", "Stvarna prava", "RS", "Svojina"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured",
      image: "/fallbacks/author-placeholder.jpg"
    },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop'
  },
  {
    slug: "zakon-o-upotrebi-i-zastiti-naziva-bih",
    title: "Zakon o upotrebi i zaštiti naziva Bosne i Hercegovine",
    excerpt: "Zakon koji uređuje upotrebu i zaštitu naziva, grba, zastave i himne Bosne i Hercegovine.",
    content: `# Zakon o upotrebi i zaštiti naziva Bosne i Hercegovine

## Član 1

Ovim zakonom uređuje se upotreba i zaštita naziva, grba, zastave i himne Bosne i Hercegovine.

## Član 2

Naziv "Bosna i Hercegovina" i skraćenica "BiH" su službeni nazivi države.

## Član 3

Grb Bosne i Hercegovine je plavi štit sa žutim dijagonalnim trakom i sedam bijelih zvijezda.

## Član 4

Zastava Bosne i Hercegovine je plava sa žutim dijagonalnim trakom i sedam bijelih zvijezda.

## Član 5

Himna Bosne i Hercegovine je instrumentalna kompozicija.

## Član 6

Zabranjena je upotreba naziva, grba, zastave i himne na način koji vrijeđa dostojanstvo države.

## Član 7

Prekršajne odredbe:
- Novčana kazna od 500 do 5.000 KM za pravna lica
- Novčana kazna od 100 do 1.000 KM za fizička lica

## Član 8

Ovaj zakon stupa na snagu osmog dana od dana objavljivanja u "Službenom glasniku BiH".
    `,
    date: "2025-01-25",
    readMinutes: 3,
    tags: ["Zakoni", "BiH", "Državni simboli"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured",
      image: "/fallbacks/author-placeholder.jpg"
    },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop'
  },
  {
    slug: "zakon-o-sudu-bih",
    title: "Zakon o Sudu Bosne i Hercegovine",
    excerpt: "Zakon koji uređuje organizaciju, nadležnost i postupak pred Sudom Bosne i Hercegovine.",
    content: `# Zakon o Sudu Bosne i Hercegovine

## DIO PRVI - OPĆE ODREDBE

### Član 1 - Predmet zakona

Ovim zakonom uređuje se organizacija, nadležnost, sastav i postupak pred Sudom Bosne i Hercegovine.

### Član 2 - Sud Bosne i Hercegovine

Sud Bosne i Hercegovine je sudski organ Bosne i Hercegovine koji vrši sudsku vlast na nivou Bosne i Hercegovine.

### Član 3 - Sjedište

Sjedište Suda je u Sarajevu.

### Član 4 - Samostalnost i nezavisnost

Sud je samostalan i nezavisan u vršenju sudske vlasti. Sudije su nezavisne u svom radu i podložne samo Ustavu i zakonu.

## DIO DRUGI - NADLEŽNOST

### Član 5 - Stvarna nadležnost

Sud je nadležan za:

a) Krivična djela propisana zakonima Bosne i Hercegovine

b) Sporove između institucija BiH

c) Sporove između BiH i entiteta

d) Sporove između entiteta

e) Upravne sporove protiv odluka institucija BiH

f) Sukob nadležnosti između sudova različitih nivoa

### Član 6 - Krivična nadležnost

Sud je nadležan za krivična djela:

- Protiv integriteta Bosne i Hercegovine
- Ratne zločine
- Genocid
- Zločine protiv čovječnosti
- Organizovani kriminal
- Terorizam
- Korupciju na nivou institucija BiH
- Pranje novca
- Finansiranje terorizma

### Član 7 - Mjesna nadležnost

Sud je mjesno nadležan za cijelu teritoriju Bosne i Hercegovine.

### Član 8 - Apelaciona nadležnost

Sud odlučuje o žalbama protiv prvostepenih odluka u predmetima iz svoje nadležnosti.

## DIO TREĆI - ORGANIZACIJA

### Član 9 - Odjeljenja

Sud ima:

1. Krivično odjeljenje
2. Apelaciono odjeljenje Krivičnog odjeljenja
3. Upravno odjeljenje
4. Odjeljenje za podršku

### Član 10 - Krivično odjeljenje

Krivično odjeljenje ima:

a) Odjeljenje I za ratne zločine

b) Odjeljenje II za organizovani kriminal, ekonomski kriminal i korupciju

c) Odjeljenje III za opće krivične predmete

### Član 11 - Sudije

Sud ima:

- Predsjednika Suda
- Dva potpredsjednika
- Sudije Krivičnog odjeljenja
- Sudije Apelacionog odjeljenja
- Sudije Upravnog odjeljenja

### Član 12 - Broj sudija

Broj sudija Suda određuje Visoko sudsko i tužilačko vijeće BiH na prijedlog predsjednika Suda.

### Član 13 - Predsjednik Suda

Predsjednika Suda bira Opća sjednica Suda tajnim glasanjem na period od četiri godine.

Predsjednik Suda:

a) Predstavlja i zastupa Sud

b) Organizuje rad Suda

c) Predlaže budžet Suda

d) Imenuje sudske savjetnike i stručne saradnike

e) Vrši druge poslove utvrđene zakonom

### Član 14 - Imenovanje sudija

Sudije imenuje Visoko sudsko i tužilačko vijeće BiH.

Uslov za imenovanje sudije je:

a) Državljanstvo BiH

b) Završen pravni fakultet

c) Položen pravosudni ispit

d) Najmanje 10 godina radnog iskustva u pravnoj struci

e) Visok stepen stručnosti i morala

### Član 15 - Mandat sudija

Sudije se imenuju na period od šest godina sa mogućnošću ponovnog imenovanja.

Sudija može biti razriješen dužnosti samo u slučajevima i na način propisan zakonom.

### Član 16 - Imunitet sudija

Sudija uživa imunitet za mišljenja izražena i glasove date u vršenju sudijske funkcije.

Sudija se ne može pozvati na krivičnu odgovornost, pritvoriti ili kazniti za mišljenje dato ili glasanje izvršeno u vršenju sudijske funkcije.

### Član 17 - Nespojivost funkcija

Sudijska funkcija je nespojiva sa:

a) Funkcijom u organima zakonodavne i izvršne vlasti

b) Advokatskom djelatnošću

c) Obavljanjem druge profesionalne djelatnosti

d) Članstvom u političkim strankama

### Član 18 - Plaća sudija

Sudije imaju pravo na plaću i druga primanja utvrđena zakonom.

Plaća sudije ne može biti smanjena za vrijeme trajanja mandata.

### Član 19 - Opća sjednica

Opću sjednicu čine svi sudije Suda.

Opća sjednica:

a) Bira predsjednika i potpredsjednike Suda

b) Donosi Poslovnik o radu Suda

c) Donosi Etički kodeks sudija

d) Razmatra godišnji izvještaj o radu Suda

e) Odlučuje o drugim pitanjima od značaja za rad Suda

### Član 20 - Sudsko osoblje

Sud ima sudske savjetnike, stručne saradnike i administrativno osoblje.

Sudske savjetnike i stručne saradnike imenuje predsjednik Suda.

Administrativno osoblje prima se u radni odnos u skladu sa Zakonom o radu.

## DIO ČETVRTI - POSTUPAK

### Član 21 - Primjena propisa

U postupku pred Sudom primjenjuju se:

- Zakon o krivičnom postupku BiH
- Zakon o parničnom postupku
- Zakon o upravnom postupku
- Poslovnik o radu Suda

## DIO PETI - ZAVRŠNE ODREDBE

### Član 22 - Stupanje na snagu

Ovaj zakon stupa na snagu osmog dana od dana objavljivanja u "Službenom glasniku BiH".
    `,
    date: "2025-01-24",
    readMinutes: 5,
    tags: ["Zakoni", "Pravosuđe", "BiH"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured",
      image: "/fallbacks/author-placeholder.jpg"
    },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop'
  },
  {
    slug: "otkaz-ugovora-vodic-2025",
    title: "Otkaz ugovora o radu (FBiH & RS) – praktični vodič za 2025",
    excerpt: "Kompletan pregled pravila o prestanku radnog odnosa otkazom u FBiH i RS, sa ključnim razlikama, rokovima i postupovnim koracima.",
    content: `Kompletan vodič sa svim detaljima...`,
    date: "2025-01-29",
    readMinutes: 12,
    tags: ["Radno pravo", "FBiH", "RS", "Vodič 2025"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured",
      image: "/fallbacks/author-placeholder.jpg"
    },
    featured: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop'
  },
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
      image: "/fallbacks/author-placeholder.jpg"
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
