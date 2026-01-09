import { BlogPost } from '@/types/blog';

export const zakonONasljedjivanjuPost: BlogPost = {
  slug: 'zakon-o-nasljedjivanju-fbih',
  title: 'Zakon o nasljeđivanju FBiH – konsolidovano digitalno izdanje',
  excerpt: 'Objavljen kompletan tekst Zakona o nasljeđivanju (SG FBiH 80/14 i odluka US 32/19) sa pregledom nasljednih redova, testamenta i nužnih nasljednika.',
  content: `
# Zakon o nasljeđivanju FBiH – digitalni prikaz

Kako bi tim i klijenti imali precizan uvid u nasljedno pravo, pripremili smo digitalnu verziju Zakona o nasljeđivanju (SG FBiH 80/2014 + odluka US 32/2019). Tekst je podijeljen u sedam cjelina: od općih načela, preko testamentarnih formi, do ostavinskog postupka i prelaznih odredbi.

## Šta je istaknuto?
- **Nasljedni redovi i nužni dio** – jasno označeni članci, uključujući napomenu o odluci US 32/19
- **Testamentarne forme** – holografski, alografski, sudski, javni, međunarodni i usmeni testament
- **Ostavinski postupak** – nadležnost sudova / notara i struktura rješenja o nasljeđivanju
- **Digitalni link + Preuzmi PDF** – klikom generišete HTML vjernu PDF verziju za spis

[**Skoči na tekst zakona →**](#tekst-zakona)

> Napomena: Tekst služi za bržu orijentaciju. Za službenu verziju obavezno provjerite objave u „Službenim novinama Federacije BiH“.
  `,
  date: '2025-02-18',
  readMinutes: 4,
  tags: ['Nasljeđivanje', 'FBiH', 'Digitalni zakon'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
    image: '/fallbacks/author-placeholder.jpg',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/zakon-o-nasljedivanju-fbih.txt',
};
