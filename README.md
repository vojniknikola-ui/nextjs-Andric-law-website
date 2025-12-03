This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin backend za članke i zakone

API endpointi:
- `POST /api/admin/posts` – kreiraj/objavi članak (body: `slug`, `title`, `content`, opcionalno `tags`, `excerpt`, `heroImageUrl`, `isLawDocument`, `lawSlug`, `lawMeta`, `publishedAt`).  
- `PUT /api/admin/posts` – ažuriranje po `slug`.  
- `DELETE /api/admin/posts` – brisanje po `slug`.  
- `POST /api/admin/acts` – kreiraj zakon + članke iz TXT/MD (body: `slug`, `title`, `lawText`, `publishedAt`, `jurisdiction`, `officialNumber`, `status`, `summary`).

Autorizacija: dodaj `ADMIN_API_KEY` u `.env.local`. Ako je postavljen, pošalji `Authorization: Bearer <ADMIN_API_KEY>`.  
`lib/blog.ts` najprije čita sadržaj iz baze (`cms_post`), a lokalni seed u `content/blog/` služi kao fallback.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lead chat widget / Telegram bot

- UI: floating chat bubble renders from `LeadChatWidget` (mounted in `app/layout.tsx`).
- Backend: `POST /api/chat` validates payload, saves into `lead` table, pings Telegram and sends inbox email (fallback if DB/Telegram fail). Auto-reply email is sent when contact is an email.
- Dvosmjerni chat (MVP): `GET /api/chat/stream?sessionId=...` otvara SSE stream za posjetioce; `POST /api/chat/telegram-webhook` prima poruke iz Telegrama (bot webhook) i šalje ih klijentu u real-time. Odgovor u Telegramu mora sadržati `#sessionCode` (kratki kod dobijen u lead poruci).
- Migration for DB storage: `node scripts/apply-migration.mjs drizzle/0002_leads.sql` (+ `drizzle/0003_lead_session.sql` for sessionId) (requires `DATABASE_URL`).
- Required env:
  - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
  - optional Viber: `VIBER_BOT_TOKEN`, `VIBER_RECEIVER_ID`, `VIBER_SENDER_NAME`
  - `DATABASE_URL` for Drizzle/Neon
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `LEADS_FROM_EMAIL` (fallbacks to `SMTP_FROM_EMAIL`/`SMTP_USER`)
  - optional `LEADS_INBOX_EMAIL` (defaults to office@andric.law)
