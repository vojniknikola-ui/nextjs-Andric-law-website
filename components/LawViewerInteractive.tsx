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
}: {
  lawContent: string;
  amendmentContent?: string;
  showHistory?: boolean;
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

  const stats = useMemo(() => {
    const totalWords = lawContent.split(/\s+/).filter(Boolean).length;
    return {
      articles: articles.length,
      words: totalWords,
      filtered: filteredArticles.length,
    };
  }, [articles.length, filteredArticles.length, lawContent]);

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
      <div className="rounded-3xl bg-slate-950 text-slate-100 shadow-2xl ring-1 ring-white/5">
        {/* Controls */}
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-300">LawViewer</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {stats.articles} člana
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {stats.words.toLocaleString("bs-BA")} riječi
                </span>
                {query && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-300/20 bg-blue-900/40 px-3 py-1 text-blue-100">
                    {stats.filtered} pogodaka
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-72">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pretraži član, pojam..."
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-white/30"
                  aria-label="Pretraga unutar zakona"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              </div>
              {hasHistory && (
                <button
                  type="button"
                  onClick={() => setExpandHistory((v) => !v)}
                  className="rounded-2xl border border-blue-400/40 bg-blue-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100 hover:bg-blue-900/50"
                >
                  {expandHistory ? "Sakrij historijat" : "Prikaži historijat"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-white/5 px-6 py-6 lg:grid-cols-[260px,1fr]">
          {/* TOC */}
          <aside className="order-2 lg:order-1">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sadržaj</p>
              <div className="mt-3 max-h-[60vh] space-y-1 overflow-auto pr-1 text-sm">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => scrollTo(article.id)}
                    className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                      activeId === article.id ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10'
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
                Nema rezultata za “{query}”. Promijeni pojam ili resetuj pretragu.
              </div>
            ) : (
              filteredSections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    anchorsRef.current[section.id] = el;
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-900/30 backdrop-blur"
                >
                  <header className="flex flex-col gap-3 border-b border-white/5 pb-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {section.type === 'article' ? 'Član' : section.type === 'preamble' ? 'Preambula' : 'Uvod'}
                      </p>
                      <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <CopyLinkButton id={section.id} />
                      {showHistory && section.history && (
                        <AnchorLinkButton id={`${section.id}-historijat`} label="Historijat" />
                      )}
                    </div>
                  </header>

                  <div
                    className="prose prose-invert mt-4 max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightHTML(formatContent(section.content), query) }}
                  />

                  {showHistory && section.history && (
                    <details
                      id={`${section.id}-historijat`}
                      open={expandHistory}
                      className="mt-4 rounded-2xl border border-blue-400/30 bg-blue-900/30 p-4 text-sm text-blue-100"
                    >
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                        Historijat izmjena
                      </summary>
                      <div
                        className="prose prose-invert mt-3 max-w-none text-sm"
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
    <div className="rounded-2xl border border-amber-200/40 bg-amber-500/10 p-5 text-amber-50">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">Amandman</p>
        <span className="rounded-full border border-amber-200/60 bg-amber-400/20 px-3 py-1 text-xs text-amber-50">
          Brčko distrikt
        </span>
      </div>
      <div
        className="prose prose-invert mt-3 max-w-none text-sm"
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
          ? 'border-emerald-200 bg-emerald-500/20 text-emerald-100'
          : 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
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
      className="rounded-xl border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200 hover:bg-white/10"
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

