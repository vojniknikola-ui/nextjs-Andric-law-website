import { BlogPost } from '@/types/blog';

export const kaznenZakonFBiH: BlogPost = {
  slug: 'kazneni-zakon-fbih-procisceni-tekst',
  title: 'Kazneni zakon Federacije BiH – pročišćeni tekst',
  excerpt: 'Digitalno izdanje Kaznenog zakona FBiH sa popisom službenih izmjena i punim tekstom u nastavku.',
  content: `
# Kazneni zakon Federacije BiH

Naziv propisa i službene izmjene su istaknuti ovdje; puni tekst slijedi odmah ispod.

## Službene novine (objave i izmjene)
- 36/03 (osnovni tekst) + 37/03 i 21/04 ispravke  
- 69/04, 18/05, 42/10, 42/11, 59/14, 76/14, 46/16, 75/17, 31/23  
- 58/25 (Direktiva (EU) 2024/1385 – član 1a i mjere protiv rodno zasnovanog nasilja)

[**Otvori tekst zakona →**](#tekst-zakona)

> Napomena: Ovo je neslužbena verzija za brzo snalaženje. Za pravno obavezujuće tumačenje koristite original objavljen u "Službenim novinama Federacije BiH".
  `,
  date: '2025-02-16',
  readMinutes: 4,
  tags: ['Kazneno pravo', 'Zakoni', 'Federacija BiH', 'Pročišćeni tekst'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
    image: '/fallbacks/author-placeholder.jpg',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/kazneni-zakon-fbih.md'
};
