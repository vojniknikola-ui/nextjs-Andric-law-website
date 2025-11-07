import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, instruction } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Nedostaje tekst zakona.' }, { status: 400 });
    }

    const { formattedText, articleCount } = formatByArticles(text);
    const finalText = instruction ? applyInstruction(formattedText, instruction) : formattedText;
    return NextResponse.json({ formattedText: finalText, articleCount });
  } catch (error) {
    console.error('Format law error:', error);
    return NextResponse.json({ error: 'Neuspjelo formatiranje.' }, { status: 500 });
  }
}

function formatByArticles(raw: string) {
  const normalized = raw.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n');

  type Block = { header: string; content: string[]; originalIndex: number; orderKey: number };
  const blocks: Block[] = [];
  let introLines: string[] = [];
  let current: Block | null = null;
  let indexCounter = 0;

  const articleRegex = /^(Član(?:ak)?)[\s.]*([0-9IVXLCD]+)\.?/i;

  const flushCurrent = () => {
    if (current) {
      blocks.push({ ...current, content: [...current.content] });
      current = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current) {
        current.content.push('');
      } else if (introLines.length > 0) {
        introLines.push('');
      }
      continue;
    }

    const articleMatch = trimmed.match(articleRegex);
    if (articleMatch) {
      flushCurrent();
      const rawNumber = articleMatch[2];
      const numericValue = parseArticleNumber(rawNumber);
      current = {
        header: trimmed,
        content: [],
        originalIndex: indexCounter++,
        orderKey: numericValue,
      };
      continue;
    }

    if (current) {
      current.content.push(trimmed);
    } else {
      introLines.push(trimmed);
    }
  }
  flushCurrent();

  const sortedBlocks = [...blocks].sort((a, b) => {
    if (a.orderKey === b.orderKey) {
      return a.originalIndex - b.originalIndex;
    }
    return a.orderKey - b.orderKey;
  });

  const intro = introLines.join('\n').trim();
  const articleText = sortedBlocks
    .map(block => {
      const content = block.content.join('\n').trim();
      return content ? `${block.header}\n${content}` : block.header;
    })
    .join('\n\n');

  const formattedText = [intro, articleText].filter(Boolean).join('\n\n').trim();
  return { formattedText, articleCount: sortedBlocks.length };
}

function parseArticleNumber(rawNumber: string): number {
  const numeric = parseInt(rawNumber, 10);
  if (!Number.isNaN(numeric)) {
    return numeric;
  }
  return romanToNumber(rawNumber);
}

function romanToNumber(value: string): number {
  const map: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const upper = value.toUpperCase();
  let result = 0;
  let prev = 0;
  for (let i = upper.length - 1; i >= 0; i -= 1) {
    const current = map[upper[i]] ?? 0;
    if (current < prev) {
      result -= current;
    } else {
      result += current;
      prev = current;
    }
  }
  return result || Number.MAX_SAFE_INTEGER;
}

function applyInstruction(content: string, instruction: string): string {
  const commands = instruction
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  let output = content;

  commands.forEach(cmd => {
    if (cmd.toLowerCase().startsWith('remove=')) {
      const needle = cmd.slice('remove='.length).trim();
      if (needle) {
        const regex = new RegExp(`.*${escapeRegExp(needle)}.*\\n?`, 'gi');
        output = output.replace(regex, '');
      }
    } else if (cmd.toLowerCase().startsWith('uppercase=')) {
      const keyword = cmd.slice('uppercase='.length).trim().toLowerCase();
      output = output
        .split('\n')
        .map(line => (line.toLowerCase().includes(keyword) ? line.toUpperCase() : line))
        .join('\n');
    } else if (cmd.toLowerCase().startsWith('replace=')) {
      const body = cmd.slice('replace='.length);
      const [from, to] = body.split('=>');
      if (from) {
        const regex = new RegExp(escapeRegExp(from.trim()), 'g');
        output = output.replace(regex, to?.trim() ?? '');
      }
    }
  });

  return output.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
