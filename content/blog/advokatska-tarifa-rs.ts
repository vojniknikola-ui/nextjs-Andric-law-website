import { BlogPost } from '@/types/blog';

export const advokatskaTarifaRSPort: BlogPost = {
  slug: 'advokatska-tarifa-republike-srpske',
  title: 'Advokatska tarifa Republike Srpske – LawViewer izdanje',
  excerpt: 'Interaktivni prikaz tarifnih brojeva, nagrada i naknada iz Advokatske tarife RS, uz direktan uvid u PDF i pretragu kroz LawViewer.',
  content: `
# Advokatska tarifa Republike Srpske – LawViewer

Kancelarija Andrić Law pretvorila je kompletnu Advokatsku tarifu Republike Srpske u LawViewer format. Sada možete:

- klikom otvoriti **svaki tarifni broj** i vidjeti pravila obračuna,
- koristiti **LawViewer historijat** za napomene i posebne dodatke (putni troškovi, PDV),
- preuzeti originalni PDF u slučaju da ga trebate priložiti spisu.

## Šta obuhvata prikaz?
- Tarifni brojevi za parnice, izvršne postupke, krivični postupak, privredne sporove i ostale radnje
- Napomene o putnim troškovima, PDV-u i minimalnim nagradama
- Strukturu pogodnu za pretragu (LawViewer + Search API)

[**Otvori Advokatsku tarifu RS u LawViewer-u →**](/zakoni/advokatska-tarifa-rs)

> Napomena: Tekst služi za brže snalaženje. Za obračun nagrada obavezno provjerite zvanična izdanja "Službenog glasnika Republike Srpske".
  `,
  date: '2025-02-18',
  readMinutes: 3,
  tags: ['Tarife', 'Republika Srpska', 'Advokati', 'LawViewer'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawViewerPath: '/zakoni/advokatska-tarifa-rs',
  canonicalUrl: 'https://andric.law/zakoni/advokatska-tarifa-rs',
};
