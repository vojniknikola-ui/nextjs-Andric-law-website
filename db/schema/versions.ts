import { pgTable, uuid, text, date, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { acts } from './acts';
import { amendments } from './amendments';

export const versions = pgTable('version', {
  id: uuid('id').primaryKey().defaultRandom(),
  actId: uuid('act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  snapshotDate: date('snapshot_date').notNull(),
  generatedFromAmendmentId: uuid('generated_from_amendment_id').references(() => amendments.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`)
}, (table) => ({
  actSnapshotIdx: index('version_act_snapshot_idx').on(table.actId, table.snapshotDate)
}));
