import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typesenseClient } from '@/lib/typesense';
import { expandQueryString } from './query-utils';

type TypesenseLawDocument = {
  id: string;
  act_slug: string;
  act_title: string;
  provision_key: string;
  heading?: string;
  content: string;
  plain_content: string;
  jurisdiction?: string;
};

export type LawSearchResult = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date?: string;
  tags: string[];
  category: 'zakoni';
  similarity?: number;
  matchedField?: string;
  snippetText?: string | null;
  type: 'law';
};

export type LawSuggestion = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
};

const stripTags = (value: string) => value.replace(/<[^>]*>/g, '');

const canSearchLaws = (filter: string) => filter === 'all' || filter === 'zakoni';

export async function searchLaws(query: string, filter: string, limit = 20): Promise<LawSearchResult[]> {
  if (!typesenseClient || !canSearchLaws(filter)) {
    return [];
  }

  try {
    const expandedQuery = expandQueryString(query);
    const response = await typesenseClient
      .collections('law_provisions')
      .documents()
      .search({
        q: expandedQuery,
        query_by: 'content,plain_content,heading,act_title,provision_key',
        highlight_full_fields: 'content,plain_content,heading',
        per_page: limit,
        num_typos: 2,
        min_len_1typo: 4,
        min_len_2typo: 7,
      }) as SearchResponse<TypesenseLawDocument>;

    return (response.hits || []).map((hit) => {
      const doc = hit.document;
      const highlightValue =
        hit.highlights?.find((hl) => hl.field === 'content' || hl.field === 'plain_content')?.snippet ??
        hit.highlights?.[0]?.snippet ??
        '';
      const snippetText = highlightValue ? stripTags(highlightValue) : null;

      return {
        id: doc.id,
        slug: `/zakoni/${doc.act_slug}?focus=${doc.provision_key}`,
        title: `${doc.act_title} · ${doc.heading || doc.provision_key}`,
        excerpt: doc.heading || doc.act_title,
        content: doc.content,
        tags: ['Digitalni zakon', doc.jurisdiction].filter((tag): tag is string => Boolean(tag)),
        category: 'zakoni',
        matchedField: hit.highlights?.[0]?.field,
        snippetText,
        type: 'law',
      };
    });
  } catch (error) {
    console.error('Typesense search failed', error);
    return [];
  }
}

export async function suggestLaws(query: string, limit = 5): Promise<LawSuggestion[]> {
  if (!typesenseClient || !query.trim()) {
    return [];
  }

  try {
    const response = await typesenseClient
      .collections('law_provisions')
      .documents()
      .search({
        q: query.trim(),
        query_by: 'act_title,heading,provision_key',
        per_page: Math.max(limit * 2, 8),
        prefix: true,
        num_typos: 2,
        min_len_1typo: 4,
        min_len_2typo: 7,
      }) as SearchResponse<TypesenseLawDocument>;

    const suggestions = new Map<string, LawSuggestion>();
    for (const hit of response.hits || []) {
      const doc = hit.document;
      if (!doc.act_slug || suggestions.has(doc.act_slug)) {
        continue;
      }
      suggestions.set(doc.act_slug, {
        id: doc.act_slug,
        slug: `/zakoni/${doc.act_slug}`,
        title: doc.act_title,
        subtitle: doc.heading || doc.provision_key,
      });
      if (suggestions.size >= limit) {
        break;
      }
    }

    return Array.from(suggestions.values());
  } catch (error) {
    console.error('Typesense suggest failed', error);
    return [];
  }
}
