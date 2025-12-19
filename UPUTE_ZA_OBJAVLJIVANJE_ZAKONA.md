# Upute za objavljivanje zakona

## Metodologija formatiranja zakona

### 1. Struktura fajla
Zakoni se čuvaju u `/public/laws/` direktoriju kao `.txt` fajlovi.

### 2. Format teksta

#### Naslovi članaka
```
**Članak 1**
Tekst članka...
```

#### Glave (poglavlja)
```
**GLAVA I**
NAZIV GLAVE
```
**Napomena:** Glava će automatski biti prebačena na početak sljedećeg članka.

#### Historijat izmjena
```
Historijat izmjena
- Izmjena 1
- Izmjena 2
```

### 3. Pravila formatiranja

- **NE koristiti** backslash znakove `\` - automatski se uklanjaju
- **Koristiti** `**tekst**` za bold (naslove članaka, glave)
- Tekst se automatski poravnava obostrano (justify)
- Svaki članak se prikazuje u zasebnom bloku

### 4. Primjer strukture zakona

```
**GLAVA I**
OSNOVNE ODREDBE

**Članak 1**
Ovim zakonom uređuju se...

**Članak 2**
U smislu ovog zakona...

Historijat izmjena
- Izmjena od 15.03.2023.

**GLAVA II**
POSEBNE ODREDBE

**Članak 3**
Posebne odredbe...
```

### 5. Dodavanje novog zakona

1. Kreirajte `.txt` fajl u `/public/laws/` (npr. `zakon-naziv.txt`)
2. Formatirajte prema gornjim pravilima
3. Ako postoje amandmani, kreirajte `zakon-naziv-amandman.txt`
4. Kreirajte folder `/app/zakoni/zakon-naziv/`
5. Dodajte `page.tsx` sa:

```typescript
import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Naziv Zakona | Andrić Law',
  description: 'Opis zakona',
};

export default async function ZakonPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'zakon-naziv.txt');
  const amendmentPath = path.join(process.cwd(), 'public', 'laws', 'zakon-naziv-amandman.txt');
  
  const lawContent = await fs.readFile(lawPath, 'utf-8');
  // Ako postoje amandmani:
  const amendmentContent = await fs.readFile(amendmentPath, 'utf-8');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Naziv Zakona</h1>
        <p className="text-gray-600">Službeni glasnik...</p>
      </div>
      <LawViewer lawContent={lawContent} amendmentContent={amendmentContent} />
    </div>
  );
}
```

6. Zakon će automatski biti prikazan sa:
   - Andrić Law header-om (⚖️ logo)
   - Profesionalnim formatiranjem
   - Dugmetom "Izmjene Zakona" (ako postoji historijat)
   - Dugmetom "Prikaži Amandmane" (⚖️ plavo dugme, ako postoje amandmani)

### 6. Dodavanje u blog

Da bi zakon bio vidljiv u blog sekciji:

1. Otvori `/lib/blog.ts`
2. Dodaj u `blogPosts` array:

```typescript
{
  slug: "zakon-naziv",
  title: "Naziv Zakona",
  excerpt: "Kratak opis zakona...",
  content: "",
  date: "2025-01-30",
  readMinutes: 30,
  tags: ["Zakoni", "Kategorija"],
  author: {
    name: "Andrić Law",
    role: "Advokatska kancelarija"
  },
  image: 'https://images.unsplash.com/photo-...',
  isLawDocument: true,
  lawViewerPath: "/zakoni/zakon-naziv"
}
```

### 7. Testiranje

Nakon dodavanja zakona, provjerite:
- ✅ Tekst je crn i čitljiv
- ✅ Glave su na početku odgovarajućih sekcija
- ✅ Nema backslash znakova
- ✅ Dugme "Izmjene Zakona" radi ispravno
- ✅ Header sa logom je vidljiv

---

**Andrić Law Advokatska kancelarija**
