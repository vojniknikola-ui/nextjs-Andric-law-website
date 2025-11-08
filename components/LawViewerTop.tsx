"use client";

import type { Law, Article } from "@/types/law";
import { Button, Chip, Accordion, AccordionItem, Input } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
    <div>
      {/* Header / meta */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold">{law.title}</h1>
          <Chip size="sm" color="primary" variant="flat">{law.entity}</Chip>
        </div>
        {Array.isArray(law.officialGazette) ? (
          <p className="text-sm text-neutral-600">
            Objave: {law.officialGazette.map((g: any) => `${g.no}${g.date ? ` (${g.date})` : ""}`).join(", ")}
          </p>
        ) : law.officialGazette ? (
          <p className="text-sm text-neutral-600">Objava: {law.officialGazette}</p>
        ) : null}

        <div className="mt-3 flex items-center gap-2">
          <Input
            aria-label="Pretraga unutar zakona"
            size="sm"
            placeholder="Pretraga unutar zakona…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-md"
            startContent={<span className="text-neutral-500">🔎</span>}
          />
          {law.features?.pdfExport ? (
            <Button
              size="sm"
              as={Link}
              href={`/api/pdf/zakoni/${law.id}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="flat"
            >
              🖨️ PDF
            </Button>
          ) : null}
        </div>
      </div>

      {/* Layout: TOC + Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* TOC */}
        <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-4 space-y-2">
            <div className="border rounded-xl p-3">
              <h3 className="text-sm font-semibold mb-2">Sadržaj</h3>
              <nav className="max-h-[60vh] overflow-auto">
                {law.articles.map((a) => (
                  <button
                    key={a.number}
                    onClick={() => scrollToArticle(a.number)}
                    className="block w-full text-left text-sm px-2 py-1 rounded hover:bg-neutral-100"
                    title={`Član ${a.number}`}
                  >
                    Član {a.number}{a.title ? ` — ${a.title}` : ""}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="col-span-12 lg:col-span-9 order-1 lg:order-2">
          <div className="space-y-8">
            {filtered.map((a) => (
              <ArticleBlock key={a.number} lawId={law.id} lawFeatures={law.features} article={a} articleRefs={articleRefs} query={q} />
            ))}
          </div>
        </section>
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
    <article id={`clan-${article.number}`} ref={(el) => { articleRefs.current[article.number] = el; }} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-semibold">Član {article.number}</h2>
        {article.title && <span className="text-neutral-500">— {article.title}</span>}
      </div>

      <p className="leading-7 text-[1.02em]">
        <Highlight text={article.text} query={query} />
      </p>

      {/* Dinamične sekcije ispod člana */}
      <div className="mt-3">
        <Accordion selectionMode="multiple" variant="splitted">
          {eff.history && article.history && article.history.length > 0 ? (
            <AccordionItem key="h" aria-label="Istorija" title="Istorija izmjena člana">
              <ul className="text-sm list-disc ml-5">
                {article.history.map((h, i) => (
                  <li key={i}>
                    <span className="text-neutral-500 mr-1">{h.date ? `(${h.date})` : ""}</span>
                    {h.text}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : null}

          {eff.amendments && article.amendments && article.amendments.length > 0 ? (
            <AccordionItem key="a" aria-label="Amandmani" title="Amandmani / izmjene">
              <ul className="text-sm list-disc ml-5">
                {article.amendments.map((am, i) => (
                  <li key={i}>
                    {am.date ? <span className="text-neutral-500 mr-1">({am.date})</span> : null}
                    {am.text || am.note || am.amendmentId}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : null}

          {eff.caseLaw && article.caseLaw && article.caseLaw.length > 0 ? (
            <AccordionItem key="c" aria-label="Sudska praksa" title="Sudska praksa (povezane odluke)">
              <ul className="text-sm list-disc ml-5">
                {article.caseLaw.map((cl, i) => (
                  <li key={i}>
                    <span className="font-medium">{cl.caseId}</span>
                    {cl.court ? <span className="text-neutral-500"> — {cl.court}</span> : null}
                    {": "}
                    {cl.description}
                    {cl.url ? (
                      <>
                        {" "}
                        <a className="underline" href={cl.url} target="_blank" rel="noopener noreferrer">link</a>
                      </>
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
            <mark key={i} className="bg-yellow-200 rounded px-0.5">{p}</mark>
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
