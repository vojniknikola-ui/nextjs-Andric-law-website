import { pgTable, uuid, text, date, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { acts } from './acts';
import { versions } from './versions';
import { amendments } from './amendments';

export const provisions = pgTable('provision', {
  id: uuid('id').primaryKey().defaultRandom(),
  actId: uuid('act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  versionId: uuid('version_id').references(() => versions.id, { onDelete: 'set null' }),
  amendmentId: uuid('amendment_id').references(() => amendments.id, { onDelete: 'set null' }),
  provisionKey: text('provision_key').notNull(),
  heading: text('heading'),
  level: text('level').notNull().default('article'),
  path: text('path'),
  orderIndex: integer('order_index').notNull().default(0),
  validFrom: date('valid_from').notNull(),
  validTo: date('valid_to'),
  content: text('content').notNull(),
  plainContent: text('plain_content'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`)
}, (table) => ({
  actProvisionIdx: index('provision_act_key_idx').on(table.actId, table.provisionKey, table.validFrom),
  validityIdx: index('provision_validity_idx').on(table.actId, table.validFrom, table.validTo)
}));
