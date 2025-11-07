'use client';

import { useMemo, useState } from 'react';

interface LawSection {
  id: string;
  title: string;
  content: string;
  history?: string;
  group?: string;
  type?: 'intro' | 'preamble' | 'article';
}

export default function LawViewer({ lawContent, amendmentContent }: { lawContent: string; amendmentContent?: string }) {
  const [expandedHistory, setExpandedHistory] = useState<Set<string>>(new Set());
  const [amendmentModalOpen, setAmendmentModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const sections = parseLawContent(lawContent);
  const articleCount = sections.filter(section => section.type === 'article').length;
  const withHistoryCount = sections.filter(section => Boolean(section.history)).length;
  const groupInfo = useMemo(() => {
    const map = new Map<string, { label: string; anchor: string; count: number }>();
    sections.forEach(section => {
      if (section.group && section.type === 'article') {
        if (!map.has(section.group)) {
          map.set(section.group, { label: section.group, anchor: section.id, count: 0 });
        }
        const entry = map.get(section.group)!;
        entry.count += 1;
      }
    });
    return Array.from(map.values());
  }, [sections]);

  const filteredSections = sections.filter(section => {
    if (activeGroup === 'all') {
      return true;
    }
    if (section.type !== 'article') {
      return true;
    }
    return section.group === activeGroup;
  });

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

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:grid lg:grid-cols-[280px,1fr] lg:space-y-0 lg:gap-10" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <aside className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Andrić Law · LawViewer</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">Digitalni prikaz</p>
          <p className="text-sm text-slate-600">
            Sidra po članu, historijat izmjena i instant pregled glava – bez ručnog HTML uređivanja.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-500">
            <div className="rounded-2xl border border-white/60 bg-white/70 p-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Članovi</dt>
              <dd className="text-lg font-semibold text-slate-900">{articleCount}+</dd>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/70 p-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Historijat</dt>
              <dd className="text-lg font-semibold text-slate-900">{withHistoryCount}</dd>
            </div>
          </dl>
        </div>

        {groupInfo.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Glave</p>
              {activeGroup !== 'all' && (
                <button
                  onClick={() => setActiveGroup('all')}
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Resetuj
                </button>
              )}
            </div>
            <div className="space-y-2">
              {groupInfo.map((group) => {
                const isActive = activeGroup === group.label;
                return (
                  <button
                    key={group.label}
                    onClick={() => setActiveGroup(isActive ? 'all' : group.label)}
                    className={`w-full rounded-2xl border px-3 py-2 text-left text-sm transition ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{group.label}</span>
                      <span className="text-xs text-slate-500">{group.count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {amendmentContent && (
          <div
            id="law-amandmani"
            className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Amandmani</p>
            <p className="mt-2 text-sm">
              Posebne izmjene (npr. Brčko distrikt) dostupne su kao interaktivni prikaz uz zakon.
            </p>
            <button
              onClick={() => setAmendmentModalOpen(true)}
              className="mt-3 w-full rounded-2xl bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-600/40 transition hover:-translate-y-0.5"
            >
              Otvori amandman
            </button>
          </div>
        )}
      </aside>

      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Prikaz: <span className="font-semibold text-slate-900">{activeGroup === 'all' ? 'Sve glave' : activeGroup}</span>
            </p>
            <span className="text-xs text-slate-500">
              {filteredSections.filter(section => section.type === 'article').length} kartica
            </span>
          </div>
        </div>

        {filteredSections.map(section => {
          const isArticle = section.type === 'article';
          const cardTone =
            section.type === 'intro'
              ? 'border-blue-200 bg-blue-50/80'
              : section.type === 'preamble'
                ? 'border-slate-200 bg-slate-50/90'
                : 'border-slate-200 bg-white/95';
          return (
            <article
              key={section.id}
              id={section.id}
              className={`rounded-3xl border p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] ${cardTone}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {section.group && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                      {section.group}
                    </p>
                  )}
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    {section.title}
                  </h2>
                </div>
                {isArticle ? (
                  <a
                    href={`#${section.id}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 hover:bg-slate-100"
                  >
                    Sidro
                  </a>
                ) : (
                  <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    {section.type === 'preamble' ? 'Preambula' : 'Uvod'}
                  </span>
                )}
              </div>

              <div className="prose prose-slate mt-4 max-w-none text-base leading-relaxed text-slate-900">
                <div
                  className="space-y-3"
                  dangerouslySetInnerHTML={{ __html: formatLawContent(section.content) }}
                />
              </div>

              {section.history && (
                <div className="mt-5">
                  <button
                    onClick={() => toggleHistory(section.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      expandedHistory.has(section.id)
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                        : 'border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100'
                    }`}
                  >
                    {expandedHistory.has(section.id) ? 'Sakrij historijat izmjena' : 'Prikaži historijat izmjena'}
                  </button>

                  {expandedHistory.has(section.id) && (
                    <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                      <div
                        className="text-blue-950 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatLawContent(section.history) }}
                      />
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>

      {amendmentContent && amendmentModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-amber-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-amber-100 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">Amandman</p>
                <h3 className="text-2xl font-bold text-slate-950">Službeni tekst</h3>
              </div>
              <button
                onClick={() => setAmendmentModalOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Zatvori
              </button>
            </div>
            <div className="prose prose-slate mt-4 max-w-none text-base leading-relaxed text-slate-900">
              <div dangerouslySetInnerHTML={{ __html: formatLawContent(amendmentContent) }} />
            </div>
          </div>
        </div>
      )}
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
