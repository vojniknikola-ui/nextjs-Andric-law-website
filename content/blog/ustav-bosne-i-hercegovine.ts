import { BlogPost } from '@/types/blog';

export const ustavBiHPost: BlogPost = {
  slug: 'ustav-bosne-i-hercegovine-lawviewer',
  title: 'Ustav Bosne i Hercegovine – LawViewer izdanje sa Amandmanom I',
  excerpt: 'Reobjavljena LawViewer verzija Ustava BiH: sidra po članu, jasno označeni dijelovi i integrisan Amandman I za Brčko distrikt.',
  content: `
# Ustav Bosne i Hercegovine – digitalni refresh 2025.

Ponovno smo objavili kompletan tekst Ustava BiH u LawViewer formatu kako bi klijenti i urednici imali čist, visokokontrastni prikaz sa pratećim amandmanom.

## Šta je novo u verziji 2025?
- **Hero u dvije kolone** – odmah se vidi status dokumenta, broj glava i prečice ka ključnim članovima
- **Amandman I kao kartica** – sadržaj iz "Službenog glasnika BiH", br. 25/09 prikazuje se u \`details\` elementu i u samom LawViewer-u
- **Automatski intro/preambula** – dovoljno je ubaciti TXT/MD fajl iz *Downloads* i parser odrađuje sidra i grupisanje (GLAVA, DIO…)
- **Digitalni badge na blogu i u pretrazi** – svi rezultati koji vode ka ovom članku jasno su označeni

## Kako otvoriti zakon?
- Posjetite [**sekciju ispod**](#tekst-zakona) za kompletan tekst
- Dugmad “Amandman I” i “Skoči na član VI.4” su dostupna u samom hero segmentu
- Preuzmite izvorni \`ustav-bih.txt\` fajl klikom na “Preuzmi TXT” (korisno za offline rad)

## Uputstvo za urednike
1. **Fajl** – smjestite novi TXT/MD u \`public/laws/\` (npr. \`ustav-bih.txt\`)  
2. **Blog kartica** – dodajte ili ažurirajte unos u \`content/blog/\` i importujte ga preko \`lib/blog.ts\`  
3. **LawViewer** – nije potrebno ručno uređivati HTML; parser automatski prepoznaje \`Član\`, \`GLAVA\`, \`Historijat\` i Markdown naglašavanje  
4. **Pretraga** – svaki novi unos automatski ulazi u semantic-search algoritam (\`/search\`) i dobija LawViewer badge

> Napomena: Prikaz je neslužbeni i služi za brzo snalaženje. Za zvaničnu verziju obavezno provjerite "Službeni glasnik Bosne i Hercegovine".
  `,
  date: '2025-02-17',
  readMinutes: 4,
  tags: ['Ustav', 'BiH', 'Digitalni zakon', 'Zakoni'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: ['/laws/ustav-bih.txt', '/laws/ustav-bih-amandman.txt'],
};
