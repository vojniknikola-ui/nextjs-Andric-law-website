import { BlogPost } from '@/types/blog';

export const advokatskaTarifaFBiHPost: BlogPost = {
  slug: 'advokatska-tarifa-fbih',
  title: 'Advokatska tarifa Federacije BiH – digitalno izdanje',
  excerpt: 'Neslužbeni pregled tarifnih brojeva, nagrada i troškova iz Tarife o nagradama i naknadama za rad odvjetnika (SN FBiH 43/25).',
  content: `
# Advokatska tarifa FBiH – digitalni pregled

Digitalizirali smo važeću advokatsku tarifu Federacije BiH kako biste brzo pronašli tarifni broj, iznos i posebne napomene (putni troškovi, PDV, minimalne nagrade).

- kompletan tekst objavljen u *Službenim novinama FBiH 43/25*,
- svaki tarifni broj je u posebnoj cjelini, spreman za pretragu,
- historijat izmjena i napomene jasno su naglašeni.

[**Skoči na tekst tarife →**](#tekst-zakona)

> Tekst je neslužbeni i služi za brzu orijentaciju. Za obračun nagrada obavezno provjerite službenu objavu.
  `,
  date: '2025-02-19',
  readMinutes: 2,
  tags: ['Tarife', 'FBiH', 'Advokati'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: false,
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/advokatska-tarifa-fbih.md',
};
