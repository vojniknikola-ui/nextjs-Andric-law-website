export type ParsedProvision = {
  key: string;
  heading: string;
  level: 'article' | 'chapter';
  body: string;
  orderIndex: number;
};

const ARTICLE_REGEX = /Član\s+([0-9]+[a-zA-Z]?)\.\s*\n([\s\S]*?)(?=\nČlan\s+[0-9]+[a-zA-Z]?\.\s*\n|\nGLAVA|\n$)/g;

export function parseMarkdownArticles(markdown: string): ParsedProvision[] {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const sections: ParsedProvision[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = ARTICLE_REGEX.exec(normalized)) !== null) {
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
