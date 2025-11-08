"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Section = {
  id: string;
  title: string;
  content: string;
  history?: string;
  type?: "intro" | "preamble" | "article";
};

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
  const hasAnyHistory = useMemo(() => sections.some((s) => !!s.history), [sections]);

  const [q, setQ] = useState("");
  const [expandAllHistory, setExpandAllHistory] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const anchorsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    const nodes = Object.values(anchorsRef.current).filter(Boolean) as HTMLElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  const filtered = useMemo(() => {
    if (!q.trim()) return sections;
    const norm = q.trim().toLowerCase();
    return sections.filter((s) =>
      [s.title, s.content, s.history].filter(Boolean).some((t) => (t as string).toLowerCase().includes(norm)),
    );
  }, [sections, q]);

  const onClickToc = (id: string) => {
    const el = anchorsRef.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
      {/* Sidebar / TOC */}
      <aside className="col-span-12 lg:col-span-4 xl:col-span-3 lg:order-1 order-2">
        <div className="sticky top-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pretraga članova…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-300"
              aria-label="Pretraga unutar zakona"
            />
            {showHistory && hasAnyHistory && (
              <button
                type="button"
                onClick={() => setExpandAllHistory((v) => !v)}
                className="mt-3 w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 hover:bg-blue-100"
              >
                {expandAllHistory ? "Sakrij historijat" : "Prikaži historijat"}
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sadržaj</p>
            <div className="mt-2 max-h-[55vh] space-y-1 overflow-auto pr-2 text-sm">
              {filtered
                .filter((s) => s.type === "article")
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onClickToc(s.id)}
                    className={`block w-full rounded-lg px-2 py-1 text-left hover:bg-slate-100 ${
                      activeId === s.id ? "bg-slate-100 font-medium text-slate-900" : "text-slate-700"
                    }`}
                    title={s.title}
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <section className="col-span-12 lg:col-span-8 xl:col-span-9 lg:order-2 order-1">
        {amendmentContent && (
          <div id="amandman" className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex items-center justify-between">
              <p className="font-semibold uppercase tracking-[0.2em] text-amber-800">Amandman</p>
              <a href="#amandman" className="text-xs text-amber-700 underline">Permalink</a>
            </div>
            <div className="mt-2 space-y-2" dangerouslySetInnerHTML={{ __html: formatLawContent(amendmentContent) }} />
          </div>
        )}

        <div className="space-y-6">
          {filtered.map((s) => (
            <article
              key={s.id}
              id={s.id}
              ref={(el) => {
                anchorsRef.current[s.id] = el;
              }}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200/60 pb-3">
                <h2 className="text-lg font-semibold text-slate-950">{s.title}</h2>
                <div className="flex items-center gap-2">
                  <CopyLinkButton id={s.id} />
                </div>
              </div>

              <div className="prose prose-slate mt-4 max-w-none text-sm leading-relaxed">
                <div
                  className="space-y-3"
                  dangerouslySetInnerHTML={{ __html: highlightHTML(formatLawContent(s.content), q) }}
                />
              </div>

              {showHistory && s.history && (
                <details open={expandAllHistory} className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-blue-900">
                  <summary className="cursor-pointer font-semibold">Historijat izmjena</summary>
                  <div className="mt-2 space-y-2" dangerouslySetInnerHTML={{ __html: formatLawContent(s.history) }} />
                </details>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function escapeHTML(str: string) {
  return str.replace(/[&<>"]+/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch] as string));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightHTML(html: string, query: string): string {
  const q = query.trim();
  if (!q) return html;
  try {
    const rx = new RegExp(`(${escapeRegExp(q)})`, "gi");
    return html.replace(rx, '<mark class="rounded-sm bg-yellow-200 px-0.5">$1</mark>');
  } catch {
    return html;
  }
}

function formatLawContent(content: string): string {
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
      htmlParts.push(type === "ul" ? '<ul class="list-disc space-y-2 pl-6 text-slate-900">' : '<ol class="list-decimal space-y-2 pl-6 text-slate-900">');
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

    const isQuoteLine = trimmed.startsWith(">");
    const withoutQuote = isQuoteLine ? trimmed.replace(/^>\s?/, "") : trimmed;
    const headingCandidate = withoutQuote.replace(/^#+\s*/, "").replace(/^\*+|\*+$/g, "").trim();
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

    if (/^(-{3,}|_{3,}|\*{3,})$/.test(withoutQuote.replace(/\s+/g, ""))) {
      closeList();
      htmlParts.push('<hr class="my-6 border-slate-200" />');
      return;
    }

    const orderedMatch = withoutQuote.match(/^(\d+)[\.\)]\s+/);
    if (orderedMatch) {
      openList("ol");
      const itemText = formattedLine.replace(/^(\d+)[\.\)]\s+/, "");
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    if (/^(?:-|\u2022)\s+/.test(withoutQuote)) {
      openList("ul");
      const itemText = formattedLine.replace(/^(?:-|\u2022)\s+/, "");
      htmlParts.push(`<li>${itemText}</li>`);
      return;
    }

    closeList();
    htmlParts.push(`<p class="text-slate-900">${formattedLine}</p>`);
  });

  closeList();
  closeQuote();
  return htmlParts.join("");
}

function parseLawContent(content: string): Section[] {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/^\uFEFF/, "");
  const lines = normalized.split("\n");

  const sections: Section[] = [];
  let current: null | { id: string; title: string; content: string[]; history?: string[]; type?: Section["type"] } = null;
  let inHistory = false;
  const intro: string[] = [];
  let introTitle: string | null = null;
  let inPreamble = false;
  const preamble: string[] = [];

  const pushCurrent = () => {
    if (current) {
      sections.push({
        id: current.id,
        title: current.title,
        content: current.content.join("\n").trim(),
        history: current.history && current.history.length ? current.history.join("\n").trim() : undefined,
        type: current.type ?? "article",
      });
      current = null;
    }
  };

  for (const raw of lines) {
    const line = raw.replace(/\r/g, "").replace(/\\([#*_>\-])/g, "$1").trim();
    if (!line) {
      if (inPreamble) preamble.push("");
      else if (inHistory && current) current.history!.push("");
      else if (current) current.content.push("");
      else intro.push("");
      continue;
    }

    if (/^PREAMBULA/i.test(line)) {
      inPreamble = true;
      continue;
    }

    if (/^Član(?:ak)?\s+/i.test(line)) {
      inPreamble = false;
      inHistory = false;
      pushCurrent();
      const m = line.match(/^Član(?:ak)?\s+([A-Z0-9.\-]+)/i);
      const articleId = m?.[1]?.replace(/\.$/, "") ?? `${sections.length + 1}`;
      current = {
        id: `clan-${articleId.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: line,
        content: [],
        history: [],
        type: "article",
      };
      continue;
    }

    if (inPreamble) {
      preamble.push(raw);
      continue;
    }

    if (/historijat izmjena/i.test(line) && current) {
      inHistory = true;
      current.history!.push(`### ${line}`);
      continue;
    }

    if (current) {
      if (inHistory) current.history!.push(raw);
      else current.content.push(raw);
    } else {
      if (!introTitle) introTitle = line;
      intro.push(raw);
    }
  }

  if (inPreamble && preamble.length) {
    sections.push({ id: "preambula", title: "PREAMBULA", content: preamble.join("\n").trim(), type: "preamble" });
  }

  pushCurrent();

  if (intro.some((l) => l.trim().length)) {
    sections.unshift({ id: "uvod", title: introTitle ?? "Uvod", content: intro.join("\n").trim(), type: "intro" });
  }
  return sections;
}

function CopyLinkButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard?.writeText(url).then(() => setCopied(true));
      }}
      className={`rounded-lg border px-2 py-1 text-xs ${copied ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'}`}
      aria-label="Kopiraj link na član"
    >
      {copied ? "Kopirano" : "Kopiraj link"}
    </button>
  );
}

