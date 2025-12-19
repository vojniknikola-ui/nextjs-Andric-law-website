import 'dotenv/config';
import { typesenseClient } from '@/lib/typesense';
import { getDb, acts, provisions } from '@/db';
import { eq } from 'drizzle-orm';

const COLLECTION = 'law_provisions';

type LawProvisionDocument = {
  id: string;
  act_slug: string;
  act_title: string;
  provision_key: string;
  heading: string;
  level: string;
  content: string;
  plain_content: string;
  jurisdiction: string;
  valid_from?: number;
  valid_to?: number;
  order_index: number;
  snapshot_date?: number;
};

async function ensureCollection() {
  if (!typesenseClient) {
    throw new Error('Typesense client is not configured.');
  }

  const collections = await typesenseClient.collections().retrieve();
  const exists = collections.some((collection) => collection.name === COLLECTION);

  if (exists) {
    await typesenseClient.collections(COLLECTION).delete();
  }

  await typesenseClient.collections().create({
    name: COLLECTION,
    fields: [
      { name: 'id', type: 'string' },
      { name: 'act_slug', type: 'string', facet: true },
      { name: 'act_title', type: 'string' },
      { name: 'provision_key', type: 'string', facet: true },
      { name: 'heading', type: 'string' },
      { name: 'level', type: 'string', facet: true },
      { name: 'content', type: 'string' },
      { name: 'plain_content', type: 'string' },
      { name: 'jurisdiction', type: 'string', facet: true },
      { name: 'valid_from', type: 'int64', optional: true },
      { name: 'valid_to', type: 'int64', optional: true },
      { name: 'order_index', type: 'int32' },
      { name: 'snapshot_date', type: 'int64', optional: true },
    ],
    default_sorting_field: 'order_index',
  });
}

async function syncProvisions() {
  if (!typesenseClient) {
    throw new Error('Typesense client is not configured.');
  }

  const db = getDb();
  const actsList = await db.select().from(acts);

  const documents: LawProvisionDocument[] = [];

  for (const act of actsList) {
    const actProvisions = await db.select().from(provisions).where(eq(provisions.actId, act.id));
    actProvisions.forEach((prov) => {
      documents.push({
        id: prov.id,
        act_slug: act.slug,
        act_title: act.title,
        provision_key: prov.provisionKey,
        heading: prov.heading ?? '',
        level: prov.level,
        content: prov.content,
        plain_content: prov.plainContent ?? prov.content,
        jurisdiction: act.jurisdiction,
        valid_from: prov.validFrom ? Date.parse(String(prov.validFrom)) : undefined,
        valid_to: prov.validTo ? Date.parse(String(prov.validTo)) : undefined,
        order_index: prov.orderIndex,
        snapshot_date: act.publishedAt ? Date.parse(String(act.publishedAt)) : undefined,
      });
    });
  }

  const chunkSize = 200;
  for (let i = 0; i < documents.length; i += chunkSize) {
    const chunk = documents.slice(i, i + chunkSize);
    await typesenseClient.collections(COLLECTION).documents().import(chunk, { action: 'upsert' });
  }
}

async function main() {
  await ensureCollection();
  await syncProvisions();
  console.log('Typesense index updated');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
