# ETL Pipeline (placeholder)

This folder will host scripts that transform raw sources (MD, TXT, PDF, AKN XML) into the structured Postgres schema introduced in `db/schema`.

Planned steps:
1. Ingest source files (local filesystem, Blob storage, S3/R2).
2. Parse into normalized nodes (act → chapter → article → paragraph).
3. Detect amendments + validity intervals.
4. Persist data via Drizzle (see `db/index.ts`).
5. Push searchable payloads to Typesense / Meilisearch.

Implementation will follow once the initial database seeding strategy is approved.
