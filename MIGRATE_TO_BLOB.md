# Migracija slika na Vercel Blob

## Koraci:

### 1. Kreiraj Blob Store
```bash
# Idi na: https://vercel.com/dashboard
# Storage > Create Blob Store
# Ime: andric-law-images
```

### 2. Kopiraj token
```bash
# U Vercel Dashboard > Storage > andric-law-images
# Kopiraj BLOB_READ_WRITE_TOKEN
```

### 3. Dodaj token u .env.local
```bash
echo "BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx" > .env.local
```

### 4. Pokreni migraciju
```bash
source .env.local
node scripts/upload-to-blob.js
```

### 5. Ažuriraj kod
Skripta će ispisati nove URL-ove. Kopiraj ih i zamijeni u `lib/blog.ts`.

## Alternativa - Ručni upload

Ako skripta ne radi, uploaduj ručno:

1. Preuzmi slike sa Unsplash URL-ova
2. Idi na Vercel Dashboard > Storage > Upload
3. Uploaduj slike
4. Kopiraj URL-ove i zamijeni u kodu
