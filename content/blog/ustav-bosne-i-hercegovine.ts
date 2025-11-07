import { BlogPost } from '@/types/blog';

export const ustavBiHPost: BlogPost = {
  slug: 'ustav-bosne-i-hercegovine-lawviewer',
  title: 'Ustav Bosne i Hercegovine – LawViewer izdanje sa Amandmanom I',
  excerpt: 'Visoko-kontrastni prikaz kompletnog Ustava BiH sa jasno označenim članovima i interaktivnim prikazom Amandmana I za Brčko distrikt.',
  content: `
# Ustav Bosne i Hercegovine – LawViewer izdanje

Pripremili smo kompletan tekst Ustava BiH u LawViewer formatu: visoki kontrast, sidra po članu i eksplicitni prikaz Amandmana I (Brčko distrikt).

## Šta donosi LawViewer verzija?
- ✅ **Jedan klik do Amandmana I** – gumb koji otvara puni tekst izmjene iz "Službenog glasnika BiH" br. 25/09  
- ✅ **Sidra po članu** – direktan skok na npr. *član VI.4.*  
- ✅ **Historijat** – detaljan opis unesene izmjene kako biste odmah vidjeli šta je novo  
- ✅ **Pripremljeno za rad sa klijentima** – tamni način rada, visoki kontrast i responzivan layout

## Izvori
- Osnovni tekst (Opći okvirni sporazum, Aneks IV)  
- Amandman I, "Službeni glasnik BiH", br. 25/09, PSBiH 327/09

[**Otvori Ustav u LawViewer-u →**](/zakoni/ustav-bih)

> Napomena: Ovaj prikaz služi za lakše snalaženje. Za službenu verziju uvijek provjerite objave u "Službenom glasniku Bosne i Hercegovine".
  `,
  date: '2025-08-20',
  readMinutes: 3,
  tags: ['Ustav', 'BiH', 'LawViewer', 'Zakoni'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured',
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawViewerPath: '/zakoni/ustav-bih',
  canonicalUrl: 'https://andric.law/zakoni/ustav-bih',
};
