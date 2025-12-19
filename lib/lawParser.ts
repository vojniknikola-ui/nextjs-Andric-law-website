export type ParsedProvision = {
  key: string;
  heading: string;
  level: 'article' | 'chapter';
  body: string;
  orderIndex: number;
};

// Prihvatamo "Član 1.", "Član 1" i markdown varijante sa **Član 1.**
const ARTICLE_REGEX = /(?:^|\n)\s*\**\s*Član\s+([0-9]+[a-zA-Z]?)[\.\s]*\**\s*\n([\s\S]*?)(?=\n\s*\**\s*Član\s+[0-9]+[a-zA-Z]?[\.\s]*\**\s*\n|\nGLAVA|\n$)/gi;

export function parseMarkdownArticles(markdown: string): ParsedProvision[] {
  const normalized = markdown
    .replace(/\r\n/g, '\n')
    .replace(/\\\./g, '.'); // Google Docs i slični exporti znaju ubaciti "\." nakon broja
  const text = normalized.endsWith('\n') ? normalized : `${normalized}\n`;
  const sections: ParsedProvision[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = ARTICLE_REGEX.exec(text)) !== null) {
    const number = match[1];
    const content = match[2].trim();
    sections.push({
      key: `clan_${number}`,
      heading: `Član ${number}`,
      level: 'article',
      body: content,
      orderIndex: index++,
    });
  }

  return sections;
}
