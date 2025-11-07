import { BlogPost } from '@/types/blog';
import { kazneniZakonFbihPost } from '@/content/blog/kazneni-zakon-fbih';
import { kaznenZakonFBiH } from '@/content/blog/kazneni-zakon-fbih-procisceni-tekst';
import { ustavBiHPost } from '@/content/blog/ustav-bosne-i-hercegovine';

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
  ustavBiHPost,
  kaznenZakonFBiH,
  kazneniZakonFbihPost,
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
      role: "Advokatski ured"
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
