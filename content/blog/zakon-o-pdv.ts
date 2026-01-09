import { BlogPost } from '@/types/blog';

export const pdvPost: BlogPost = {
  slug: 'zakon-o-pdv',
  title: 'Zakon o PDV-u – digitalno izdanje',
  excerpt: 'Neslužbeni pregled Zakona o porezu na dodatu vrijednost (PDV) u BiH – članci, historijat izmjena i brza pretraga.',
  content: `
# Zakon o PDV-u – digitalni prikaz

Objavili smo neslužbeni konsolidovani tekst Zakona o PDV-u u digitalnom prikazu. Tekst je podijeljen po člancima (\`Član\`), sa jasnim sidrima i mogućnošću pretrage.

[**Skoči na tekst zakona →**](#tekst-zakona)

> Napomena: Tekst je informativan. Za pravno obavezujuću verziju provjerite biltene Uprave za indirektno oporezivanje i Službeni glasnik BiH.
  `,
  date: '2025-02-18',
  readMinutes: 3,
  tags: ['Porezi', 'BiH', 'Digitalni zakon'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
    image: '/fallbacks/author-placeholder.jpg',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1554224155-3a589877462f?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/zakon-o-pdv-bih.txt',
};
