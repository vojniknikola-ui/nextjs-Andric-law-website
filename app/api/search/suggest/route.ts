import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { normalizeText } from '@/lib/search/text-utils';
import { suggestLaws } from '@/lib/search/law-search';

export const runtime = 'nodejs';

type SuggestionItem = {
  id: string;
  label: string;
  subtitle?: string;
  href?: string;
  type: 'law' | 'blog';
};

const MAX_SUGGESTIONS = 8;

const normalize = (value: string) => normalizeText(value || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const normalizedQuery = normalize(q);
    const posts = await getAllPosts();

    const blogSuggestions: SuggestionItem[] = posts
      .filter((post) => {
        const title = normalize(post.title);
        const excerpt = normalize(post.excerpt);
        return title.includes(normalizedQuery) || excerpt.includes(normalizedQuery);
      })
      .slice(0, MAX_SUGGESTIONS)
      .map((post) => {
        const isLaw = Boolean(post.isLawDocument && post.lawSlug);
        return {
          id: post.slug,
          label: post.title,
          subtitle: isLaw ? 'Zakon' : 'Članak',
          href: isLaw ? `/zakoni/${post.lawSlug}` : `/blog/${post.slug}`,
          type: isLaw ? 'law' : 'blog',
        };
      });

    const lawSuggestions = await suggestLaws(q, Math.max(3, MAX_SUGGESTIONS - blogSuggestions.length));

    const suggestions: SuggestionItem[] = [];
    const seen = new Set<string>();

    const pushSuggestion = (item: SuggestionItem) => {
      if (suggestions.length >= MAX_SUGGESTIONS) {
        return;
      }
      const key = item.href || item.label;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      suggestions.push(item);
    };

    lawSuggestions.forEach((law) =>
      pushSuggestion({
        id: law.id,
        label: law.title,
        subtitle: law.subtitle,
        href: law.slug,
        type: 'law',
      }),
    );
    blogSuggestions.forEach((item) => pushSuggestion(item));

    return NextResponse.json(
      { suggestions },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (error) {
    console.error('Search suggest error', error);
    return NextResponse.json({ suggestions: [] }, { status: 200 });
  }
}
