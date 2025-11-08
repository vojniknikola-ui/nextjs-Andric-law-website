"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SectionType = "intro" | "preamble" | "article";

interface Section {
  id: string;
  title: string;
  content: string;
  history?: string;
  type: SectionType;
}

export default function LawViewerInteractive({
  lawContent,
  amendmentContent,
  showHistory = false,
  gazetteNote,
}: {
  lawContent: string;
  amendmentContent?: string;
  showHistory?: boolean;
  gazetteNote?: string;
}) {
  const sections = useMemo(() => parseLawContent(lawContent), [lawContent]);
  const articles = useMemo(() => sections.filter((s) => s.type === "article"), [sections]);
  const hasHistory = showHistory && sections.some((s) => !!s.history);
  const hasAmendment = Boolean(amendmentContent);

  const [query, setQuery] = useState("");
  const [expandHistory, setExpandHistory] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const anchorsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    const nodes = Object.values(anchorsRef.current).filter(Boolean) as HTMLElement[];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const filteredSections = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.trim().toLowerCase();
    return sections.filter((section) =>
      [section.title, section.content, section.history]
        .filter(Boolean)
        .some((chunk) => (chunk as string).toLowerCase().includes(q)),
    );
  }, [sections, query]);

  const filteredArticles = useMemo(
    () => filteredSections.filter((s) => s.type === "article"),
    [filteredSections],
  );

  const scrollTo = (id: string) => {
    const el = anchorsRef.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg">
        {/* Controls */}
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">LawViewer</p>
              {gazetteNote ? (
                <p className="text-sm text-slate-600">Objava: <span className="font-medium text-slate-900">{gazetteNote}</span></p>
              ) : (
                <p className="text-sm text-slate-500">Neslužbeni pregled zakona</p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-72">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pretraži član ili pojam..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400"
                  aria-label="Pretraga unutar zakona"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              </div>
              {hasHistory && (
                <button
                  type="button"
                  onClick={() => setExpandHistory((v) => !v)}
                  className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-800 hover:bg-blue-100"
                >
                  {expandHistory ? "Sakrij historijat" : "Prikaži historijat"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-100 px-6 py-6 lg:grid-cols-[260px,1fr]">
          {/* TOC */}
          <aside className="order-2 lg:order-1">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="max-h-[60vh] space-y-1 overflow-auto pr-1 text-sm">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => scrollTo(article.id)}
                    className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                      activeId === article.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="order-1 space-y-6 lg:order-2">
            {hasAmendment && amendmentContent && (
              <AmandmentCard content={amendmentContent} />
            )}

            {filteredSections.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Nema rezultata za “{query}”. Promijenite pojam ili resetujte pretragu.
              </div>
            ) : (
              filteredSections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    anchorsRef.current[section.id] = el;
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <header className="flex flex-col gap-3 border-b border-slate-200/60 pb-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        {section.type === 'article' ? 'Član' : section.type === 'preamble' ? 'Preambula' : 'Uvod'}
                      </p>
                      <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {showHistory && section.history && (
                        <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                          Historijat dostupno
                        </span>
                      )}
                      <CopyLinkButton id={section.id} />
                      {showHistory && section.history && (
                        <AnchorLinkButton id={`${section.id}-historijat`} label="Historijat" />
                      )}
                    </div>
                  </header>

                    <div
                      className="prose mt-4 max-w-none text-sm leading-relaxed text-slate-800"
                      dangerouslySetInnerHTML={{ __html: highlightHTML(formatContent(section.content), query) }}
                    />

                  {showHistory && section.history && (
                    <details
                      id={`${section.id}-historijat`}
                      open={expandHistory}
                      className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
                    >
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                        Historijat izmjena
                      </summary>
                      <div
                        className="prose mt-3 max-w-none text-sm text-blue-900"
                        dangerouslySetInnerHTML={{ __html: formatContent(section.history) }}
                      />
                    </details>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AmandmentCard({ content }: { content: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Amandman</p>
        <span className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs text-amber-800">
          Brčko distrikt
        </span>
      </div>
      <div
        className="prose mt-3 max-w-none text-sm text-amber-900"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </div>
  );
}

function CopyLinkButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard?.writeText(url).then(() => setCopied(true));
      }}
      className={`rounded-xl border px-3 py-1 text-xs ${
        copied
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
      aria-label="Kopiraj link"
    >
      {copied ? 'Kopirano' : 'Kopiraj link'}
    </button>
  );
}

function AnchorLinkButton({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
    >
      {label}
    </a>
  );
}

function highlightHTML(html: string, query: string): string {
  if (!query.trim()) return html;
  try {
    const rx = new RegExp(`(${escapeRegExp(query.trim())})`, "gi");
    return html.replace(rx, '<mark class="rounded-sm bg-yellow-200/80 px-0.5 text-slate-900">$1</mark>');
  } catch {
    return html;
  }
}

function formatContent(content?: string): string {
  if (!content) return "";
  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/^\uFEFF/, "");

  const htmlParts: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inQuote = false;

  const closeList = () => {
    if (listType) {
      htmlParts.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  };
  const closeQuote = () => {
    if (inQuote) {
      htmlParts.push("</div></blockquote>");
      inQuote = false;
    }
  };
  const openList = (type: "ul" | "ol") => {
    if (listType !== type) {
      closeList();
      htmlParts.push(
        type === "ul"
          ? '<ul class="list-disc space-y-2 pl-6 text-slate-100">'
          : '<ol class="list-decimal space-y-2 pl-6 text-slate-100">',
      );
      listType = type;
    }
  };

  normalized.split("\n").forEach((rawLine) => {
    const line = rawLine.replace(/\\([#*_>\-])/g, "$1");
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      closeQuote();
      return;
    }

    const isQuote = trimmed.startsWith(">");
    const withoutQuote = isQuote ? trimmed.replace(/^>\s?/, "") : trimmed;
    const formattedLine = withoutQuote
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    if (isQuote) {
      closeList();
      if (!inQuote) {
        htmlParts.push('<blockquote class="rounded-2xl border border-blue-200/40 bg-blue-900/30 p-4 text-blue-100"><div class="space-y-2">');
        inQuote = true;
      }
      htmlParts.push(`<p>${formattedLine}</p>`);
      return;
    }
    closeQuote();

    if (/^#{2,6}\s+/.test(withoutQuote)) {
      closeList();
      const heading = withoutQuote.replace(/^#+\s*/, "");
      htmlParts.push(`<p class="mt-5 text-base font-semibold text-white">${heading}</p>`);
      return;
    }

    if (/^(?:-|\u2022)\s+/.test(withoutQuote)) {
      openList("ul");
      const itemText = formattedLine.replace(/^(?:-|\u2022)\s+/, "");
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    const orderedMatch = withoutQuote.match(/^(\d+)[\.\)]\s+/);
    if (orderedMatch) {
      openList("ol");
      const itemText = formattedLine.replace(/^(\d+)[\.\)]\s+/, "");
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    closeList();
    htmlParts.push(`<p class="text-slate-100">${formattedLine}</p>`);
  });

  closeList();
  closeQuote();
  return htmlParts.join("");
}

function parseLawContent(content: string): Section[] {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/^\uFEFF/, "");
  const lines = normalized.split("\n");

  const sections: Section[] = [];
  let current: {
    id: string;
    title: string;
    content: string[];
    history?: string[];
    type: SectionType;
  } | null = null;
  let introTitle: string | null = null;
  const introContent: string[] = [];
  let preambleActive = false;
  const preambleContent: string[] = [];
  let capturingHistory = false;

  const pushCurrent = () => {
    if (!current) return;
    sections.push({
      id: current.id,
      title: current.title,
      content: current.content.join("\n").trim(),
      history: current.history && current.history.length ? current.history.join("\n").trim() : undefined,
      type: current.type,
    });
    current = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r/g, "").trim();
    if (!line) {
      if (preambleActive) preambleContent.push("");
      else if (capturingHistory && current) current.history!.push("");
      else if (current) current.content.push("");
      else introContent.push("");
      continue;
    }

    if (/^PREAMBULA/i.test(line)) {
      preambleActive = true;
      continue;
    }

    if (/^Član(?:ak)?\s+/i.test(line)) {
      pushCurrent();
      preambleActive = false;
      capturingHistory = false;
      const match = line.match(/^Član(?:ak)?\s+([A-Z0-9.\-]+)/i);
      const articleId = match?.[1]?.replace(/\.$/, "") ?? `${sections.length + 1}`;
      current = {
        id: `clan-${articleId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: line,
        content: [],
        history: [],
        type: "article",
      };
      continue;
    }

    if (preambleActive) {
      preambleContent.push(rawLine);
      continue;
    }

    if (/historijat izmjena/i.test(line) && current) {
      capturingHistory = true;
      current.history!.push(`### ${line}`);
      continue;
    }

    if (current) {
      if (capturingHistory) current.history!.push(rawLine);
      else current.content.push(rawLine);
    } else {
      if (!introTitle) introTitle = line;
      introContent.push(rawLine);
    }
  }

  if (preambleActive && preambleContent.length) {
    sections.push({
      id: "preambula",
      title: "PREAMBULA",
      content: preambleContent.join("\n").trim(),
      type: "preamble",
    });
  }

  pushCurrent();

  if (introContent.some((line) => line.trim().length)) {
    sections.unshift({
      id: "uvod",
      title: introTitle ?? "Uvod",
      content: introContent.join("\n").trim(),
      type: "intro",
    });
  }

  return sections;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
