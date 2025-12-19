// Smart parsers for laws and blogs with auto-detection and intelligent formatting

export interface ParsedLawSection {
  id: string;
  title: string;
  content: string;
  type: 'intro' | 'preamble' | 'article' | 'chapter' | 'section' | 'paragraph';
  orderIndex: number;
  level: number;
  parentId?: string;
}

export interface ParsedBlogPost {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readMinutes: number;
  metadata: {
    hasCodeBlocks: boolean;
    hasLegalReferences: boolean;
    hasLists: boolean;
    hasTables: boolean;
    complexity: 'simple' | 'medium' | 'complex';
  };
}

// Enhanced law parser with smart detection
export function parseSmartLaw(content: string): ParsedLawSection[] {
  const normalized = content.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n');
  
  const sections: ParsedLawSection[] = [];
  let current: ParsedLawSection | null = null;
  let buffer: string[] = [];
  let orderIndex = 0;

  // Patterns for different legal structures
  const patterns = {
    article: /^(Član(?:ak)?|Čl\.|Art\.?)\s*([0-9]+[a-zA-Z]?)\s*[\.\-\s]*/i,
    chapter: /^(Glava|Poglavlje|Dio|Deo)\s*([IVXLCD]+|[0-9]+)\s*[\.\-\s]*/i,
    section: /^(Odjel(?:ak|jek)?|Odeljak|Sekcija)\s*([0-9]+)\s*[\.\-\s]*/i,
    paragraph: /^(\([0-9]+\)|\d+\))\s*/,
    preamble: /^(preambula|uvod|uvodne\s+odredbe)/i,
  };

  const pushCurrent = () => {
    if (current) {
      current.content = cleanContent(buffer.join('\n'));
      sections.push(current);
    }
    current = null;
    buffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      buffer.push('');
      continue;
    }

    // Check for different structural elements
    let matched = false;

    // Article detection
    const articleMatch = trimmed.match(patterns.article);
    if (articleMatch) {
      pushCurrent();
      const num = articleMatch[2];
      current = {
        id: `clan_${num}`,
        title: `Član ${num}`,
        content: '',
        type: 'article',
        orderIndex: orderIndex++,
        level: 1,
      };
      matched = true;
    }

    // Chapter detection
    if (!matched) {
      const chapterMatch = trimmed.match(patterns.chapter);
      if (chapterMatch) {
        pushCurrent();
        const num = chapterMatch[2];
        current = {
          id: `glava_${num}`,
          title: trimmed,
          content: '',
          type: 'chapter',
          orderIndex: orderIndex++,
          level: 0,
        };
        matched = true;
      }
    }

    // Section detection
    if (!matched) {
      const sectionMatch = trimmed.match(patterns.section);
      if (sectionMatch) {
        pushCurrent();
        const num = sectionMatch[2];
        current = {
          id: `odjel_${num}`,
          title: trimmed,
          content: '',
          type: 'section',
          orderIndex: orderIndex++,
          level: 0,
        };
        matched = true;
      }
    }

    // Preamble detection
    if (!matched && patterns.preamble.test(trimmed)) {
      pushCurrent();
      current = {
        id: 'preambula',
        title: 'Preambula',
        content: '',
        type: 'preamble',
        orderIndex: orderIndex++,
        level: 0,
      };
      matched = true;
    }

    if (!matched) {
      if (!current) {
        current = {
          id: 'uvod',
          title: 'Uvodne odredbe',
          content: '',
          type: 'intro',
          orderIndex: orderIndex++,
          level: 0,
        };
      }
      buffer.push(trimmed);
    }
  }

  pushCurrent();
  return sections;
}

// Smart blog parser with auto-extraction
export function parseSmartBlog(content: string): ParsedBlogPost {
  const lines = content.split('\n');
  let title = '';
  let cleanContent = content;
  
  // Extract title from first heading or first line
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
    cleanContent = content.replace(/^#\s+.+$/m, '').trim();
  } else {
    // Use first non-empty line as title
    const firstLine = lines.find(line => line.trim());
    if (firstLine) {
      title = firstLine.trim();
      cleanContent = lines.slice(1).join('\n').trim();
    }
  }

  // Auto-generate excerpt
  const excerpt = generateExcerpt(cleanContent);
  
  // Auto-detect tags
  const tags = autoDetectTags(cleanContent);
  
  // Calculate read time
  const readMinutes = calculateReadTime(cleanContent);
  
  // Analyze content metadata
  const metadata = analyzeContent(cleanContent);

  return {
    title: title || 'Novi članak',
    excerpt,
    content: cleanContent,
    tags,
    readMinutes,
    metadata,
  };
}

function cleanContent(content: string): string {
  return content
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\s+$/gm, ''); // Remove trailing spaces from lines
}

function generateExcerpt(content: string, maxLength = 160): string {
  // Remove markdown formatting for excerpt
  const plain = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace line breaks with spaces
    .trim();

  if (plain.length <= maxLength) return plain;
  
  const truncated = plain.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > maxLength * 0.8 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

function autoDetectTags(content: string): string[] {
  const tags = new Set<string>();
  
  // Legal terms detection
  const legalTerms = {
    'Ustavno pravo': /ustav|ustavni|ustavno/gi,
    'Krivično pravo': /krivični|kazneni|prekršaj|kazna/gi,
    'Građansko pravo': /građanski|civilni|ugovor|obveza/gi,
    'Radno pravo': /radno|zaposleni|poslodavac|otkaz/gi,
    'Porodično pravo': /porodica|brak|razvod|nasljeđivanje/gi,
    'Trgovinsko pravo': /trgovina|trgovinski|privredni|doo|d\.o\.o\./gi,
    'Upravno pravo': /upravni|administracija|dozvola|rješenje/gi,
    'Međunarodno pravo': /međunarodni|međunarodna|konvencija|sporazum/gi,
    'EU pravo': /evropsk|europsk|eu|direktiva|uredba/gi,
    'Intelektualno vlasništvo': /autorsko|patent|žig|trademark/gi,
    'GDPR': /gdpr|zaštita\s+podataka|privatnost/gi,
    'Porez': /porez|pdv|dph|oporezivanje/gi,
  };

  Object.entries(legalTerms).forEach(([tag, regex]) => {
    if (regex.test(content)) {
      tags.add(tag);
    }
  });

  // Jurisdiction detection
  if (/fbih|federacija/gi.test(content)) tags.add('FBiH');
  if (/\brs\b|republika\s+srpska/gi.test(content)) tags.add('RS');
  if (/\bbih\b|bosna\s+i\s+hercegovina/gi.test(content)) tags.add('BiH');
  if (/brčko/gi.test(content)) tags.add('BD');

  return Array.from(tags).slice(0, 8); // Limit to 8 tags
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

function analyzeContent(content: string) {
  const hasCodeBlocks = /```[\s\S]*?```/.test(content);
  const hasLegalReferences = /član\s+\d+|čl\.\s*\d+|art\.\s*\d+/gi.test(content);
  const hasLists = /^\s*[-*+]\s+/m.test(content) || /^\s*\d+\.\s+/m.test(content);
  const hasTables = /\|.*\|/.test(content);
  
  // Determine complexity
  let complexity: 'simple' | 'medium' | 'complex' = 'simple';
  const complexityScore = 
    (hasCodeBlocks ? 2 : 0) +
    (hasLegalReferences ? 1 : 0) +
    (hasLists ? 1 : 0) +
    (hasTables ? 2 : 0) +
    (content.length > 5000 ? 2 : content.length > 2000 ? 1 : 0);
  
  if (complexityScore >= 4) complexity = 'complex';
  else if (complexityScore >= 2) complexity = 'medium';

  return {
    hasCodeBlocks,
    hasLegalReferences,
    hasLists,
    hasTables,
    complexity,
  };
}

// Utility function to suggest slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[čćž]/g, 'c')
    .replace(/[šđ]/g, 's')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'novi-sadrzaj';
}

// Auto-format content for better readability
export function autoFormatContent(content: string): string {
  return content
    // Fix common spacing issues
    .replace(/([.!?])\s*\n\s*([A-ZČĆŽŠĐ])/g, '$1\n\n$2')
    // Fix list formatting
    .replace(/^\s*[-*+]\s+/gm, '- ')
    .replace(/^\s*(\d+)\.\s+/gm, '$1. ')
    // Fix heading spacing
    .replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2')
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}