import { pgTable, text, uuid, timestamp, date, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const acts = pgTable('act', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  shortTitle: text('short_title'),
  jurisdiction: text('jurisdiction').notNull(),
  status: text('status').notNull().default('active'),
  officialNumber: text('official_number'),
  officialUrl: text('official_url'),
  summary: text('summary'),
  publishedAt: date('published_at').notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`)
}, (table) => ({
  slugIdx: uniqueIndex('act_slug_idx').on(table.slug)
}));
