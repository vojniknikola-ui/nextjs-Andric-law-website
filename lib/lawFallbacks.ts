import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parseMarkdownArticles } from './lawParser';
import type { ParsedProvision } from './lawParser';

interface LawFallbackConfig {
  slug: string;
  title: string;
  jurisdiction: string;
  citation?: string;
  sourceFile: string;
  snapshotDate?: string;
}

const LAW_FALLBACKS: Record<string, LawFallbackConfig> = {
  'zakon-o-advokaturi-fbih': {
    slug: 'zakon-o-advokaturi-fbih',
    title: 'Zakon o advokaturi Federacije BiH',
    jurisdiction: 'FBiH',
    citation: 'Službene novine FBiH 1/2025',
    sourceFile: 'public/laws/zakon-o-advokaturi-fbih.md',
    snapshotDate: '2025-01-10',
  },
};

export async function loadFallbackLaw(slug: string) {
  const config = LAW_FALLBACKS[slug];
  if (!config) return null;

  const filePath = path.join(process.cwd(), config.sourceFile);
  const raw = await fs.readFile(filePath, 'utf-8').catch(() => null);
  if (!raw) return null;

  const sections = parseMarkdownArticles(raw);

  const now = new Date();
  const fallbackAct = {
    id: `fallback_${slug}`,
    slug: config.slug,
    title: config.title,
    shortTitle: config.title,
    jurisdiction: config.jurisdiction,
    status: 'active',
    officialNumber: config.citation ?? null,
    officialUrl: null,
    summary: null,
    publishedAt: config.snapshotDate ?? new Date().toISOString().slice(0, 10),
    createdAt: now,
    updatedAt: now,
  } as const;

  const provisions = sections.map((section) => ({
    id: `${section.key}`,
    actId: fallbackAct.id,
    versionId: null,
    amendmentId: null,
    provisionKey: section.key,
    heading: section.heading,
    level: section.level,
    path: `#${section.key}`,
    orderIndex: section.orderIndex,
    validFrom: config.snapshotDate ?? new Date().toISOString().slice(0, 10),
    validTo: null,
    content: section.body,
    plainContent: section.body,
    createdAt: now,
  }));

  return { act: fallbackAct, provisions };
}
