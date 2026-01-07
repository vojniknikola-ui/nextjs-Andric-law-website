import { boundedLevenshtein, getTokenThreshold, normalizeText, tokenize } from './text-utils';

type SynonymMap = Record<string, string[]>;

export type WeightedQueryToken = {
  token: string;
  weight: number;
};

export type TokenIndex = {
  byFirstChar: Map<string, string[]>;
  tokenSet: Set<string>;
};

const SYNONYMS: SynonymMap = {
  zakon: ['propis', 'akt', 'regulativa'],
  propis: ['zakon', 'akt'],
  akt: ['zakon', 'propis'],
  ugovor: ['sporazum', 'kontrakt'],
  otkaz: ['raskid', 'prestanak'],
  raskid: ['otkaz', 'prestanak'],
  prestanak: ['otkaz', 'raskid'],
  radni: ['zaposlenje'],
  zaposlenje: ['radni', 'radnog'],
  sud: ['sudski'],
  sudski: ['sud'],
  advokat: ['odvjetnik'],
  odvjetnik: ['advokat'],
  krivicni: ['kazneni'],
  kazneni: ['krivicni'],
  nasljedstvo: ['nasljedjivanje'],
  nasljedjivanje: ['nasljedstvo'],
  pdv: ['porez'],
  porez: ['pdv'],
  doo: ['drustvo'],
  drustvo: ['doo'],
  licenca: ['dozvola'],
  dozvola: ['licenca'],
};

const normalizeToken = (token: string) => normalizeText(token);

const uniqueTokens = (tokens: string[]) => Array.from(new Set(tokens.filter(Boolean)));

const addWeightedToken = (map: Map<string, number>, token: string, weight: number) => {
  if (!token) {
    return;
  }
  const existing = map.get(token);
  if (existing === undefined || weight > existing) {
    map.set(token, weight);
  }
};

export const expandQueryTokens = (tokens: string[]): {
  weightedTokens: WeightedQueryToken[];
  highlightTokens: string[];
} => {
  const weights = new Map<string, number>();

  tokens.forEach((token) => addWeightedToken(weights, token, 1));

  tokens.forEach((token) => {
    const synonyms = SYNONYMS[token] || [];
    synonyms.slice(0, 3).forEach((synonym) => addWeightedToken(weights, normalizeToken(synonym), 0.65));
  });

  const highlightTokens = uniqueTokens(Array.from(weights.keys()));
  const weightedTokens = highlightTokens.map((token) => ({
    token,
    weight: weights.get(token) ?? 1,
  }));

  return { weightedTokens, highlightTokens };
};

export const expandQueryString = (query: string): string => {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return query.trim();
  }

  const { highlightTokens } = expandQueryTokens(tokens);
  return highlightTokens.slice(0, 12).join(' ');
};

export const buildTokenIndex = (tokens: string[]): TokenIndex => {
  const tokenSet = new Set(tokens);
  const byFirstChar = new Map<string, string[]>();

  tokens.forEach((token) => {
    if (!token) {
      return;
    }
    const firstChar = token[0];
    const list = byFirstChar.get(firstChar);
    if (list) {
      list.push(token);
    } else {
      byFirstChar.set(firstChar, [token]);
    }
  });

  return { byFirstChar, tokenSet };
};

const shouldSuggestToken = (token: string) => token.length > 3 && !/\d/.test(token);

const findClosestToken = (token: string, index: TokenIndex): string | null => {
  if (!shouldSuggestToken(token)) {
    return null;
  }

  const threshold = getTokenThreshold(token.length);
  if (threshold === 0) {
    return null;
  }

  const candidates = index.byFirstChar.get(token[0]) || [];
  let bestMatch: string | null = null;
  let bestDistance = threshold + 1;

  for (const candidate of candidates) {
    if (Math.abs(candidate.length - token.length) > threshold) {
      continue;
    }
    const distance = boundedLevenshtein(token, candidate, threshold);
    if (distance <= threshold && distance < bestDistance) {
      bestDistance = distance;
      bestMatch = candidate;
      if (distance === 1) {
        break;
      }
    }
  }

  return bestMatch;
};

export const suggestQuery = (query: string, index: TokenIndex): string | null => {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return null;
  }

  const suggested = tokens.map((token) => {
    if (index.tokenSet.has(token)) {
      return token;
    }
    const match = findClosestToken(token, index);
    return match ?? token;
  });

  const suggestion = suggested.join(' ');
  return normalizeText(suggestion) === normalizeText(query) ? null : suggestion;
};
