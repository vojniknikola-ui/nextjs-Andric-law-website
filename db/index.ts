import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] DATABASE_URL is not set. Database access is disabled until it is provided.');
}

function createPool(): Pool | null {
  if (!connectionString) return null;

  const config: PoolConfig = {
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  return new Pool(config);
}

const pool = createPool();

export const db = pool ? drizzle(pool, { schema }) : null;

export function getDb() {
  if (!db) {
    throw new Error('DATABASE_URL is not configured. Set it before running queries.');
  }
  return db;
}

export * from './schema';
