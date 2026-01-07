import { Fragment, type ReactNode } from 'react';
import { Sparkles, Search as SearchIcon } from 'lucide-react';
import SearchFilters from './SearchFilters';
import { getAllPosts } from '@/lib/blog';
import {
  searchBlogPostsWithMeta,
  type BlogSearchResult,
  type HighlightSegment,
  type HighlightSnippet,
} from '@/lib/search/blog-search';
import { searchLaws, type LawSearchResult } from '@/lib/search/law-search';
import { tokenize as tokenizeQuery } from '@/lib/search/text-utils';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

type SearchResultItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date?: string;
  readMinutes?: number;
  tags: string[];
  category: Category;
  similarity?: number;
  matchField?: 'title' | 'excerpt' | 'content' | null;
  titleSegments?: HighlightSegment[];
  snippet: HighlightSnippet | null;
  snippetText?: string | null;
  isLawDocument?: boolean;
  lawSlug?: string;
};

type HighlightRange = {
  start: number;
  end: number;
};

const MATCH_FIELD_LABEL: Record<'title' | 'excerpt' | 'content', string> = {
  title: 'Naslov',
  excerpt: 'Sažetak',
  content: 'Sadržaj',
};

const DIACRITIC_REGEX = /[\u0300-\u036f]/g;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildNormalizedMapping = (text: string) => {
  const normalizedChars: string[] = [];
  const indexMap: number[] = [];

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const normalizedChar = char.normalize('NFD').replace(DIACRITIC_REGEX, '');
    if (!normalizedChar) {
      continue;
    }

    for (const normalizedSingle of normalizedChar) {
      normalizedChars.push(normalizedSingle.toLowerCase());
      indexMap.push(i);
    }
  }

  return {
    normalized: normalizedChars.join(''),
    indexMap,
  };
};

const mergeRanges = (ranges: HighlightRange[]): HighlightRange[] => {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: HighlightRange[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }

  return merged;
};

const highlightFallbackText = (text: string, query: string): ReactNode => {
  const tokens = Array.from(new Set(tokenizeQuery(query))).filter(
    (token) => token.length > 2 || /\d/.test(token),
  );

  if (!text || tokens.length === 0) {
    return text;
  }

  const { normalized, indexMap } = buildNormalizedMapping(text);
  if (!normalized.length || indexMap.length === 0) {
    return text;
  }

  const ranges: HighlightRange[] = [];

  tokens.forEach((token) => {
    const regex = new RegExp(escapeRegExp(token), 'g');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(normalized))) {
      const startIndex = match.index;
      const endIndex = startIndex + token.length - 1;
      const startOriginal = indexMap[Math.min(startIndex, indexMap.length - 1)];
      const endOriginalIndex = indexMap[Math.min(endIndex, indexMap.length - 1)];

      if (startOriginal === undefined || endOriginalIndex === undefined) {
        continue;
      }

      ranges.push({
        start: startOriginal,
        end: Math.min(endOriginalIndex + 1, text.length),
      });
    }
  });

  if (ranges.length === 0) {
    return text;
  }

  const merged = mergeRanges(ranges);
  const pieces: ReactNode[] = [];
  let cursor = 0;

  merged.forEach((range, index) => {
    if (range.start > cursor) {
      pieces.push(
        <Fragment key={`plain-${index}`}>
          {text.slice(cursor, range.start)}
        </Fragment>,
      );
    }

    pieces.push(
      <mark key={`mark-${index}`} className="rounded-sm bg-yellow-200 px-0.5 text-inherit">
        {text.slice(range.start, range.end)}
      </mark>,
    );

    cursor = range.end;
  });

  if (cursor < text.length) {
    pieces.push(
      <Fragment key="tail">
        {text.slice(cursor)}
      </Fragment>,
    );
  }

  return <>{pieces}</>;
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
      tags: result.post.tags ?? [],
      category,
      similarity: result.similarity,
      matchField: result.matchedField,
      titleSegments: result.titleSegments,
      snippet: result.snippet ?? null,
      isLawDocument: result.post.isLawDocument,
      lawSlug: result.post.lawSlug,
    };
  });

const normalizeLawResults = (results: LawSearchResult[]): SearchResultItem[] =>
  results.map((result) => ({
    id: result.id,
    slug: result.slug,
    title: result.title,
    excerpt: result.excerpt,
    content: result.content,
    tags: result.tags,
    category: result.category,
    similarity: result.similarity,
    matchField: mapLawMatchedField(result.matchedField),
    snippet: null,
    snippetText: result.snippetText ?? null,
    isLawDocument: true,
  }));

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

const mapLawMatchedField = (field?: string | null): 'title' | 'excerpt' | 'content' | null => {
  if (!field) {
    return null;
  }
  if (field.includes('title')) {
    return 'title';
  }
  if (field.includes('heading')) {
    return 'excerpt';
  }
  return 'content';
};

const renderSnippet = (snippet: HighlightSnippet | null, fallback: string | undefined, query: string) => {
  if (!snippet) {
    if (!fallback) {
      return null;
    }
    return highlightFallbackText(fallback, query);
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

const buildSummary = (text: string | undefined, maxLength = 160) => {
  if (!text) {
    return '';
  }
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) {
    return '';
  }
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  const punctuationIndex = cleaned.slice(0, maxLength + 1).search(/[.!?]/);
  if (punctuationIndex >= 60) {
    return cleaned.slice(0, punctuationIndex + 1);
  }
  return `${cleaned.slice(0, maxLength).trimEnd()}…`;
};

const filterByCategory = (items: SearchResultItem[], filter: Category): SearchResultItem[] => {
  if (filter === 'all') {
    return items;
  }
  return items.filter((item) => item.category === filter);
};

async function searchContent(
  query: string,
  filter: Category,
): Promise<{ results: SearchResultItem[]; suggestion?: string | null }> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return { results: [] };
  }

  const posts = await getAllPosts();
  const { results: blogResults, suggestion } = searchBlogPostsWithMeta(posts, trimmedQuery);
  const lawResults = await searchLaws(trimmedQuery, filter);
  const normalizedBlog = normalizeBlogResults(blogResults);
  const normalizedLaws = normalizeLawResults(lawResults);
  const combined = [...normalizedLaws, ...normalizedBlog];
  const filtered = filterByCategory(combined, filter);

  return { results: filtered.slice(0, 20), suggestion };
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
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-700 shadow-md">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-700">
            <SearchIcon className="h-5 w-5" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Andrić Law</p>
              <h3 className="text-xl font-semibold text-slate-900">Dobrodošli u našu bazu znanja</h3>
              <p className="mt-2 text-slate-600">
                Pretražujte stručne članke, zakonske analize i vodiče koje priprema tim Andrić Law kancelarije.
              </p>
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>• Unesite tačne izraze, npr. &ldquo;član 6 stvarna prava&rdquo; ili &ldquo;otkaz ugovora&rdquo;</li>
              <li>• Kombinujte filtere kako biste brzo došli do željene oblasti prava</li>
              <li>• Snippeti prikazuju dio originalnog teksta gdje je pojam pronađen</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const activeFilter = (filter || 'all') as Category;
  const { results, suggestion } = await searchContent(query, activeFilter);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            <Sparkles className="h-3.5 w-3.5" /> Andrić Law Research
          </span>
          <span className="text-sm text-slate-600">
            Pretražujete: <span className="font-semibold text-slate-900">{query}</span>
          </span>
          {results.length > 0 && (
            <span className="text-sm text-slate-500">
              Rezultata: <span className="font-medium text-slate-700">{results.length}</span>
            </span>
          )}
        </div>
        <SearchFilters currentFilter={activeFilter} query={query} />
      </div>

      <div className="mt-6">
        {suggestion && (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-900">
            Da li ste mislili:{' '}
            <a
              className="font-semibold text-blue-700 underline-offset-4 hover:underline"
              href={`/search?q=${encodeURIComponent(suggestion)}`}
            >
              {suggestion}
            </a>
            ?
          </div>
        )}
        {results.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              Nema rezultata za &ldquo;{query}&rdquo;
            </h3>
            <p className="mb-4 text-slate-600">
              Naša baza trenutno nema zapis koji odgovara ovom upitu. Pokušajte promijeniti ključne riječi ili filtere.
            </p>
            <div className="text-sm text-slate-500">
              <p className="mb-2 font-medium">Kako do preciznijih pogodaka:</p>
              <ul className="space-y-1">
                <li>• Kombinujte pojmove (npr. &ldquo;član 6 stvarna prava&rdquo;)</li>
                <li>• Koristite padeže iz samog zakona</li>
                <li>• Odaberite filter &ldquo;Sve&rdquo; za širu pretragu</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => {
              const fallbackSource = result.snippetText || result.excerpt || result.content || '';
              const fallback = fallbackSource.length > 260
                ? `${fallbackSource.slice(0, 260).trimEnd()}…`
                : fallbackSource;
              const summary = buildSummary(result.excerpt || result.content || result.title);
              const showMeta = Boolean(result.date && result.readMinutes && !result.isLawDocument);

              return (
                <a
                  key={result.id}
                  href={getCategoryLink(result)}
                  className="block rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(result.category)}`}>
                        {getCategoryLabel(result.category)}
                      </span>
                      {showMeta && (
                        <span className="text-xs text-slate-500">
                          {new Date(result.date ?? '').toLocaleDateString('bs-BA')} · {result.readMinutes} min
                        </span>
                      )}
                    </div>
                    {typeof result.similarity === 'number' && (
                      <span className="text-xs font-medium text-blue-700">
                        Sličnost {result.similarity.toFixed(0)}%
                        {result.matchField ? ` · ${MATCH_FIELD_LABEL[result.matchField]}` : ''}
                      </span>
                    )}
                  </div>

                  <h2 className="mb-3 text-xl font-semibold text-slate-900 transition group-hover:text-blue-600">
                    {renderSegments(result.titleSegments, result.title)}
                  </h2>
                  {result.isLawDocument && (
                    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                      Digitalni zakon
                    </p>
                  )}

                  {summary && (
                    <div className="mb-4 text-sm text-slate-600">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Sažetak
                      </p>
                      <p>{summary}</p>
                    </div>
                  )}

                  <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-relaxed text-blue-900">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-800">
                      Relevantni odlomak
                    </p>
                    <p>
                      {renderSnippet(result.snippet, fallback, query)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                      Andrić Law insight
                    </span>
                    {result.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function getCategoryLink(result: { slug: string; lawSlug?: string; isLawDocument?: boolean }) {
  if (result.isLawDocument && result.lawSlug) {
    return `/zakoni/${result.lawSlug}`;
  }
  if (result.slug.startsWith('/')) {
    return result.slug;
  }
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
