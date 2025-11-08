import { pgTable, uuid, text, date, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { acts } from './acts';

export const gazetteIssues = pgTable('gazette_issue', {
  id: uuid('id').primaryKey().defaultRandom(),
  actId: uuid('act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  issueNumber: text('issue_number').notNull(),
  issueDate: date('issue_date').notNull(),
  issueType: text('issue_type').notNull().default('amendment'),
  summary: text('summary'),
  url: text('url'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`)
}, (table) => ({
  actIssueIdx: index('gazette_issue_act_idx').on(table.actId, table.issueDate)
}));
