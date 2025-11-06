# Vercel Blob Setup - Upute za slike

## 1. Kreiraj Blob Store na Vercelu

```bash
# Idi na Vercel Dashboard
https://vercel.com/dashboard

# Storage > Create Blob Store
# Ime: andric-law-images
```

## 2. Instaliraj Vercel CLI (ako već nije)

```bash
npm i -g vercel
vercel login
```

## 3. Uploaduj slike

```bash
# Kreiraj folder za slike
mkdir -p public/blog-images

# Preuzmi slike ili koristi svoje
# Zatim uploaduj:

vercel blob upload public/blog-images/otkaz-ugovora.jpg --token=$BLOB_READ_WRITE_TOKEN
vercel blob upload public/blog-images/nda-it.jpg --token=$BLOB_READ_WRITE_TOKEN
vercel blob upload public/blog-images/osnivanje-doo.jpg --token=$BLOB_READ_WRITE_TOKEN
vercel blob upload public/blog-images/otkaz-vodic-2025.jpg --token=$BLOB_READ_WRITE_TOKEN
```

## 4. Kopiraj URL-ove

Nakon uploada, Vercel CLI će vratiti URL-ove:
```
https://xxxxx.public.blob.vercel-storage.com/otkaz-ugovora-xxxxx.jpg
```

## 5. Zamijeni URL-ove u kodu

Otvori `lib/blog.ts` i zamijeni Unsplash URL-ove sa Vercel Blob URL-ovima:

```typescript
const BLOG_IMAGES = {
  'otkaz-ugovora-o-radu-fbih': 'https://xxxxx.public.blob.vercel-storage.com/otkaz-ugovora-xxxxx.jpg',
  'nda-it-projekti': 'https://xxxxx.public.blob.vercel-storage.com/nda-it-xxxxx.jpg',
  'osnivanje-doo-bih': 'https://xxxxx.public.blob.vercel-storage.com/osnivanje-doo-xxxxx.jpg',
  // ...
};
```

## 6. Alternativa - Upload preko Vercel Dashboarda

1. Idi na Storage > Blob Store
2. Klikni "Upload"
3. Odaberi slike
4. Kopiraj URL-ove
5. Zamijeni u `lib/blog.ts`

## Trenutne slike (Unsplash)

Trenutno se koriste Unsplash slike koje su već optimizirane i besplatne. Možeš ih zadržati ili zamijeniti sa svojim slikama preko Vercel Blob-a.

## Prednosti Vercel Blob-a

- Automatska optimizacija slika
- CDN distribucija
- Brže učitavanje
- Kontrola nad sadržajem
- Nema zavisnosti od trećih strana (Unsplash)
