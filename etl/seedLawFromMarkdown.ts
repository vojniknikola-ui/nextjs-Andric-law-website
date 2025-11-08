import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getDb, acts, provisions } from '../db';
import { parseMarkdownArticles } from '../lib/lawParser';

interface SeedOptions {
  slug: string;
  title: string;
  jurisdiction: string;
  sourceFile: string;
  snapshotDate: string; // ISO date (YYYY-MM-DD)
}

const DEFAULT_SNAPSHOT = new Date().toISOString().slice(0, 10);

export async function seedLawFromMarkdown(options: SeedOptions) {
  const db = getDb();
  const absoluteFile = path.isAbsolute(options.sourceFile)
    ? options.sourceFile
    : path.join(process.cwd(), options.sourceFile);

  const fileContent = await fs.readFile(absoluteFile, 'utf-8');

  const [actRecord] = await db
    .insert(acts)
    .values({
      slug: options.slug,
      title: options.title,
      shortTitle: options.title,
      jurisdiction: options.jurisdiction,
      status: 'active',
      publishedAt: options.snapshotDate,
    })
    .onConflictDoNothing()
    .returning();

  if (!actRecord) {
    throw new Error(`Act ${options.slug} already exists. Delete it or change the slug.`);
  }

  const parsedProvisions = parseMarkdownArticles(fileContent);

  const provisionRows = parsedProvisions.map((section, index) => ({
    actId: actRecord.id,
    provisionKey: section.key,
    heading: section.heading,
    level: section.level,
    orderIndex: index,
    validFrom: options.snapshotDate,
    content: section.body,
    plainContent: section.body,
  }));

  if (provisionRows.length === 0) {
    console.warn('[seedLawFromMarkdown] no provisions parsed. Did the source file contain markdown headings?');
  }

  await db.insert(provisions).values(provisionRows);

  console.log(`✔ Seeded ${provisionRows.length} provisions for ${options.title}`);
}

async function runFromCLI() {
  const args = process.argv.slice(2);
  const options: SeedOptions = {
    slug: getArg(args, '--slug') ?? 'sample-law',
    title: getArg(args, '--title') ?? 'Sample Law (imported from markdown)',
    jurisdiction: getArg(args, '--jurisdiction') ?? 'FBiH',
    sourceFile: getArg(args, '--source') ?? 'public/laws/kazneni-zakon-fbih.md',
    snapshotDate: getArg(args, '--snapshot') ?? DEFAULT_SNAPSHOT,
  };

  await seedLawFromMarkdown(options);
}

const isDirectExecution = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;

if (isDirectExecution) {
  runFromCLI().catch((error) => {
    console.error('Failed to seed law from markdown', error);
    process.exit(1);
  });
}

function getArg(args: string[], key: string): string | undefined {
  const index = args.indexOf(key);
  if (index === -1) return undefined;
  return args[index + 1];
}
