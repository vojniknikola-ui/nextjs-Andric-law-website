# Migracija slika na Vercel Blob

## Optimizacije:
- ✅ `addRandomSuffix: true` - Jedinstveni URL-ovi (immutable blobs)
- ✅ `cacheControlMaxAge: 31536000` - 1 godina cache (365 dana)
- ✅ Preconnect/DNS prefetch za Vercel Blob
- ✅ Organizacija u `blog/` folder

## Koraci:

### 1. Kreiraj Blob Store
```bash
# https://vercel.com/dashboard
# Storage > Create Blob Store
# Ime: andric-law-images
# Region: Frankfurt (eu-central-1) - najbliže BiH
```

### 2. Kopiraj token
```bash
# Vercel Dashboard > Storage > andric-law-images
# Kopiraj BLOB_READ_WRITE_TOKEN
```

### 3. Dodaj token
```bash
echo "BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx" > .env.local
```

### 4. Pokreni migraciju
```bash
source .env.local
node scripts/upload-to-blob.js
```

### 5. Ažuriraj kod
Skripta ispisuje nove URL-ove za `lib/blog.ts`.

## Prednosti Vercel Blob:
- 99.999999999% durability (S3)
- 99.99% availability
- 19 regionalnih CDN hubova
- 1 mjesec browser cache
- Immutable blobs (bez cache problema)
- 3x jeftinije od Fast Data Transfer
