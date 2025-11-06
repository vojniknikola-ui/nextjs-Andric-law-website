import { Fragment } from 'react';
import SearchFilters from './SearchFilters';
import { getAllPosts } from '@/lib/blog';
import {
  searchBlogPosts,
  type BlogSearchResult,
  type HighlightSegment,
  type HighlightSnippet,
} from '@/lib/search/blog-search';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

type SearchResultItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  readMinutes: number;
  tags: string[];
  category: Category;
  similarity?: number;
  matchField?: 'title' | 'excerpt' | 'content' | null;
  titleSegments?: HighlightSegment[];
  snippet?: HighlightSnippet | null;
};

const MATCH_FIELD_LABEL: Record<'title' | 'excerpt' | 'content', string> = {
  title: 'Naslov',
  excerpt: 'Sažetak',
  content: 'Sadržaj',
};

const inferCategory = (tags: string[]): Category => {
  const normalized = tags.map((tag) => tag.toLowerCase());
  if (normalized.some((tag) => tag.includes('zakon'))) {
    return 'zakoni';
  }
  if (normalized.some((tag) => tag.includes('sudska') || tag.includes('pravosuđe'))) {
    return 'sudska-praksa';
  }
  return 'vijesti-clanci';
};

const normalizeBlogResults = (results: BlogSearchResult[]): SearchResultItem[] =>
  results.map((result) => {
    const category = inferCategory(result.post.tags ?? []);
    return {
      id: result.post.slug,
      slug: result.post.slug,
      title: result.post.title,
      excerpt: result.post.excerpt,
      content: result.post.content,
      date: result.post.date,
      readMinutes: result.post.readMinutes,
      tags: result.post.tags,
      category,
      similarity: result.similarity,
      matchField: result.matchedField,
      titleSegments: result.titleSegments,
      snippet: result.snippet ?? null,
    };
  });

const renderSegments = (segments: HighlightSegment[] | undefined, fallback: string) => {
  if (!segments || segments.length === 0) {
    return fallback;
  }
  return segments.map((segment, index) =>
    segment.highlight ? (
      <mark key={`${segment.text}-${index}`} className="rounded-sm bg-yellow-200 px-0.5 text-inherit">
        {segment.text}
      </mark>
    ) : (
      <Fragment key={`${segment.text}-${index}`}>{segment.text}</Fragment>
    ),
  );
};

const renderSnippet = (snippet: HighlightSnippet | null, fallback?: string) => {
  if (!snippet) {
    if (!fallback) {
      return null;
    }
    return fallback;
  }

  return (
    <>
      {snippet.prefix ? '…' : ''}
      {snippet.segments.map((segment, index) =>
        segment.highlight ? (
          <mark key={`${segment.text}-${index}`} className="rounded-sm bg-yellow-200 px-0.5 text-inherit">
            {segment.text}
          </mark>
        ) : (
          <Fragment key={`${segment.text}-${index}`}>{segment.text}</Fragment>
        ),
      )}
      {snippet.suffix ? '…' : ''}
    </>
  );
};

const filterByCategory = (items: SearchResultItem[], filter: Category): SearchResultItem[] => {
  if (filter === 'all') {
    return items;
  }
  return items.filter((item) => item.category === filter);
};

async function searchContent(query: string, filter: Category): Promise<SearchResultItem[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  const posts = await getAllPosts();
  const blogResults = searchBlogPosts(posts, trimmedQuery);
  const normalized = normalizeBlogResults(blogResults);
  const filtered = filterByCategory(normalized, filter);

  return filtered.slice(0, 20);
}

export default async function SearchResults({
  query,
  filter,
}: {
  query?: string;
  filter?: string;
}) {
  if (!query) {
    return (
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900 shadow-sm">
        <h3 className="mb-2 font-semibold">Kako pretraživati?</h3>
        <ul className="space-y-1">
          <li>• Unesite ključne riječi (npr. &ldquo;otkaz ugovora&rdquo;, &ldquo;osnivanje doo&rdquo;)</li>
          <li>• Dodajte filtere kako biste suzili rezultate</li>
          <li>• Pretraga pregledava naslove, sažetke i sadržaj članaka</li>
        </ul>
      </div>
    );
  }

  const activeFilter = (filter || 'all') as Category;
  const results = await searchContent(query, activeFilter);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600">Pretražujete:</span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
            {`"${query}"`}
          </span>
          {results.length > 0 && (
            <span className="text-sm text-gray-500">
              {`Pronađeno ${results.length} rezultata`}
            </span>
          )}
        </div>
        <SearchFilters currentFilter={activeFilter} query={query} />
      </div>

      <div className="mt-6">
        {results.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Nema rezultata za &ldquo;{query}&rdquo;
            </h3>
            <p className="mb-4 text-gray-600">
              Pokušajte sa drugačijim ključnim riječima ili promijenite filter.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2 font-medium">Prijedlozi:</p>
              <ul className="space-y-1">
                <li>• Koristite opštije pojmove</li>
                <li>• Provjerite pravopis ili padeže</li>
                <li>• Isprobajte filter &ldquo;Sve&rdquo;</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {results.map((result) => (
              <a
                key={result.id}
                href={getCategoryLink(result)}
                className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(result.category)}`}>
                      {getCategoryLabel(result.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(result.date).toLocaleDateString('bs-BA')} · {result.readMinutes} min čitanja
                    </span>
                  </div>
                  {typeof result.similarity === 'number' && (
                    <span className="text-xs font-medium text-blue-700">
                      Sličnost {result.similarity.toFixed(0)}%
                      {result.matchField ? ` · ${MATCH_FIELD_LABEL[result.matchField]}` : ''}
                    </span>
                  )}
                </div>

                <h2 className="mb-3 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                  {renderSegments(result.titleSegments, result.title)}
                </h2>

                <div className="mb-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Relevantni dio teksta
                  </p>
                  <p className="text-sm leading-relaxed text-blue-900">
                    {renderSnippet(result.snippet, result.excerpt || result.content?.slice(0, 200))}
                  </p>
                </div>

                {result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {result.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function getCategoryLink(result: { slug: string }) {
  return `/blog/${result.slug}`;
}

function getCategoryColor(category: Category) {
  switch (category) {
    case 'zakoni':
      return 'bg-blue-100 text-blue-800';
    case 'sudska-praksa':
      return 'bg-purple-100 text-purple-800';
    case 'vijesti-clanci':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getCategoryLabel(category: Category) {
  switch (category) {
    case 'zakoni':
      return 'Zakoni i podzakonski akti';
    case 'sudska-praksa':
      return 'Sudska praksa';
    case 'vijesti-clanci':
      return 'Vijesti i članci';
    default:
      return 'Ostalo';
  }
}
