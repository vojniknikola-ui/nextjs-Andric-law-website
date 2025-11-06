import { BlogPost } from '@/types/blog';

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
      role: "Advokatski ured"
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

## DIO DRUGI - NADLEŽNOST

### Član 4 - Stvarna nadležnost

Sud je nadležan za:
a) Krivična djela propisana zakonima Bosne i Hercegovine
b) Sporove između institucija BiH
c) Sporove između BiH i entiteta
d) Sporove između entiteta
e) Upravne sporove protiv odluka institucija BiH

### Član 5 - Krivična nadležnost

Sud je nadležan za krivična djela:
- Protiv integriteta BiH
- Ratne zločine
- Genocid
- Zločine protiv čovječnosti
- Organizovani kriminal
- Terorizam
- Korupciju

## DIO TREĆI - ORGANIZACIJA

### Član 6 - Odjeljenja

Sud ima:
1. Krivično odjeljenje
2. Apelaciono odjeljenje
3. Upravno odjeljenje

### Član 7 - Sudije

Sud ima:
- Predsjednika Suda
- Potpredsjednike
- Sudije

### Član 8 - Imenovanje sudija

Sudije imenuje Visoko sudsko i tužilačko vijeće BiH.

### Član 9 - Mandat

Sudije se imenuju na period od šest godina sa mogućnošću ponovnog imenovanja.

## DIO ČETVRTI - POSTUPAK

### Član 10 - Primjena propisa

U postupku pred Sudom primjenjuju se:
- Zakon o krivičnom postupku BiH
- Zakon o parničnom postupku
- Zakon o upravnom postupku

### Član 11 - Jezik

Pred Sudom se koriste bosanski, hrvatski i srpski jezik.

### Član 12 - Javnost

Ročišta su javna, osim kada zakon drukčije propisuje.

## DIO PETI - ZAVRŠNE ODREDBE

### Član 13 - Stupanje na snagu

Ovaj zakon stupa na snagu osmog dana od dana objavljivanja u "Službenom glasniku BiH".
    `,
    date: "2025-01-24",
    readMinutes: 5,
    tags: ["Zakoni", "Pravosuđe", "BiH"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
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
      role: "Advokatski ured"
    },
    featured: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop'
  },
  {
    slug: "otkaz-ugovora-o-radu-fbih",
    title: "Otkaz ugovora o radu – vodič za poslodavce u FBiH",
    excerpt: "Kratak pregled zakonitih razloga, procedura i tipičnih grešaka koje dovode do sporova.",
    content: `
# Otkaz ugovora o radu u FBiH

Otkaz ugovora o radu je jedna od najosjetljivijih tema u radnom pravu. Poslodavci moraju biti izuzetno pažljivi jer greške mogu dovesti do skupih sudskih sporova.

## Zakoniti razlozi za otkaz

Prema Zakonu o radu FBiH, poslodavac može otkazati ugovor o radu iz:
- Poslovnih razloga (tehnološki, ekonomski ili organizacioni)
- Razloga koji se odnose na radnika (nesposobnost, povreda radne obaveze)

## Procedura otkaza

1. **Pisana opomena** - Obavezna za povrede radne discipline
2. **Saslušanje radnika** - Mora se omogućiti odbrana
3. **Pisano rješenje** - Sa jasnim obrazloženjem i pravnim poukom
4. **Otkazni rok** - Minimalno 30 dana, osim kod teških povreda

## Najčešće greške

- Nedostatak dokumentacije o povredi
- Propuštanje roka za izricanje mjere
- Nepoštivanje procedure saslušanja
- Nejasno obrazloženje razloga

## Zaključak

Svaki otkaz mora biti pažljivo pripremljen i dokumentovan. Preporučujemo konsultacije sa pravnikom prije donošenja konačne odluke.
    `,
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
  {
    slug: "nda-it-projekti",
    title: "NDA u IT projektima – šta mora da sadrži",
    excerpt: "Ključne klauzule povjerljivosti, rokovi i odnos prema autorskim pravima i GDPR-u.",
    content: `
# NDA u IT projektima

Non-Disclosure Agreement (NDA) ili ugovor o povjerljivosti je ključan dokument u IT industriji gdje se razmjenjuju osjetljive informacije.

## Osnovni elementi NDA

### 1. Definicija povjerljivih informacija
- Izvorni kod i tehnička dokumentacija
- Poslovni planovi i strategije
- Klijentske liste i baze podataka
- Know-how i poslovne tajne

### 2. Obaveze primatelja
- Čuvanje tajnosti
- Ograničenje korištenja
- Zaštita od neovlaštenog pristupa

### 3. Izuzeci
- Javno dostupne informacije
- Nezavisno razvijene informacije
- Zakonske obaveze objavljivanja

## Odnos prema GDPR-u

NDA mora biti usklađen sa GDPR-om kada se radi o ličnim podacima:
- DPA (Data Processing Agreement) klauzule
- Obaveze procesora podataka
- Prava subjekata podataka

## Trajanje i kazne

- Tipično trajanje: 2-5 godina
- Ugovorne kazne za povredu
- Pravo na naknadu štete

## Preporuke

Uvijek prilagodite NDA specifičnom projektu i konsultujte pravnika prije potpisivanja.
    `,
    date: "2025-01-18",
    readMinutes: 6,
    tags: ["Ugovori", "IT", "GDPR"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    featured: true,
    image: BLOG_IMAGES['nda-it-projekti']
  },
  {
    slug: "osnivanje-doo-bih",
    title: "Osnivanje d.o.o. – praktični koraci i troškovi",
    excerpt: "Od ideje do registracije: dokumenti, organi društva i najčešće dileme osnivača.",
    content: `
# Osnivanje d.o.o. u BiH

Društvo sa ograničenom odgovornošću (d.o.o.) je najčešći oblik privrednog društva u BiH.

## Osnovni koraci

### 1. Priprema dokumentacije
- Odluka o osnivanju / Osnivački akt
- Ugovor o osnivanju (ako ima više osnivača)
- Dokaz o uplati temeljnog kapitala

### 2. Minimalni kapital
- **FBiH**: 1 KM
- **RS**: 1 KM
- Preporuka: Realan kapital prema djelatnosti

### 3. Registracija
- Prijava u sudski registar
- Dobijanje JIB-a
- Registracija za PDV (ako je obavezno)

## Organi društva

### Skupština
- Najviše tijelo upravljanja
- Donosi ključne odluke
- Bira direktora

### Direktor
- Zastupa i predstavlja društvo
- Vodi poslovanje
- Odgovoran za zakonitost rada

## Troškovi osnivanja

- Sudska taksa: ~100-200 KM
- Notarski troškovi: ~50-150 KM
- Pravne usluge: 300-800 KM
- Ukupno: 500-1.200 KM

## Najčešće dileme

**Koliko osnivača?**
- Može biti jedan ili više
- Različiti udjeli u kapitalu

**Koja djelatnost?**
- Registrujte sve planirane djelatnosti
- Lako se mogu dodavati kasnije

**Direktor ili ne?**
- Osnivač može biti i direktor
- Može se angažovati eksterni direktor

## Zaključak

Osnivanje d.o.o. je relativno jednostavno, ali zahtijeva pažnju na detalje. Dobro pripremljena dokumentacija štedi vrijeme i novac.
    `,
    date: "2025-01-03",
    readMinutes: 8,
    tags: ["Privredno pravo", "Osnivanje", "d.o.o."],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    image: BLOG_IMAGES['osnivanje-doo-bih']
  },
  {
    slug: "gdpr-compliance-bih",
    title: "GDPR compliance za BiH kompanije",
    excerpt: "Praktični vodič za usklađivanje sa zaštitom ličnih podataka i izbjegavanje kazni.",
    content: `
# GDPR Compliance u BiH

Iako BiH nije članica EU, mnoge kompanije moraju biti usklađene sa GDPR-om.

## Kada se GDPR primjenjuje?

- Poslovanje sa EU klijentima
- Obrada podataka EU građana
- Pružanje usluga u EU

## Osnovni principi

1. **Zakonitost** - Pravni osnov za obradu
2. **Transparentnost** - Jasne informacije subjektima
3. **Ograničenje svrhe** - Samo za navedene svrhe
4. **Minimizacija** - Samo potrebni podaci
5. **Tačnost** - Ažurni i tačni podaci
6. **Ograničeno čuvanje** - Brisanje kada nije potrebno
7. **Sigurnost** - Tehnička i organizaciona zaštita

## Praktični koraci

### 1. Mapiranje podataka
- Koje podatke prikupljate?
- Gdje ih čuvate?
- Ko ima pristup?

### 2. Pravni osnov
- Saglasnost
- Ugovor
- Zakonska obaveza
- Legitimni interes

### 3. Dokumentacija
- Politika privatnosti
- Evidencija obrade
- DPA sa procesorima

### 4. Prava subjekata
- Pristup podacima
- Ispravka
- Brisanje
- Prenosivost

## Kazne

- Do 20 miliona EUR ili
- 4% globalnog godišnjeg prometa

## Preporuke

Započnite sa GDPR auditom i postepeno implementirajte mjere. Bolje preventiva nego kazne.
    `,
    date: "2024-12-15",
    readMinutes: 9,
    tags: ["GDPR", "Compliance", "IT"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    image: BLOG_IMAGES['gdpr-compliance-bih']
  },
  {
    slug: "ugovor-o-djelu-vs-ugovor-o-radu",
    title: "Ugovor o djelu vs Ugovor o radu",
    excerpt: "Ključne razlike, prednosti i rizici svakog oblika angažovanja.",
    content: `
# Ugovor o djelu vs Ugovor o radu

Izbor između ugovora o djelu i ugovora o radu ima značajne pravne i finansijske implikacije.

## Ugovor o radu

### Karakteristike
- Trajni radni odnos
- Radno vrijeme i mjesto rada
- Subordinacija poslodavcu
- Puna socijalna zaštita

### Obaveze poslodavca
- Plaćanje doprinosa (oko 33%)
- Godišnji odmor (minimum 20 dana)
- Bolovanje
- Otpremnina

### Prednosti za radnika
- Stabilnost
- Socijalna sigurnost
- Zaštita od otkaza

## Ugovor o djelu

### Karakteristike
- Privremeni angažman
- Samostalnost u radu
- Rezultat, ne proces
- Bez subordinacije

### Obaveze naručioca
- Samo naknada za djelo
- Bez doprinosa
- Bez socijalnih davanja

### Rizici
- Inspekcija rada može prekvalifikovati
- Kazne za lažno prijavljivanje
- Retroaktivna naplata doprinosa

## Kada koristiti šta?

### Ugovor o radu
- Stalni poslovi
- Integracija u organizaciju
- Kontrola nad radom

### Ugovor o djelu
- Projektni rad
- Specifična ekspertiza
- Kratkoročni angažman

## Najčešće greške

1. Ugovor o djelu za stalne poslove
2. Kontrola kao kod radnog odnosa
3. Redovno mjesečno plaćanje
4. Korištenje poslovnih resursa

## Zaključak

Forma ugovora mora odgovarati suštini odnosa. Inspekcija gleda stvarno stanje, ne naziv ugovora.
    `,
    date: "2024-12-01",
    readMinutes: 7,
    tags: ["Radno pravo", "Ugovori", "HR"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    image: BLOG_IMAGES['ugovor-o-djelu-vs-ugovor-o-radu']
  },
  {
    slug: "intelektualno-vlasnistvo-software",
    title: "Intelektualno vlasništvo u software razvoju",
    excerpt: "Ko je vlasnik koda? Kako zaštititi autorska prava i izbjeći sporove.",
    content: `
# Intelektualno vlasništvo u software razvoju

Pitanje vlasništva nad softverom je često zanemareno dok ne dođe do spora.

## Osnovna pravila

### Autor = Vlasnik
- Ko napiše kod, taj je autor
- Autorska prava nastaju automatski
- Registracija nije obavezna

### Izuzeci

**1. Radni odnos**
- Poslodavac je vlasnik
- "Work for hire" princip
- Mora biti u ugovoru

**2. Ugovor o djelu**
- Autor zadržava prava
- Osim ako je drugačije ugovoreno
- Potreban prenos prava

## Vrste prava

### Moralna prava
- Pravo na priznanje autorstva
- Pravo na integritet djela
- Ne mogu se prenijeti

### Imovinska prava
- Pravo umnožavanja
- Pravo distribucije
- Pravo javnog saopštavanja
- Mogu se prenijeti

## Ugovori o prenosu

### Ekskluzivna licenca
- Samo licencijat može koristiti
- Autor ne može dati drugima

### Neekskluzivna licenca
- Više korisnika istovremeno
- Autor zadržava kontrolu

### Potpuni prenos
- Sve imovinske prava prelaze
- Najsigurnije za naručioca

## Open Source

### MIT, Apache, GPL
- Različiti nivoi slobode
- Obaveze pri korištenju
- Kompatibilnost licenci

## Praktični savjeti

1. **Uvijek pismeno** - Usmeni dogovori nisu dovoljni
2. **Jasno definiši** - Ko je vlasnik, šta se prenosi
3. **Escrow** - Zaštita pristupa kodu
4. **Dokumentuj** - Ko je šta razvio i kada

## Sporovi

Najčešći uzroci:
- Nejasan ugovor
- Freelancer zadržao prava
- Korištenje tuđeg koda
- Open source violations

## Zaključak

Investirajte u dobar ugovor na početku. Jeftinije je od spora kasnije.
    `,
    date: "2024-11-20",
    readMinutes: 10,
    tags: ["IP", "Software", "Ugovori"],
    author: {
      name: "Andrić Law",
      role: "Advokatski ured"
    },
    image: BLOG_IMAGES['intelektualno-vlasnistvo-software']
  }
];

export async function getAllPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
