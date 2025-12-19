import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { provisions } from './provisions';
import { versions } from './versions';

export const provisionHistory = pgTable('provision_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  provisionId: uuid('provision_id').notNull().references(() => provisions.id, { onDelete: 'cascade' }),
  sourceVersionId: uuid('source_version_id').references(() => versions.id, { onDelete: 'set null' }),
  changeType: text('change_type').notNull().default('modified'),
  diff: text('diff'),
  notes: text('notes'),
  changedAt: timestamp('changed_at').notNull().default(sql`now()`)
}, (table) => ({
  provisionHistoryIdx: index('provision_history_provision_idx').on(table.provisionId, table.changedAt)
}));
