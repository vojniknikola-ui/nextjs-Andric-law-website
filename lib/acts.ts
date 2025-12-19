import { and, eq, gt, isNull, lte, or } from 'drizzle-orm';
import { getDb, acts, provisions } from '@/db';

export interface ActWithProvisions {
  act: typeof acts.$inferSelect;
  provisions: typeof provisions.$inferSelect[];
}

export async function fetchActSnapshot(slug: string, snapshotDate: string): Promise<ActWithProvisions | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const db = getDb();
  const act = await db.query.acts.findFirst({
    where: eq(acts.slug, slug),
  });

  if (!act) {
    return null;
  }

  const dateValue = snapshotDate || new Date().toISOString().slice(0, 10);

  const rows = await db
    .select()
    .from(provisions)
    .where(
      and(
        eq(provisions.actId, act.id),
        lte(provisions.validFrom, dateValue),
        or(isNull(provisions.validTo), gt(provisions.validTo, dateValue)),
      ),
    )
    .orderBy(provisions.orderIndex);

  return { act, provisions: rows };
}
