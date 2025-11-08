import { BlogPost } from '@/types/blog';

export const privremenaZabranaImovinePost: BlogPost = {
  slug: 'zakon-o-privremenoj-zabrani-drzavne-imovine',
  title: 'Privremena zabrana raspolaganja državnom imovinom – LawViewer izdanje',
  excerpt: 'Neslužbeni prečišćeni tekst zakona kojim se zabranjuje prenos državne imovine BiH, sa jasno označenim izuzecima i svim OHR izmjenama od 2005. do 2022. godine.',
  content: `
# Privremena zabrana raspolaganja državnom imovinom – digitalni prikaz

Objavili smo digitalnu verziju zakona koji zabranjuje raspolaganje državnom imovinom Bosne i Hercegovine. Tekst uključuje:

- jasnu definiciju državne imovine (sukcesija, SRBiH, presude Ustavnog suda),
- izuzeća za privatizaciju, odbranu i odluke Komisije za državnu imovinu,
- sve OHR izmjene od 2005. do 2022. godine (18/05 → 22/22).

[**Skoči na tekst zakona →**](#tekst-zakona)

> Napomena: Tekst je neslužbeni i služi za brzu orijentaciju. Za postupanje se mora koristiti zvanično objavljeni "Službeni glasnik BiH".
  `,
  date: '2025-02-19',
  readMinutes: 2,
  tags: ['Državna imovina', 'Ustavno pravo', 'Digitalni zakon'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/zakon-o-privremenoj-zabrani-raspolaganja-drzavnom-imovinom-bih.txt',
};
