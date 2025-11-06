import type { BlogPost } from '@/types/blog';
import {
  boundedLevenshtein,
  buildNormalizedCorpus,
  getTokenThreshold,
  normalizeText,
  tokenize,
} from './text-utils';

const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

const SECTION_WEIGHTS = {
  title: 7,
  excerpt: 5,
  content: 3,
} as const;

const PHRASE_BONUS = 6;
const MIN_CONFIDENCE = 5;
const SNIPPET_LENGTH = 220;

type SectionKey = 'title' | 'excerpt' | 'content';

interface IndexedPost {
  post: BlogPost;
  normalizedTitle: string;
  normalizedExcerpt: string;
  normalizedContent: string;
  titleTokens: string[];
  excerptTokens: string[];
  contentTokens: string[];
}

export interface HighlightSegment {
  text: string;
  highlight: boolean;
}

export interface HighlightSnippet {
  prefix: boolean;
  suffix: boolean;
  segments: HighlightSegment[];
}

export interface BlogSearchResult {
  post: BlogPost;
  similarity: number;
  matchedField: SectionKey | null;
  titleSegments: HighlightSegment[];
  snippet: HighlightSnippet | null;
}

const removeDiacritics = (value: string): string =>
  value.normalize('NFD').replace(DIACRITICS_REGEXP, '');

const buildNormalizationIndex = (text: string): { normalized: string; map: number[] } => {
  const normalizedParts: string[] = [];
  const map: number[] = [];

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const normalizedChar = removeDiacritics(char);

    for (let i = 0; i < normalizedChar.length; i += 1) {
      normalizedParts.push(normalizedChar[i].toLowerCase());
      map.push(index);
    }
  }

  return { normalized: normalizedParts.join(''), map };
};

const evaluateSectionMatch = (
  token: string,
  sectionTokens: string[],
  normalizedSection: string,
): number => {
  if (!token) {
    return 0;
  }

  if (normalizedSection.includes(token)) {
    return 1;
  }

  const threshold = getTokenThreshold(token.length);
  if (threshold === 0) {
    return 0;
  }

  let bestDistance: number | null = null;
  for (const candidate of sectionTokens) {
    if (!candidate) {
      continue;
    }

    if (Math.abs(candidate.length - token.length) > threshold) {
      continue;
    }

    const distance = boundedLevenshtein(token, candidate, threshold);
    if (distance <= threshold) {
      if (distance === 0) {
        return 1;
      }

      if (bestDistance === null || distance < bestDistance) {
        bestDistance = distance;
      }
    }
  }

  if (bestDistance === null) {
    return 0;
  }

  const closeness = 1 - bestDistance / (threshold + 1);
  return Math.max(0, Math.min(1, closeness));
};

const buildHighlightMask = (text: string, tokens: string[]): boolean[] => {
  const mask = new Array<boolean>(text.length).fill(false);
  if (!text || tokens.length === 0) {
    return mask;
  }

  const { normalized, map } = buildNormalizationIndex(text);
  if (!normalized.length) {
    return mask;
  }

  const normalizedTokens = tokens
    .map((token) => removeDiacritics(token).toLowerCase())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  for (const token of normalizedTokens) {
    let index = normalized.indexOf(token);
    if (index === -1) {
      continue;
    }

    while (index !== -1) {
      const start = map[index];
      const end = map[Math.min(map.length - 1, index + token.length - 1)] + 1;

      for (let cursor = start; cursor < end; cursor += 1) {
        mask[cursor] = true;
      }

      index = normalized.indexOf(token, index + Math.max(1, token.length));
    }
  }

  return mask;
};

const buildSegmentsFromMask = (
  text: string,
  mask: boolean[],
  start = 0,
  end = text.length,
): HighlightSegment[] => {
  if (!text) {
    return [];
  }

  const segments: HighlightSegment[] = [];
  let currentStart = start;
  let currentHighlight = mask[start] ?? false;

  for (let cursor = start; cursor < end; cursor += 1) {
    const highlight = mask[cursor] ?? false;
    if (highlight !== currentHighlight) {
      if (cursor > currentStart) {
        segments.push({
          text: text.slice(currentStart, cursor),
          highlight: currentHighlight,
        });
      }
      currentStart = cursor;
      currentHighlight = highlight;
    }
  }

  if (end > currentStart) {
    segments.push({
      text: text.slice(currentStart, end),
      highlight: currentHighlight,
    });
  }

  return segments;
};

const createHighlightedSegments = (text: string, tokens: string[]): HighlightSegment[] => {
  if (!text) {
    return [];
  }
  const mask = buildHighlightMask(text, tokens);
  return buildSegmentsFromMask(text, mask);
};

const createHighlightedSnippet = (text: string, tokens: string[]): HighlightSnippet | null => {
  if (!text) {
    return null;
  }

  const { normalized, map } = buildNormalizationIndex(text);
  const normalizedLower = normalized.toLowerCase();
  const relevantTokens = tokens.filter(Boolean);

  const findPhraseRange = (): { start: number; end: number } | null => {
    if (relevantTokens.length === 0) {
      return null;
    }

    if (relevantTokens.length === 1) {
      const pos = normalizedLower.indexOf(relevantTokens[0]);
      return pos === -1 ? null : { start: pos, end: pos + relevantTokens[0].length };
    }

    const MAX_GAP = 40;
    const positions = relevantTokens.map((token) => {
      const indexes: number[] = [];
      let idx = normalizedLower.indexOf(token);
      while (idx !== -1) {
        indexes.push(idx);
        idx = normalizedLower.indexOf(token, idx + 1);
      }
      return indexes;
    });

    if (positions.some((list) => list.length === 0)) {
      return null;
    }

    for (const startPos of positions[0]) {
      let currentEnd = startPos + relevantTokens[0].length;
      let valid = true;

      for (let i = 1; i < positions.length; i += 1) {
        const nextPos = positions[i].find((pos) => pos >= currentEnd && pos - currentEnd <= MAX_GAP);
        if (nextPos === undefined) {
          valid = false;
          break;
        }
        currentEnd = nextPos + relevantTokens[i].length;
      }

      if (valid) {
        return { start: startPos, end: currentEnd };
      }
    }

    const longestToken = [...relevantTokens].sort((a, b) => b.length - a.length)[0];
    if (!longestToken) {
      return null;
    }
    const pos = normalizedLower.indexOf(longestToken);
    return pos === -1 ? null : { start: pos, end: pos + longestToken.length };
  };

  const phraseRange = findPhraseRange();
  const mask = buildHighlightMask(text, tokens);

  let firstHighlight = mask.findIndex(Boolean);
  let lastHighlight = mask.length - 1 - [...mask].reverse().findIndex(Boolean);

  if (phraseRange) {
    const mappedStart = map[phraseRange.start] ?? 0;
    const mappedEnd = map[Math.min(map.length - 1, phraseRange.end - 1)] ?? mappedStart;
    firstHighlight = mappedStart;
    lastHighlight = Math.max(mappedEnd, mappedStart);
  }

  if (firstHighlight === -1 || lastHighlight < firstHighlight) {
    const trimmed = text.trim();
    if (!trimmed) {
      return null;
    }
    const shortened =
      trimmed.length > SNIPPET_LENGTH ? `${trimmed.slice(0, SNIPPET_LENGTH).trimEnd()}…` : trimmed;
    return {
      prefix: false,
      suffix: trimmed.length > SNIPPET_LENGTH,
      segments: [{ text: shortened, highlight: false }],
    };
  }

  const highlightedSpan = lastHighlight - firstHighlight;
  const availablePadding = Math.max(0, SNIPPET_LENGTH - highlightedSpan);
  let start = Math.max(0, firstHighlight - Math.floor(availablePadding / 2));
  let end = Math.min(text.length, start + SNIPPET_LENGTH);

  while (start > 0 && !/\s/.test(text.charAt(start - 1))) {
    start -= 1;
    if (start === 0) {
      break;
    }
  }

  while (end < text.length && !/\s/.test(text.charAt(end))) {
    end += 1;
  }

  const segments = buildSegmentsFromMask(text, mask, start, end);
  return {
    prefix: start > 0,
    suffix: end < text.length,
    segments,
  };
};

const indexPosts = (posts: BlogPost[]): IndexedPost[] =>
  posts.map((post) => ({
    post,
    normalizedTitle: buildNormalizedCorpus(post.title || ''),
    normalizedExcerpt: buildNormalizedCorpus(post.excerpt || ''),
    normalizedContent: buildNormalizedCorpus(post.content || ''),
    titleTokens: tokenize(post.title || ''),
    excerptTokens: tokenize(post.excerpt || ''),
    contentTokens: tokenize(post.content || ''),
  }));

const scorePost = (
  entry: IndexedPost,
  queryTokens: string[],
  normalizedQuery: string,
): BlogSearchResult | null => {
  const sectionTotals: Record<SectionKey, number> = {
    title: 0,
    excerpt: 0,
    content: 0,
  };

  for (const token of queryTokens) {
    const normalizedToken = normalizeText(token);

    const titleScore = evaluateSectionMatch(normalizedToken, entry.titleTokens, entry.normalizedTitle);
    sectionTotals.title += titleScore * SECTION_WEIGHTS.title;

    const excerptScore = evaluateSectionMatch(
      normalizedToken,
      entry.excerptTokens,
      entry.normalizedExcerpt,
    );
    sectionTotals.excerpt += excerptScore * SECTION_WEIGHTS.excerpt;

    const contentScore = evaluateSectionMatch(
      normalizedToken,
      entry.contentTokens,
      entry.normalizedContent,
    );
    sectionTotals.content += contentScore * SECTION_WEIGHTS.content;
  }

  if (
    sectionTotals.title === 0 &&
    sectionTotals.excerpt === 0 &&
    sectionTotals.content === 0
  ) {
    return null;
  }

  let rawScore = sectionTotals.title + sectionTotals.excerpt + sectionTotals.content;
  if (normalizedQuery) {
    if (entry.normalizedTitle.includes(normalizedQuery)) {
      rawScore += PHRASE_BONUS * 1.25;
      sectionTotals.title += PHRASE_BONUS * 0.5;
    }
    if (entry.normalizedExcerpt.includes(normalizedQuery)) {
      rawScore += PHRASE_BONUS;
      sectionTotals.excerpt += PHRASE_BONUS * 0.4;
    } else if (entry.normalizedContent.includes(normalizedQuery)) {
      rawScore += PHRASE_BONUS * 0.8;
      sectionTotals.content += PHRASE_BONUS * 0.3;
    }
  }

  const sections: SectionKey[] = ['title', 'excerpt', 'content'];
  let matchedField: SectionKey | null = null;
  let bestSectionScore = 0;
  for (const section of sections) {
    const sectionScore = sectionTotals[section];
    if (sectionScore > bestSectionScore) {
      bestSectionScore = sectionScore;
      matchedField = section;
    }
  }

  const theoreticalMax =
    queryTokens.length *
      (SECTION_WEIGHTS.title + SECTION_WEIGHTS.excerpt + SECTION_WEIGHTS.content) +
    PHRASE_BONUS * 1.25 +
    1;

  const similarity = Math.max(
    MIN_CONFIDENCE,
    Math.min(100, Math.round((rawScore / theoreticalMax) * 100)),
  );

  const titleSegments = createHighlightedSegments(entry.post.title || '', queryTokens);

  const snippetField =
    matchedField === 'title'
      ? entry.post.excerpt || entry.post.content || ''
      : matchedField === 'excerpt'
        ? entry.post.excerpt || entry.post.content || ''
        : entry.post.content || entry.post.excerpt || '';

  const snippet = createHighlightedSnippet(snippetField, queryTokens);

  return {
    post: entry.post,
    similarity,
    matchedField,
    titleSegments,
    snippet,
  };
};

export const searchBlogPosts = (posts: BlogPost[], query: string): BlogSearchResult[] => {
  const normalizedQuery = buildNormalizedCorpus(query);
  const queryTokens = tokenize(query);

  if (!normalizedQuery || queryTokens.length === 0) {
    return [];
  }

  const indexed = indexPosts(posts);

  const scored = indexed
    .map((entry) => scorePost(entry, queryTokens, normalizedQuery))
    .filter((result): result is BlogSearchResult => result !== null)
    .sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, 20);
};
