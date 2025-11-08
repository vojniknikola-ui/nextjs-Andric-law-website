"use client";

import type { Law, Article } from "@/types/law";
import { Button, Chip, Accordion, AccordionItem, Input } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Search } from "lucide-react";

export default function LawViewerTop({ law }: { law: Law }) {
  const [q, setQ] = useState("");
  const [filtered, setFiltered] = useState<Article[]>(law.articles);
  const articleRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    if (!q.trim()) {
      setFiltered(law.articles);
      return;
    }
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const subset = law.articles.filter((a) => rx.test(a.text) || (a.title && rx.test(a.title)));
    setFiltered(subset);
  }, [q, law.articles]);

  function scrollToArticle(no: number) {
    const el = articleRefs.current[no];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof history !== "undefined") {
        history.replaceState(null, "", `#clan-${no}`);
      }
    }
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative border-b border-white/10 bg-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-white ring-1 ring-white/15">AL</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{law.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Chip size="sm" color="primary" variant="flat">{law.entity}</Chip>
                {Array.isArray(law.officialGazette) ? (
                  <p className="text-sm text-slate-400">
                    Objave: {law.officialGazette.map((g: any) => `${g.no}${g.date ? ` (${g.date})` : ""}`).join(", ")}
                  </p>
                ) : law.officialGazette ? (
                  <p className="text-sm text-slate-400">Objava: {law.officialGazette}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout: TOC + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-4">
              <Input
                aria-label="Pretraga unutar zakona"
                size="sm"
                placeholder="Pretraga članova..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                startContent={<Search className="text-slate-500" size={16} />}
                className="w-full"
              />
              <nav className="max-h-[calc(100vh-12rem)] overflow-auto pr-2">
                <ul className="space-y-1">
                  {law.articles.map((a) => (
                    <li key={a.number}>
                      <button
                        onClick={() => scrollToArticle(a.number)}
                        className="block w-full text-left text-sm px-3 py-2 rounded-md hover:bg-slate-800 transition-colors duration-150"
                        title={`Član ${a.number}`}
                      >
                        <span className="font-medium">Član {a.number}</span>
                        {a.title && <span className="text-slate-400 ml-2 truncate">{a.title}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-12 lg:col-span-9 order-1 lg:order-2">
            <div className="space-y-12">
              {filtered.length > 0 ? (
                filtered.map((a) => (
                  <ArticleBlock key={a.number} lawId={law.id} lawFeatures={law.features} article={a} articleRefs={articleRefs} query={q} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 p-12 text-center">
                  <h3 className="text-lg font-semibold text-white">Nema rezultata</h3>
                  <p className="text-sm text-slate-400">Pokušajte s drugim pojmom za pretragu.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ArticleBlock({
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
  const eff = useMemo(() => ({ ...lawFeatures, ...(article.features || {}) }), [lawFeatures, article.features]);

  return (
    <article id={`clan-${article.number}`} ref={(el) => { articleRefs.current[article.number] = el; }} className="scroll-mt-24 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-white">Član {article.number}</h2>
        {article.title && <span className="text-slate-400 text-lg">— {article.title}</span>}
      </div>

      <div className="prose prose-invert max-w-none leading-relaxed text-slate-300">
        <Highlight text={article.text} query={query} />
      </div>

      {/* Dinamične sekcije ispod člana */}
      <div className="mt-6">
        <Accordion selectionMode="multiple" variant="splitted" itemClasses={{
          base: "bg-slate-800/50 !shadow-none",
          title: "font-semibold text-white",
          trigger: "data-[hover=true]:bg-slate-800",
          content: "text-slate-400",
        }}>
          {eff.history && article.history && article.history.length > 0 ? (
            <AccordionItem key="h" aria-label="Istorija" title="Istorija izmjena člana">
              <ul className="text-sm list-disc ml-5 space-y-2">
                {article.history.map((h, i) => (
                  <li key={i}>
                    <span className="text-slate-500 mr-2">{h.date ? `(${h.date})` : ""}</span>
                    {h.text}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : null}

          {eff.amendments && article.amendments && article.amendments.length > 0 ? (
            <AccordionItem key="a" aria-label="Amandmani" title="Amandmani / izmjene">
              <ul className="text-sm list-disc ml-5 space-y-2">
                {article.amendments.map((am, i) => (
                  <li key={i}>
                    {am.date ? <span className="text-slate-500 mr-2">({am.date})</span> : null}
                    {am.text || am.note || am.amendmentId}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : null}

          {eff.caseLaw && article.caseLaw && article.caseLaw.length > 0 ? (
            <AccordionItem key="c" aria-label="Sudska praksa" title="Sudska praksa (povezane odluke)">
              <ul className="text-sm list-disc ml-5 space-y-2">
                {article.caseLaw.map((cl, i) => (
                  <li key={i}>
                    <span className="font-semibold text-white">{cl.caseId}</span>
                    {cl.court ? <span className="text-slate-500"> — {cl.court}</span> : null}
                    {": "}
                    {cl.description}
                    {cl.url ? (
                      <Link href={cl.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline ml-1">
                        link <ChevronRight className="inline h-4 w-4" />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : null}

          {eff.extraInfo && article.extraInfo ? (
            <AccordionItem key="x" aria-label="Dodatne informacije" title="Dodatne informacije">
              <div className="text-sm whitespace-pre-line">{article.extraInfo}</div>
            </AccordionItem>
          ) : null}
        </Accordion>
      </div>
    </article>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  try {
    const rx = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(rx);
    return (
      <>
        {parts.map((p, i) =>
          rx.test(p) ? (
            <mark key={i} className="bg-primary-500/30 text-primary-200 rounded px-1">{p}</mark>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}
