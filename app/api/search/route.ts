import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { searchBlogPosts, type HighlightSnippet } from '@/lib/search/blog-search';

export const runtime = 'edge';

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
    const matches = searchBlogPosts(posts, q);

    const results = matches
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
