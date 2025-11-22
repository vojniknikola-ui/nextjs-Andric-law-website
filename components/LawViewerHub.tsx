"use client";

import { useMemo, useState, type ReactNode } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import {
  Search as SearchIcon,
  ChevronRight,
  Sparkles,
  Filter,
  Tag as TagIcon,
  ScrollText,
  BookMarked,
  ArrowDownUp,
  Zap,
} from "lucide-react";

type Tab = "all" | "zakoni" | "clanci";
type SortKey = "newest" | "oldest" | "az";

export default function LawViewerHub({ posts }: { posts: BlogPost[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const lawPosts = useMemo(() => posts.filter((p) => p.isLawDocument), [posts]);
  const articlePosts = useMemo(() => posts.filter((p) => !p.isLawDocument), [posts]);

  const fuseLaws = useMemo(
    () =>
      new Fuse(lawPosts, {
        includeScore: true,
        threshold: 0.35,
        keys: ["title", "excerpt", "tags"],
      }),
    [lawPosts],
  );
  const fuseArticles = useMemo(
    () =>
      new Fuse(articlePosts, {
        includeScore: true,
        threshold: 0.35,
        keys: ["title", "excerpt", "tags"],
      }),
    [articlePosts],
  );

  const filteredLaws = useMemo(
    () => (q.trim() ? fuseLaws.search(q).map((r) => r.item) : lawPosts),
    [q, lawPosts, fuseLaws],
  );
  const filteredArticles = useMemo(
    () => (q.trim() ? fuseArticles.search(q).map((r) => r.item) : articlePosts),
    [q, articlePosts, fuseArticles],
  );

  const sortedLaws = useMemo(() => sortCollection(filteredLaws, sort), [filteredLaws, sort]);
  const sortedArticles = useMemo(() => sortCollection(filteredArticles, sort), [filteredArticles, sort]);
  const latestLaw = sortedLaws[0];
  const latestArticle = sortedArticles[0];

  const tagCloud = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) => post.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [posts]);

  const showLaws = tab === "all" || tab === "zakoni";
  const showArticles = tab === "all" || tab === "clanci";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-white">
      <div className="grid gap-5 lg:grid-cols-[1fr,1.05fr]">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-900/15 p-6 shadow-lg shadow-black/30">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-200/80">LawViewer HUB</p>
              <h2 className="text-2xl font-semibold text-white">Zakoni, propisi i isti UI sloj</h2>
              <p className="mt-2 text-sm text-emerald-50/90">
                Propisi i članci izgledaju isto: čista tipografija, jasne kartice, pretraga i tagovi.
              </p>
            </div>
            <Sparkles className="h-6 w-6 text-emerald-200" />
          </div>
          <div className="mt-5 space-y-3">
            <FeatureLine icon={<ScrollText className="h-4 w-4" />} text="Digitalni propisi sa statusom i citatom u zaglavlju." />
            <FeatureLine icon={<BookMarked className="h-4 w-4" />} text="Blogovi i zakoni dijele komponente, tako da interakcije ostaju iste." />
            <FeatureLine icon={<Filter className="h-4 w-4" />} text="Segmentirano filtriranje: sve, samo zakoni ili samo članci." />
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">Brzi tagovi</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tagCloud.length > 0 ? (
                tagCloud.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQ(tag)}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100 transition hover:border-emerald-200/70 hover:bg-emerald-400/20"
                  >
                    <TagIcon className="h-3 w-3" /> #{tag}
                  </button>
                ))
              ) : (
                <span className="text-sm text-emerald-50/70">Tagovi se pojavljuju čim dodate sadržaj.</span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
              {(["all", "zakoni", "clanci"] as Tab[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === value
                      ? "bg-emerald-400 text-slate-900 shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {value === "all" ? "Sve" : value === "zakoni" ? "Zakoni" : "Članci"}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pretraži po naslovu, sažetku ili tagu…"
                className="w-full rounded-2xl border border-white/15 bg-gradient-to-r from-white/5 via-white/10 to-white/5 px-10 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-500/20"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-2 py-0.5 text-xs text-white transition hover:bg-white/25"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                <ArrowDownUp className="h-3 w-3" /> Sortiranje
              </span>
              {(["newest", "oldest", "az"] as SortKey[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setSort(value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    sort === value
                      ? "border-emerald-300/50 bg-emerald-500/15 text-emerald-50 shadow-[0_8px_25px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"
                  }`}
                >
                  {value === "newest" ? "Najnovije" : value === "oldest" ? "Najstarije" : "A-Z"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" /> UX: isti je ritam kartica za propise i članke.
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <BadgeLine label="Zakoni" value={filteredLaws.length} active={showLaws} />
            <BadgeLine label="Članci" value={filteredArticles.length} active={showArticles} />
            <BadgeLine label="Ukupno" value={filteredLaws.length + filteredArticles.length} />
          </div>
        </div>
      </div>

      {(latestLaw || latestArticle) && (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {latestLaw && (
            <HighlightCard
              variant="law"
              title={latestLaw.title}
              excerpt={latestLaw.excerpt}
              href={`/blog/${latestLaw.slug}`}
              badge="Nedavno dodan propis"
              meta={`${new Date(latestLaw.date).toLocaleDateString("bs-BA")} · ${latestLaw.lawMeta?.citation ?? latestLaw.tags?.[0] ?? "Propis"}`}
            />
          )}
          {latestArticle && (
            <HighlightCard
              variant="article"
              title={latestArticle.title}
              excerpt={latestArticle.excerpt}
              href={`/blog/${latestArticle.slug}`}
              badge="Svježa analiza"
              meta={`${new Date(latestArticle.date).toLocaleDateString("bs-BA")} · ${latestArticle.tags?.[0] ?? "Analiza"}`}
            />
          )}
        </div>
      )}

      {showLaws && (
        <div id="zakoni" className="mt-10 rounded-3xl border border-emerald-400/15 bg-emerald-500/5 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/80">Propisi</p>
              <h3 className="text-2xl font-semibold text-white">Zakoni i propisi</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-50">
              <ScrollText className="h-4 w-4" /> {filteredLaws.length} zapisa
            </span>
          </div>
          {filteredLaws.length === 0 ? (
            <EmptyState message="Nema zakona za zadani pojam. Pokušajte s drugim izrazom." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedLaws.map((law) => (
                <LawCard key={law.slug} post={law} />
              ))}
            </div>
          )}
        </div>
      )}

      {showArticles && (
        <div id="clanci" className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-200/80">Komentari</p>
              <h3 className="text-2xl font-semibold text-white">Članci i analize</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              {filteredArticles.length} zapisa
            </span>
          </div>
          {filteredArticles.length === 0 && !showLaws ? (
            <EmptyState message="Nema članaka za zadani pojam. Pokušajte ponovno." />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedArticles.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function FeatureLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-50">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/30">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function BadgeLine({ label, value, active = false }: { label: string; value: number; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-sm ${
        active ? "border-emerald-300/30 bg-emerald-500/10 text-emerald-50" : "border-white/10 bg-white/5 text-slate-200"
      }`}
    >
      <span className="text-[11px] uppercase tracking-[0.2em]">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-300">
      {message}
    </div>
  );
}

function LawCard({ post }: { post: BlogPost }) {
  const status = post.lawMeta?.status ?? "Aktivan propis";
  const citation = post.lawMeta?.citation ?? post.tags?.[0] ?? "Propis";
  const publishedAt = post.lawMeta?.publishedAt ?? post.date;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-slate-950 p-5 shadow-xl shadow-black/30 ring-1 ring-emerald-400/10 transition hover:-translate-y-1 hover:shadow-emerald-500/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.18),transparent_35%)] opacity-80" />
      <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-emerald-100/80">
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold">
          Digitalni zakon
        </span>
        <span className="text-emerald-50/80">{status}</span>
      </div>
      <p className="relative mt-4 text-lg font-semibold leading-snug text-white group-hover:text-emerald-50">
        {post.title}
      </p>
      <p className="relative mt-2 text-sm text-slate-200 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="relative mt-4 flex items-center justify-between text-sm text-slate-200">
        <div className="flex flex-col gap-1 text-[12px] text-emerald-100/80">
          <span className="font-semibold uppercase tracking-[0.16em]">{citation}</span>
          <span className="text-slate-300">{new Date(publishedAt).toLocaleDateString("bs-BA")}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-emerald-50">
          Otvori
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function HighlightCard({
  variant,
  title,
  excerpt,
  href,
  badge,
  meta,
}: {
  variant: "law" | "article";
  title: string;
  excerpt: string;
  href: string;
  badge: string;
  meta: string;
}) {
  const isLaw = variant === "law";
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-3xl border p-5 shadow-lg transition hover:-translate-y-1 ${
        isLaw
          ? "border-emerald-300/30 bg-gradient-to-br from-emerald-900/35 via-slate-900/80 to-slate-950 ring-1 ring-emerald-400/20"
          : "border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-900/25 to-slate-950 ring-1 ring-white/15"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-80 ${isLaw
          ? "bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.22),transparent_35%)]"
          : "bg-[radial-gradient(circle_at_10%_10%,rgba(96,165,250,0.25),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(148,163,184,0.2),transparent_35%)]"
        }`}
      />
      <div className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${isLaw ? "bg-emerald-500/20 border border-emerald-300/40 text-emerald-50" : "bg-white/10 border border-white/20 text-white"}`}>
          {isLaw ? <ScrollText className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />} {badge}
        </span>
        <span className="text-slate-200/80">{meta}</span>
      </div>
      <h4 className="relative mt-3 text-xl font-semibold text-white group-hover:text-emerald-50">{title}</h4>
      <p className="relative mt-2 text-sm text-slate-200 line-clamp-2">{excerpt}</p>
      <div className="relative mt-4 inline-flex items-center gap-2 text-sm text-white/90">
        <span>{isLaw ? "Otvori propis" : "Pročitaj analizu"}</span>
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function sortCollection(items: BlogPost[], sort: SortKey) {
  const cloned = [...items];
  return cloned.sort((a, b) => {
    if (sort === "az") {
      return a.title.localeCompare(b.title, "bs");
    }
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });
}
