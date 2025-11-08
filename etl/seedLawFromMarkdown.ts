import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getDb, acts, provisions } from '../db';

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

  const parsedProvisions = parseMarkdownIntoProvisions(fileContent);

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

function parseMarkdownIntoProvisions(markdown: string) {
  const blocks = markdown.split(/\n(?=# )/).map((block) => block.trim()).filter(Boolean);

  if (blocks.length === 0) {
    return [];
  }

  const sections = [] as Array<{ key: string; heading: string; body: string; level: 'article' | 'chapter' }>;

  blocks.forEach((block, idx) => {
    const headingMatch = block.match(/^#\s+(.+)$/m);
    const heading = headingMatch ? headingMatch[1].trim() : `Član ${idx + 1}`;
    const body = block.replace(/^#.+$/m, '').trim();
    sections.push({
      key: `auto_${idx + 1}`,
      heading,
      body,
      level: 'article',
    });
  });

  return sections;
}

async function runFromCLI() {
  const sourceFile = process.argv[2] ?? 'public/laws/kazneni-zakon-fbih.md';
  await seedLawFromMarkdown({
    slug: 'sample-law',
    title: 'Sample Law (imported from markdown)',
    jurisdiction: 'FBiH',
    sourceFile,
    snapshotDate: DEFAULT_SNAPSHOT,
  });
}

const isDirectExecution = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;

if (isDirectExecution) {
  runFromCLI().catch((error) => {
    console.error('Failed to seed law from markdown', error);
    process.exit(1);
  });
}
