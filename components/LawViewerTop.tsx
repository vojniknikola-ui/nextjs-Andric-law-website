"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Law, Article } from "@/types/law";
import { Search, Copy, ExternalLink } from "lucide-react";

export default function LawViewerTop({ law }: { law: Law }) {
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(law.articles);
  const articleRefs = useRef<Record<number, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredArticles(law.articles);
      return;
    }
    const rx = new RegExp(query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    setFilteredArticles(
      law.articles.filter(
        (article) =>
          rx.test(article.title ?? "") ||
          rx.test(article.text) ||
          (article.history ?? []).some((h) => (h.text ?? "").match(rx)),
      ),
    );
  }, [law.articles, query]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.4, 0.6] },
    );
    const nodes = Object.values(articleRefs.current).filter(Boolean) as HTMLElement[];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [law.articles]);

  const officialGazette = useMemo(() => {
    if (Array.isArray(law.officialGazette)) {
      return law.officialGazette.map((g: any) => `${g.no}${g.date ? ` (${g.date})` : ""}`).join(", ");
    }
    return law.officialGazette;
  }, [law.officialGazette]);

  const scrollToArticle = (no: number) => {
    const el = articleRefs.current[no];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#clan-${no}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-600">LawViewer dokument</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              {law.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {law.entity}
              </span>
              {officialGazette && (
                <span>
                  Objave: <span className="font-medium text-slate-900">{officialGazette}</span>
                </span>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Pregled</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Članova</p>
                <p className="text-base font-semibold text-slate-900">{law.articles.length}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Sadržaj</p>
                <p className="text-base font-semibold text-slate-900">
                  {law.features.history ? "Historijat uključen" : "Standardni pregled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[320px,1fr] lg:gap-6">
        <aside className="order-2 lg:order-1">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Pretraga
              </label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Član, pojam..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:border-blue-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2 text-xs text-slate-500"
                    aria-label="Resetuj pretragu"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Lista članova</p>
                <div className="mt-3 max-h-[60vh] space-y-1 overflow-auto pr-1">
                  {law.articles.map((article) => {
                    const isActive = activeId === `clan-${article.number}`;
                    return (
                      <button
                        key={article.number}
                        onClick={() => scrollToArticle(article.number)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          isActive ? "bg-blue-50 text-blue-900 font-semibold shadow-sm" : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span className="font-medium">Član {article.number}</span>
                        {article.title && (
                          <span className="ml-1 text-xs text-slate-400 block truncate">
                            {article.title}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="order-1 space-y-6 lg:order-2">
          {filteredArticles.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
              Nema rezultata za “{query}”. Pokušajte drugi izraz.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.number}
                article={article}
                lawId={law.id}
                lawFeatures={law.features}
                articleRefs={articleRefs}
                query={query}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function ArticleCard({
  lawId,
  lawFeatures,
  article,
  articleRefs,
  query,
}: {
  lawId: string;
  lawFeatures: Law["features"];
  article: Article;
  articleRefs: React.MutableRefObject<Record<number, HTMLElement | null>>;
  query: string;
}) {
  const effectiveFeatures = useMemo(
    () => ({ ...lawFeatures, ...(article.features || {}) }),
    [lawFeatures, article.features],
  );

  const hasHistory = effectiveFeatures.history && article.history && article.history.length > 0;
  const hasAmendments = effectiveFeatures.amendments && article.amendments && article.amendments.length > 0;
  const hasCaseLaw = effectiveFeatures.caseLaw && article.caseLaw && article.caseLaw.length > 0;
  const hasExtra = effectiveFeatures.extraInfo && article.extraInfo;

  return (
    <article
      id={`clan-${article.number}`}
      ref={(el) => {
        articleRefs.current[article.number] = el;
      }}
      className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Član {article.number}</p>
          {article.title && (
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">{article.title}</h2>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {hasHistory && (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              Historijat dostupan
            </span>
          )}
          <CopyLinkButton anchor={`clan-${article.number}`} />
        </div>
      </div>

      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {article.text.split(/\n{2,}/).map((block, index) => (
          <p key={index}>
            <Highlight text={block} query={query} />
          </p>
        ))}
      </div>

      {hasHistory && article.history && (
        <details className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Historijat izmjena
          </summary>
          <div className="mt-3 space-y-2">
            {article.history.map((entry, index) => (
              <p key={index}>
                {entry.date && <span className="mr-2 font-semibold text-blue-800">{entry.date}</span>}
                <Highlight text={entry.text} query={query} />
              </p>
            ))}
          </div>
        </details>
      )}

      {hasAmendments && article.amendments && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Amandmani / izmjene</p>
          <ul className="mt-2 space-y-2">
            {article.amendments.map((amendment, index) => (
              <li key={index}>
                {amendment.date && <span className="mr-2 text-amber-800">({amendment.date})</span>}
                {amendment.text || amendment.note || amendment.amendmentId}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasCaseLaw && article.caseLaw && (
        <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-700">Sudska praksa</p>
          <ul className="mt-2 space-y-2">
            {article.caseLaw.map((caseItem, index) => (
              <li key={index}>
                <span className="font-semibold">{caseItem.caseId}</span>
                {caseItem.court && <span className="text-purple-700"> — {caseItem.court}</span>}
                {": "}
                {caseItem.description}
                {caseItem.url && (
                  <Link
                    href={caseItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-flex items-center gap-1 text-purple-900 underline"
                  >
                    link
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasExtra && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Dodatne informacije
          </p>
          <p className="mt-2 whitespace-pre-line">{article.extraInfo}</p>
        </div>
      )}
    </article>
  );
}

function CopyLinkButton({ anchor }: { anchor: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    navigator.clipboard?.writeText(url).then(() => setCopied(true));
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? "Kopirano" : "Kopiraj link"}
    </button>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  try {
    const rx = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return (
      <>
        {text.split(rx).map((chunk, index) =>
          rx.test(chunk) ? (
            <mark key={`${chunk}-${index}`} className="rounded bg-yellow-200 px-1 text-slate-900">
              {chunk}
            </mark>
          ) : (
            <span key={`${chunk}-${index}`}>{chunk}</span>
          ),
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}
