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

1. Kreirajte `.txt` fajl u `/public/laws/`
2. Formatirajte prema gornjim pravilima
3. Dodajte rutu u `/app/zakoni/[slug]/page.tsx`
4. Zakon će automatski biti prikazan sa:
   - Andrić Law header-om
   - Logom kancelarije
   - Profesionalnim formatiranjem
   - Dugmetom "Izmjene Zakona" (ako postoji historijat)

### 6. Testiranje

Nakon dodavanja zakona, provjerite:
- ✅ Tekst je crn i čitljiv
- ✅ Glave su na početku odgovarajućih sekcija
- ✅ Nema backslash znakova
- ✅ Dugme "Izmjene Zakona" radi ispravno
- ✅ Header sa logom je vidljiv

---

**Andrić Law Advokatska kancelarija**
