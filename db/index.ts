import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] DATABASE_URL is not set. Database access is disabled until it is provided.');
}

neonConfig.fetchConnectionCache = true;

const sql = connectionString ? neon(connectionString) : null;

export const db = sql ? drizzle(sql, { schema }) : null;

export function getDb() {
  if (!db) {
    throw new Error('DATABASE_URL is not configured. Set it before running queries.');
  }
  return db;
}

export * from './schema';
