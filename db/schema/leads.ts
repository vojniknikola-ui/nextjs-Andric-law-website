import { pgTable, uuid, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const leads = pgTable(
  'lead',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    contact: text('contact').notNull(),
    contactType: text('contact_type'),
    category: text('category').notNull(),
    message: text('message').notNull(),
    pageUrl: text('page_url'),
    pageType: text('page_type'),
    clientType: text('client_type'),
    sessionId: text('session_id'),
    source: text('source').notNull().default('chat_widget'),
    outOfHours: boolean('out_of_hours').notNull().default(false),
    status: text('status').notNull().default('new'),
    createdAt: timestamp('created_at').notNull().default(sql`now()`),
  },
  (table) => ({
    createdIdx: index('lead_created_idx').on(table.createdAt),
    sessionIdx: index('lead_session_idx').on(table.sessionId),
  }),
);
