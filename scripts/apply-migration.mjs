import 'dotenv/config';
import { neon, neonConfig } from '@neondatabase/serverless';
import { promises as fs } from 'fs';
import path from 'path';

neonConfig.fetchConnectionCache = true;

async function main() {
  const targetFile = process.argv[2] ?? 'drizzle/0000_special_ravenous.sql';
  const filePath = path.resolve(process.cwd(), targetFile);

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined.');
  }

  const sql = neon(connectionString);
  const raw = await fs.readFile(filePath, 'utf-8');
  const cleaned = raw
    .replace(/;\s*-->[\s-]*statement-breakpoint/g, ';')
    .replace(/-->[\s-]*statement-breakpoint/g, '')
    .replace(/^--.*$/gm, '')
    .replace(/^-->.*$/gm, '')
    .trim();
  const statements = cleaned
    .split(/;\s*(?:\r?\n|$)/)
    .map((stmt) => stmt.trim())
    .filter(Boolean);

  for (const statement of statements) {
    if (!statement.trim()) continue;
    try {
      await sql.query(statement);
      console.log('Executed:', statement.split('\n')[0].slice(0, 80));
    } catch (error) {
      console.error('Failed statement:', statement);
      throw error;
    }
  }

  console.log('Migration applied successfully');
}

main().catch((error) => {
  console.error('Failed to apply migration', error);
  process.exit(1);
});
