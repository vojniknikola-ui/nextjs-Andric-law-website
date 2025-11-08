# LawViewer Architecture (Phase 1)

This document captures the target stack for LawViewer on Next.js + Vercel and explains how the new folders map to that plan. Treat it as the living source of truth while we implement ETL, search, diffing, and admin tooling.

## High-level stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | Next.js App Router (SSR/ISR) | Edge for read-heavy routes, Node runtime for API/ETL. |
| Database | Postgres (Neon / Vercel Postgres) | Stores acts, gazette issues, amendments, provisions with valid_from/valid_to intervals. |
| ORM / Migrations | Drizzle ORM + drizzle-kit | Typed schema, easy generation of SQL migrations. |
| Search | Typesense (preferred) / Meilisearch | Full-text + typo tolerance over provisions. |
| Storage | S3/R2 for PDFs/AKN, Vercel Blob for light uploads | Keeps explorer assets outside the git repo. |
| Diff / History | Monaco Diff + diff-match-patch | Visual comparison of provisions between two dates. |
| Viewer | Indigo Web styles + custom React components | Canonical rendering of articles, badges, timelines. |
| CRM / Leads | HubSpot | Gated PDF export, newsletter capture. |
| Monitoring | Vercel Analytics + Sentry | Baseline observability. |

## Repo layout (new folders)

```
app/
  zakoni/…            # future SSR routes for acts, provisions, timelines
  api/…               # ETL triggers, search proxy, PDF export, HubSpot

arch docs
  ARCHITECTURE.md     # you are here
  MIGRATE_TO_BLOB.md  # legacy instructions (to be retired later)

db/
  index.ts            # Drizzle client (Node runtime)
  schema/             # Acts, gazettes, amendments, versions, provisions, history

drizzzle.config.ts    # CLI config for migrations

etl/
  (placeholder)       # Parsing scripts for AKN/MD → Postgres + Typesense
```

## Database model (Drizzle)

Tables added in this phase:

- `act`: canonical information about each law (slug, jurisdiction, status, published_at).
- `gazette_issue`: individual Službene novine references tied to an act.
- `amendment`: describes a change, linked to both the act and (optionally) its gazette issue.
- `version`: snapshot labels so we can render “state on date X”.
- `provision`: each article/paragraph with `valid_from`/`valid_to`, `provision_key` (e.g. `cl_12_st_3`), and optional references to the amendment that introduced it.
- `provision_history`: prepared storage for diff artifacts and annotations.

Indexes were chosen to match the most common access patterns:

1. `act_id + provision_key + valid_from` → fetch “point in time” text fast.
2. `act_id + issue_date` on gazette/issues for timeline queries.
3. `act_id + snapshot_date` on versions for cached ISR pages.

See `db/schema/*.ts` for field-level comments and defaults.

## Next steps (recommended order)

1. **Database wiring**
   - Set `DATABASE_URL` locally + on Vercel.
   - Run `npx drizzle-kit generate` once migrations are required.
   - Hook `db` helper into a minimal API route (health check) to verify connections.

2. **ETL scaffolding**
   - Add parsers under `etl/` that transform existing `.md/.txt` laws into structured provisions.
   - Populate the new tables and push a seed dataset (Kazneni zakon, Ustav, PDV…).

3. **Viewer routes**
   - Create `/zakoni/[slug]` page that queries Postgres via Drizzle (using the `provisions` table).
   - Support `?at=YYYY-MM-DD` searchParam for “state on date”.

4. **Search + Typesense**
   - Provision Typesense cluster and sync `provisions` into an index with facets (jurisdiction, tags, validity).
   - Update existing search API to delegate to Typesense instead of in-memory arrays.

5. **Timeline & diff**
   - Use `amendment` + `gazette_issue` for `/timeline` route.
   - Integrate Monaco diff for comparing two dates/versions.

6. **PDF + HubSpot**
   - Reintroduce PDF export as gated download (HubSpot form + server PDF renderer).

7. **Admin panel**
   - Secure with NextAuth (@auth/core) and add upload/drag-and-drop UI that writes to Vercel Blob and triggers ETL workers.

Each step should end with `npm run lint` + `npm run build` to keep CI green. Document any new env vars inside `.env.example` (add later) and in this file.

## Local setup quickstart

1. Copy `.env.example` → `.env.local` and fill in at least `DATABASE_URL`.
2. Install dependencies: `npm install`.
3. Generate migrations (when schema changes): `npm run db:generate`, then push to your Postgres instance with `npm run db:push`.
4. Optional: inspect data with `npm run db:studio`.
5. Verify connectivity via the new health endpoint: start `npm run dev` and hit `GET /api/health/db`.
6. Seed test data from an existing markdown law: `npx ts-node --compiler-options '{"module":"commonjs"}' etl/seedLawFromMarkdown.ts --slug sample-law --source public/laws/kazneni-zakon-fbih.md`.

The ETL script is intentionally simple—replace it with the real AKN parser once available.

### Previewing the viewer route
- After seeding, visit `/zakoni/sample-law` (or any slug you imported) to see the new SSR page pulling from Postgres.
- Pass `?at=YYYY-MM-DD` to preview historical snapshots once intervals exist, e.g. `/zakoni/sample-law?at=2024-01-01`.
+
### CLI seeding example

```
npx ts-node --compiler-options '{"module":"commonjs"}' etl/seedLawFromMarkdown.ts \
  --slug zakon-o-advokaturi-fbih \
  --title "Zakon o advokaturi Federacije BiH" \
  --jurisdiction FBiH \
  --source public/laws/zakon-o-advokaturi-fbih.md \
  --snapshot 2025-01-10
```

> Tip: Ako Postgres konekcija nije podešena, `/zakoni/[slug]` sada pokušava da učita odgovarajući fajl iz `public/laws` (vidi `lib/lawFallbacks.ts`). Dodaj fallback unos za svaki zakon koji treba da radi i prije migracije u bazu.

## Search integration (Typesense)

1. Provision Typesense (self-hosted ili cloud) i zapiši `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_PROTOCOL`, `TYPESENSE_API_KEY`.
2. Dodaj varijable u `.env.local` / Vercel (vidi `.env.example`).
3. Nakon što postoji najmanje jedan zakon u bazi, pokreni:
   ```
   DATABASE_URL=... TYPESENSE_* envs... npm run db:push   # ako treba ponovo
   env DATABASE_URL=... TYPESENSE_* npx tsx scripts/index-typesense.ts
   ```
   Skripta će redefinisati kolekciju `law_provisions` i importovati sve članke.
4. `app/api/search/route.ts` sada kombinuje Typesense rezultate (zakoni) + blog rezultate. Ako Typesense env varijable nedostaju, API automatski preskače zakone.
