"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import {
  ChevronRight,
  ArrowDownUp,
} from "lucide-react";

type Tab = "all" | "zakoni" | "clanci";
type SortKey = "newest" | "oldest" | "az";

export default function ZakoniClanciSection({ posts }: { posts: BlogPost[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const lawPosts = useMemo(() => posts.filter((p) => p.isLawDocument), [posts]);
  const articlePosts = useMemo(() => posts.filter((p) => !p.isLawDocument), [posts]);

  const sortedLaws = useMemo(() => sortCollection(lawPosts, sort), [lawPosts, sort]);
  const sortedArticles = useMemo(() => sortCollection(articlePosts, sort), [articlePosts, sort]);

  const lawCount = lawPosts.length;
  const articleCount = articlePosts.length;
  const totalCount = lawCount + articleCount;

  const tabOptions: { value: Tab; label: string; count: number }[] = [
    { value: "all", label: "Sve", count: totalCount },
    { value: "zakoni", label: "Zakoni", count: lawCount },
    { value: "clanci", label: "Članci", count: articleCount },
  ];
  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "newest", label: "Najnovije" },
    { value: "oldest", label: "Najstarije" },
    { value: "az", label: "A-Z" },
  ];

  const activeTab = tab;
  const showLaws = activeTab === "all" || activeTab === "zakoni";
  const showArticles = activeTab === "all" || activeTab === "clanci";
  const activeCount = activeTab === "zakoni" ? lawCount : activeTab === "clanci" ? articleCount : totalCount;
  const activeLabel = tabOptions.find((option) => option.value === activeTab)?.label ?? "Sve";

  return (
    <section className="relative py-16 md:py-20 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-[15%] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Filter i pregled</p>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                Pronađite sadržaj po tipu
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Odaberite zakone ili članke i prilagodite sortiranje za brzu, fokusiranu pretragu.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTab(option.value)}
                  aria-pressed={activeTab === option.value}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === option.value
                      ? "bg-gradient-to-r from-zinc-200 to-zinc-400 text-slate-950 shadow-lg shadow-white/10"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      activeTab === option.value ? "bg-slate-950/20 text-slate-900" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="text-sm text-slate-400">
              Prikazujem {activeCount} rezultata · {activeLabel}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <ArrowDownUp className="h-4 w-4" />
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSort(option.value)}
                  aria-pressed={sort === option.value}
                  className={`rounded-full px-3 py-1 font-semibold transition ${
                    sort === option.value ? "bg-white text-slate-900" : "border border-white/15 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {showLaws && (
            <section id="zakoni" className="space-y-4 scroll-mt-28">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Zakoni i propisi</h3>
                  <p className="text-sm text-slate-400">
                    Digitalni propisi sa sažecima i osnovnim metapodacima.
                  </p>
                </div>
                <span className="text-sm text-slate-400">{lawCount} dokumenata</span>
              </div>
              {lawCount === 0 ? (
                <EmptyState message="Trenutno nema zakona u bazi." />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sortedLaws.map((law) => (
                    <LawCard key={law.slug} post={law} />
                  ))}
                </div>
              )}
            </section>
          )}

          {showArticles && (
            <section id="clanci" className="space-y-4 scroll-mt-28">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Članci i analize</h3>
                  <p className="text-sm text-slate-400">
                    Stručni tekstovi koji prate praktične poslovne situacije.
                  </p>
                </div>
                <span className="text-sm text-slate-400">{articleCount} članaka</span>
              </div>
              {articleCount === 0 ? (
                <EmptyState message="Trenutno nema članaka u bazi." />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sortedArticles.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-300">
      {message}
    </div>
  );
}

function LawCard({ post }: { post: BlogPost }) {
  const status = post.lawMeta?.status ?? "Aktivan propis";
  const citation = post.lawMeta?.citation ?? post.tags?.[0] ?? "Propis";
  const publishedAt = post.lawMeta?.publishedAt ?? post.date;
  const href = post.lawSlug ? `/zakoni/${post.lawSlug}` : `/blog/${post.slug}`;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
      <Link href={href} className="block p-6">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-900/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-100">
            Digitalni zakon
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{status}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white transition group-hover:text-zinc-200">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-300 line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {citation}
            </span>
            <span className="text-xs text-slate-500">{formatDate(publishedAt)}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-all group-hover:gap-2">
            Otvori
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy}.`;
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
