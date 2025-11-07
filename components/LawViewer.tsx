'use client';

import { useMemo, useState } from 'react';

interface LawSection {
  id: string;
  title: string;
  content: string;
  history?: string;
  group?: string;
  type?: 'intro' | 'preamble' | 'article';
  groupLevel?: 'head' | 'subhead';
}

type LawViewerMode = 'full' | 'minimal';

export default function LawViewer({
  lawContent,
  amendmentContent,
  mode = 'full',
}: {
  lawContent: string;
  amendmentContent?: string;
  mode?: LawViewerMode;
}) {
  const isMinimal = mode === 'minimal';
  const [expandedHistory, setExpandedHistory] = useState<Set<string>>(new Set());
  const [showAmendment, setShowAmendment] = useState(false);

  const sections = parseLawContent(lawContent);
  const sectionGroups = useMemo(() => {
    const map = new Map<string, string>();
    sections.forEach(section => {
      if (
        section.group &&
        section.groupLevel === 'head' &&
        section.type === 'article' &&
        !map.has(section.group)
      ) {
        map.set(section.group, section.id);
      }
    });
    return Array.from(map.entries()).map(([label, anchor]) => ({ label, anchor }));
  }, [sections]);

  const toggleHistory = (id: string) => {
    setExpandedHistory(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (isMinimal) {
    return (
      <div className="space-y-6 text-slate-900">
        {amendmentContent && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-700">Amandman</p>
            <div className="mt-3 space-y-3" dangerouslySetInnerHTML={{ __html: formatLawContent(amendmentContent) }} />
          </div>
        )}

        {sections.map(section => (
          <div key={section.id} className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-950">{section.title}</h3>
            <div
              className="prose prose-slate max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatLawContent(section.content) }}
            />
            {section.history && (
              <details className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-sm text-blue-900">
                <summary className="cursor-pointer font-semibold">Historijat izmjena</summary>
                <div className="mt-2 space-y-2" dangerouslySetInnerHTML={{ __html: formatLawContent(section.history) }} />
              </details>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {amendmentContent && (
        <div className="mb-6">
          <button
            onClick={() => setShowAmendment(!showAmendment)}
            className={`w-full px-5 py-4 text-base font-semibold rounded-lg transition-all ${
              showAmendment
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            }`}
          >
            ⚖️ {showAmendment ? 'Sakrij Amandmane' : 'Prikaži Amandmane'}
          </button>
          
          {showAmendment && (
            <div className="mt-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-8">
              <div className="text-black leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: formatLawContent(amendmentContent) }} />
            </div>
          )}
        </div>
      )}
      
      {sectionGroups.length > 0 && (
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Skoči na glavu
            </p>
            <p className="text-xs text-slate-400">
              {sectionGroups.length} sekcija
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {sectionGroups.map(group => (
              <a
                key={group.label}
                href={`#${group.anchor}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                {group.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {sections.map(section => {
        const isArticle = section.type === 'article';
        return (
          <article
            key={section.id}
            id={section.id}
            className={`mb-10 rounded-3xl border p-8 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm ${
              isArticle ? 'border-slate-200 bg-white/95' : 'border-blue-100 bg-blue-50/60'
            }`}
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/40 pb-5">
              <div>
                {section.group && (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                    {section.group}
                  </p>
                )}
                <h2 className="text-2xl font-bold text-slate-950">
                  {section.title}
                </h2>
              </div>
              {isArticle ? (
                section.history ? (
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Ima historijat
                  </span>
                ) : null
              ) : (
                <span className="rounded-full border border-blue-300 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-900">
                  {section.type === 'preamble' ? 'Preambula' : 'Uvod'}
                </span>
              )}
            </div>

            <div className="prose prose-slate mt-6 max-w-none text-base leading-relaxed text-slate-900">
              <div
                className="space-y-3"
                dangerouslySetInnerHTML={{ __html: formatLawContent(section.content) }}
              />
            </div>
            
            {section.history && (
              <div className="mt-6">
                <button
                  onClick={() => toggleHistory(section.id)}
                  className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    expandedHistory.has(section.id)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                  }`}
                >
                  📋 Historijat izmjena
                </button>
                
                {expandedHistory.has(section.id) && (
                  <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/80 p-5">
                    <div className="text-blue-950 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatLawContent(section.history) }} />
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function formatLawContent(content: string): string {
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^\uFEFF/, '');

  const htmlParts: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let inQuote = false;

  const closeList = () => {
    if (listType) {
      htmlParts.push(listType === 'ul' ? '</ul>' : '</ol>');
      listType = null;
    }
  };

  const closeQuote = () => {
    if (inQuote) {
      htmlParts.push('</div></blockquote>');
      inQuote = false;
    }
  };

  const openList = (type: 'ul' | 'ol') => {
    if (listType !== type) {
      closeList();
      htmlParts.push(
        type === 'ul'
          ? '<ul class="list-disc space-y-2 pl-6 text-slate-900">'
          : '<ol class="list-decimal space-y-2 pl-6 text-slate-900">',
      );
      listType = type;
    }
  };

  normalized.split('\n').forEach((rawLine) => {
    const line = rawLine.replace(/\\([#*_>\-])/g, '$1');
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      closeQuote();
      return;
    }

    const isQuoteLine = trimmed.startsWith('>');
    const withoutQuote = isQuoteLine ? trimmed.replace(/^>\s?/, '') : trimmed;
    const headingCandidate = withoutQuote
      .replace(/^#+\s*/, '')
      .replace(/^\*+|\*+$/g, '')
      .trim();

    const formattedLine = withoutQuote
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    if (isQuoteLine) {
      closeList();
      if (!inQuote) {
        htmlParts.push('<blockquote class="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-blue-900"><div class="space-y-2">');
        inQuote = true;
      }
      htmlParts.push(`<p>${formattedLine}</p>`);
      return;
    }
    closeQuote();

    if (/^#{2,6}\s+/.test(withoutQuote)) {
      closeList();
      htmlParts.push(`<p class="text-lg font-semibold text-slate-900 mt-6">${headingCandidate}</p>`);
      return;
    }

    if (/^(-{3,}|_{3,}|\*{3,})$/.test(withoutQuote.replace(/\s+/g, ''))) {
      closeList();
      htmlParts.push('<hr class="my-6 border-slate-200" />');
      return;
    }

    const orderedMatch = withoutQuote.match(/^(\d+)[\.\)]\s+/);
    if (orderedMatch) {
      openList('ol');
      const itemText = formattedLine.replace(/^(\d+)[\.\)]\s+/, '');
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    if (/^(?:-|\u2022)\s+/.test(withoutQuote)) {
      openList('ul');
      const itemText = formattedLine.replace(/^(?:-|\u2022)\s+/, '');
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    closeList();
    htmlParts.push(`<p class="text-slate-900">${formattedLine}</p>`);
  });

  closeList();
  closeQuote();

  return htmlParts.join('');
}

function parseLawContent(content: string): LawSection[] {
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^\uFEFF/, '');

  const lines = normalized.split('\n');
  const sections: LawSection[] = [];

  let currentSection: Partial<LawSection> | null = null;
  let currentContent: string[] = [];
  let historyContent: string[] = [];
  let inHistory = false;
  let preambleContent: string[] = [];
  let inPreamble = false;
  let currentGroup: string | null = null;
  let currentGroupLevel: 'head' | 'subhead' | undefined;
  let capturingIntro = true;
  const introContent: string[] = [];
  let introTitle: string | null = null;

  const pushCurrentSection = () => {
    if (currentSection) {
      currentSection.content = currentContent.join('\n').trim();
      if (historyContent.length > 0) {
        currentSection.history = historyContent.join('\n').trim();
      }
      sections.push(currentSection as LawSection);
    }
  };

  const sanitizeLine = (value: string) =>
    value
      .replace(/^>\s*/, '')
      .replace(/^#+\s*/, '')
      .replace(/^\*+|\*+$/g, '')
      .trim();

  const isStructureHeading = (value: string) =>
    /(GLAVA|POGLAVLJE|ODJELJAK|ODJEL|DIO|NASLOV)/i.test(value);

  for (const rawLine of lines) {
    const withoutCarriage = rawLine.replace(/\r/g, '');
    const unescaped = withoutCarriage.replace(/\\([#*_>\-])/g, '$1');
    const trimmed = unescaped.trim();
    const normalizedLine = sanitizeLine(trimmed);

    if (!trimmed) {
      if (inPreamble) {
        preambleContent.push('');
      } else if (inHistory) {
        historyContent.push('');
      } else if (currentSection) {
        currentContent.push('');
      } else if (capturingIntro && introContent.length > 0) {
        introContent.push('');
      }
      continue;
    }

    if (/^PREAMBULA/i.test(normalizedLine)) {
      capturingIntro = false;
      inPreamble = true;
      continue;
    }

    if (isStructureHeading(normalizedLine)) {
      currentGroup = normalizedLine.toUpperCase();
      currentGroupLevel = normalizedLine.toLowerCase().startsWith('glava') ? 'head' : 'subhead';
      continue;
    }

    if (normalizedLine.toLowerCase().includes('historijat izmjena')) {
      inHistory = true;
      historyContent.push(`### ${normalizedLine}`);
      continue;
    }

    if (/^Član(?:ak)?\s+/i.test(normalizedLine)) {
      capturingIntro = false;
      if (inPreamble && preambleContent.length > 0) {
        sections.push({
          id: 'preambula',
          title: 'PREAMBULA',
          content: preambleContent.join('\n').trim(),
          type: 'preamble',
        });
        preambleContent = [];
        inPreamble = false;
      }

      pushCurrentSection();

      const articleMatch = normalizedLine.match(/^Član(?:ak)?\s+([A-Z0-9.\-]+)/i);
      const articleId = articleMatch?.[1]?.replace(/\.$/, '') ?? `section-${sections.length + 1}`;

      currentSection = {
        id: `clan-${articleId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: normalizedLine,
        content: '',
        group: currentGroup ?? undefined,
        groupLevel: currentGroupLevel,
        type: 'article',
      };

      currentContent = [];
      historyContent = [];
      inHistory = false;
      continue;
    }

    if (inPreamble) {
      preambleContent.push(unescaped);
      continue;
    }

    if (inHistory) {
      historyContent.push(unescaped);
      continue;
    }

    if (currentSection) {
      currentContent.push(unescaped);
      continue;
    }

    if (capturingIntro) {
      if (!introTitle && normalizedLine) {
        introTitle = normalizedLine;
      }
      introContent.push(unescaped);
    }
  }

  if (inPreamble && preambleContent.length > 0) {
    sections.push({
      id: 'preambula',
      title: 'PREAMBULA',
      content: preambleContent.join('\n').trim(),
      type: 'preamble',
    });
  }

  pushCurrentSection();

  if (introContent.some((line) => line.trim().length > 0)) {
    sections.unshift({
      id: 'uvod',
      title: introTitle ?? 'Uvodne napomene',
      content: introContent.join('\n').trim(),
      type: 'intro',
    });
  }

  return sections;
}
