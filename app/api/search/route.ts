import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { searchBlogPosts, type HighlightSnippet } from '@/lib/search/blog-search';
import { typesenseClient } from '@/lib/typesense';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';

export const runtime = 'nodejs';

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

const inferCategory = (tags: string[]): 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' => {
  const normalized = tags.map((tag) => tag.toLowerCase());
  if (normalized.some((tag) => tag.includes('zakon'))) {
    return 'zakoni';
  }
  if (normalized.some((tag) => tag.includes('sudska') || tag.includes('pravosuđe'))) {
    return 'sudska-praksa';
  }
  return 'vijesti-clanci';
};

const snippetToPlainText = (snippet: HighlightSnippet | null): string | null => {
  if (!snippet) {
    return null;
  }
  const joined = snippet.segments.map((segment) => segment.text).join('');
  if (!joined) {
    return null;
  }
  return `${snippet.prefix ? '…' : ''}${joined}${snippet.suffix ? '…' : ''}`;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const filter = searchParams.get('filter') || 'all';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const posts = await getAllPosts();
    const lawResults = await searchLaws(q, filter);
    const blogMatches = searchBlogPosts(posts, q);

    const blogResults = blogMatches
      .map((match) => ({
        id: match.post.slug,
        slug: match.post.slug,
        title: match.post.title,
        excerpt: match.post.excerpt,
        content: match.post.content,
        date: match.post.date,
        readMinutes: match.post.readMinutes,
        tags: match.post.tags,
        category: inferCategory(match.post.tags ?? []),
        similarity: match.similarity,
        matchedField: match.matchedField,
        snippetText: snippetToPlainText(match.snippet ?? null),
        type: 'blog' as const,
      }))
      .filter((result) => {
        if (filter === 'all') {
          return true;
        }
        if (filter === 'zakoni') {
          return result.category === 'zakoni';
        }
        if (filter === 'sudska-praksa') {
          return result.category === 'sudska-praksa';
        }
        if (filter === 'vijesti-clanci') {
          return result.category === 'vijesti-clanci';
        }
        return true;
      })
      .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0));

    const results = [...lawResults, ...blogResults];

    return NextResponse.json(
      { results: results.slice(0, 20) },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (error) {
    console.error('Search API error', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

type LawSearchResult = {
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

async function searchLaws(q: string, filter: string): Promise<LawSearchResult[]> {
  if (!typesenseClient) {
    return [];
  }

  const allowLawCategory =
    filter === 'all' || filter === 'zakoni';

  if (!allowLawCategory) {
    return [];
  }

  try {
    const response = await typesenseClient
      .collections('law_provisions')
      .documents()
      .search({
        q,
        query_by: 'content,plain_content,heading,act_title,provision_key',
        highlight_full_fields: 'content,plain_content,heading',
        per_page: 20,
      }) as SearchResponse<TypesenseLawDocument>;

    return (response.hits || []).map((hit) => {
      const doc = hit.document;
      const highlightValue =
        hit.highlights?.find((hl) => hl.field === 'content' || hl.field === 'plain_content')?.snippet ??
        hit.highlights?.[0]?.snippet ??
        '';

      return {
        id: doc.id,
        slug: `/zakoni/${doc.act_slug}?focus=${doc.provision_key}`,
        title: `${doc.act_title} · ${doc.heading || doc.provision_key}`,
        excerpt: doc.heading || doc.act_title,
        content: doc.content,
        tags: ['Digitalni zakon', doc.jurisdiction].filter((tag): tag is string => Boolean(tag)),
        category: 'zakoni',
        similarity: hit.text_match,
        matchedField: hit.highlights?.[0]?.field,
        snippetText: highlightValue,
        type: 'law',
      };
    });
  } catch (error) {
    console.error('Typesense search failed', error);
    return [];
  }
}
