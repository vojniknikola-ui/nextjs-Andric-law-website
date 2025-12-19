import { pgTable, uuid, text, boolean, timestamp, integer, date, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const cmsPosts = pgTable('cms_post', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  contentMd: text('content_md').notNull(),
  tags: text('tags').array(),
  heroImageUrl: text('hero_image_url'),
  featured: boolean('featured').notNull().default(false),
  isLawDocument: boolean('is_law_document').notNull().default(false),
  canonicalUrl: text('canonical_url'),
  readMinutes: integer('read_minutes').notNull().default(3),
  lawSlug: text('law_slug'),
  lawMeta: jsonb('law_meta'),
  authorName: text('author_name').notNull().default('Andrić Law'),
  authorRole: text('author_role').notNull().default('Advokatski ured'),
  publishedAt: date('published_at').notNull().default(sql`now()`),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
}, (table) => ({
  slugIdx: uniqueIndex('cms_post_slug_idx').on(table.slug),
}));
