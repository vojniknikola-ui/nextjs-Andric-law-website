import { BlogPost } from '@/types/blog';

export const kaznenZakonFBiH: BlogPost = {
  slug: 'kazneni-zakon-fbih-procisceni-tekst',
  title: 'Kazneni zakon Federacije BiH - Pročišćeni tekst sa historijatom izmjena',
  excerpt: 'Reobjavljena LawViewer verzija Kaznenog zakona FBiH: 380+ članova, historijat izmjena i MD fajl spreman za uređivanje.',
  content: `
# Kazneni zakon Federacije BiH – LawViewer reobjava

Pročišćeni tekst Kaznenog zakona Federacije Bosne i Hercegovine sada je ponovo objavljen kao LawViewer dokument sa istaknutim glavam, historijatom i linkom ka izvornom MD fajlu.

## Šta dobijate?
- **380+ članova** podijeljenih na OPĆI i POSEBNI dio sa automatskim sidrima  
- **Historijat izmjena** – svaki član koji je mijenjan ima dugme “Historijat izmjena”  
- **MD fajl za urednike** – /public/laws/kazneni-zakon-fbih.md je spreman za brze izmjene bez ručnog HTML-a  
- **Search badge** – u pretrazi se jasno vidi da je riječ o digitalnom zakonu i rezultat vodi na ovaj članak

## Pokrivena izdanja "Službenih novina"
- 36/03 (osnovni tekst) uključujući 37/03 i 21/04 ispravke  
- 69/04, 18/05, 42/10, 42/11, 59/14, 76/14, 46/16, 75/17, 31/23  
- 58/25 (Direktiva (EU) 2024/1385 – član 1a i mjere protiv rodno zasnovanog nasilja)

## Uputstvo za dodavanje novih izmjena
1. Ažurirajte MD/TXT fajl u \`public/laws/\` (član + historijat -> jedan blok)  
2. Ako želite karticu na blogu, izmijenite ovu datoteku u \`content/blog/\` i importujte kroz \`lib/blog.ts\`  
3. LawViewer automatski grupiše GLAVE/DIO/POGLAVLJE linije i generiše sidra \`#clan-...\`  
4. Pretraga i sitemap se pune automatski – nije potrebna dodatna konfiguracija

[**Skoči na tekst zakona →**](#tekst-zakona)

> Napomena: U pitanju je neslužbena verzija za potrebe brzog snalaženja. Za pravno obavezujuće tumačenje koristite original objavljen u "Službenim novinama Federacije BiH".
  `,
  date: '2025-02-16',
  readMinutes: 4,
  tags: ['Kazneno pravo', 'Zakoni', 'Federacija BiH', 'Pročišćeni tekst'],
  author: {
    name: 'Andrić Law',
    role: 'Advokatski ured'
  },
  featured: true,
  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop',
  isLawDocument: true,
  lawFile: '/laws/kazneni-zakon-fbih.md'
};
