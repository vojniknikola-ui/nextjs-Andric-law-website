export const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const tokenize = (value: string): string[] =>
  normalizeText(value)
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean);

export const buildNormalizedCorpus = (value: string): string =>
  normalizeText(value).replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();

export const getTokenThreshold = (length: number): number => {
  if (length <= 3) {
    return 0;
  }
  if (length <= 5) {
    return 1;
  }
  if (length <= 8) {
    return 2;
  }
  if (length <= 11) {
    return 3;
  }
  return 4;
};

// Levenshtein distance with early exit once the threshold is exceeded to keep fuzzy checks fast.
export const boundedLevenshtein = (a: string, b: string, maxDistance: number): number => {
  if (a === b) {
    return 0;
  }

  if (maxDistance <= 0) {
    return a === b ? 0 : Number.POSITIVE_INFINITY;
  }

  if (Math.abs(a.length - b.length) > maxDistance) {
    return maxDistance + 1;
  }

  let previous = new Array(b.length + 1).fill(0).map((_, index) => index);
  let current = new Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    let minInRow = current[0];
    const charA = a.charAt(i - 1);

    for (let j = 1; j <= b.length; j += 1) {
      const cost = charA === b.charAt(j - 1) ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost,
      );

      if (current[j] < minInRow) {
        minInRow = current[j];
      }
    }

    if (minInRow > maxDistance) {
      return maxDistance + 1;
    }

    const temp = previous;
    previous = current;
    current = temp;
  }

  return previous[b.length];
};
