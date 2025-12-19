import { pgTable, uuid, text, date, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { acts } from './acts';
import { gazetteIssues } from './gazetteIssues';

export const amendments = pgTable('amendment', {
  id: uuid('id').primaryKey().defaultRandom(),
  actId: uuid('act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  gazetteIssueId: uuid('gazette_issue_id').references(() => gazetteIssues.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  effectiveFrom: date('effective_from').notNull(),
  effectiveTo: date('effective_to'),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`)
}, (table) => ({
  actEffectiveIdx: index('amendment_act_effective_idx').on(table.actId, table.effectiveFrom)
}));
