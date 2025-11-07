import { BlogPost } from '@/types/blog';

export const pdvPost: BlogPost = {
  slug: 'zakon-o-pdv',
  title: 'Zakon o PDV-u – LawViewer izdanje',
  excerpt: 'Neslužbeni pregled Zakona o porezu na dodatu vrijednost (PDV) u BiH u LawViewer formatu – članci, brzi PDF i pretraga.',
  content: `
# Zakon o PDV-u – LawViewer

Objavili smo neslužbeni konsolidovani tekst Zakona o PDV-u u LawViewer prikazu. Tekst je podijeljen po člancima (\`Član\`), sa jasnim sidrima i mogućnošću pretrage.

[**Otvori Zakon o PDV-u u LawViewer-u →**](/zakoni/zakon-o-pdv)

> Napomena: Tekst je informativan. Za pravno obavezujuću verziju provjerite biltene Uprave za indirektno oporezivanje i Službeni glasnik BiH.
  `,
  date: '2025-02-18',
  readMinutes: 3,
  tags: ['Porezi', 'BiH', 'LawViewer'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1554224155-3a589877462f?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawViewerPath: '/zakoni/zakon-o-pdv',
  canonicalUrl: 'https://andric.law/zakoni/zakon-o-pdv',
};

