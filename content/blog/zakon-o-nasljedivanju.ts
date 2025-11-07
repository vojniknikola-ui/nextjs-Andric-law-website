import { BlogPost } from '@/types/blog';

export const zakonONasljedjivanjuPost: BlogPost = {
  slug: 'zakon-o-nasljedjivanju-fbih',
  title: 'Zakon o nasljeđivanju FBiH – konsolidovano LawViewer izdanje',
  excerpt: 'Objavljen kompletan tekst Zakona o nasljeđivanju (SG FBiH 80/14 i odluka US 32/19) sa pregledom nasljednih redova, testamenta i nužnih nasljednika.',
  content: `
# Zakon o nasljeđivanju FBiH – LawViewer

Kako bi tim i klijenti imali precizan uvid u nasljedno pravo, pripremili smo LawViewer verziju Zakona o nasljeđivanju (SG FBiH 80/2014 + odluka US 32/2019). Tekst je podijeljen u sedam cjelina: od općih načela, preko testamentarnih formi, do ostavinskog postupka i prelaznih odredbi.

## Šta je istaknuto?
- **Nasljedni redovi i nužni dio** – jasno označeni članci, uključujući napomenu o odluci US 32/19
- **Testamentarne forme** – holografski, alografski, sudski, javni, međunarodni i usmeni testament
- **Ostavinski postupak** – nadležnost sudova / notara i struktura rješenja o nasljeđivanju
- **LawViewer link + Preuzmi PDF** – klikom generišete HTML vjernu PDF verziju za spis

[**Otvori zakon u LawViewer-u →**](/zakoni/zakon-o-nasljedivanju)

> Napomena: Tekst služi za bržu orijentaciju. Za službenu verziju obavezno provjerite objave u „Službenim novinama Federacije BiH“.
  `,
  date: '2025-02-18',
  readMinutes: 4,
  tags: ['Nasljeđivanje', 'FBiH', 'LawViewer'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawViewerPath: '/zakoni/zakon-o-nasljedjivanju',
  canonicalUrl: 'https://andric.law/zakoni/zakon-o-nasljedjivanju',
};
