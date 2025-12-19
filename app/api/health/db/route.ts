import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { getDb } from '@/db';

export const runtime = 'nodejs';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        status: 'missing_env',
        message: 'Set DATABASE_URL to enable database connectivity.',
      },
      { status: 200 },
    );
  }

  try {
    const db = getDb();
    await db.execute(sql`select 1 as ok`);
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[api/health/db] database check failed', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown database error',
      },
      { status: 500 },
    );
  }
}
