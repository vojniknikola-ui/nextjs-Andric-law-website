import { NextResponse } from 'next/server';
import { parseSmartLaw, autoFormatContent } from '@/lib/smartParsers';

export async function POST(request: Request) {
  try {
    const { text, instruction } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Nedostaje tekst zakona.' }, { status: 400 });
    }

    const autoFormatted = autoFormatContent(text);
    const sections = parseSmartLaw(autoFormatted);
    const finalText = instruction ? applyInstruction(autoFormatted, instruction) : autoFormatted;
    return NextResponse.json({ 
      formattedText: finalText, 
      articleCount: sections.filter(s => s.type === 'article').length,
      sectionsDetected: sections.length,
      structure: sections.map(s => ({ type: s.type, title: s.title })).slice(0, 10)
    });
  } catch (error) {
    console.error('Format law error:', error);
    return NextResponse.json({ error: 'Neuspjelo formatiranje.' }, { status: 500 });
  }
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
