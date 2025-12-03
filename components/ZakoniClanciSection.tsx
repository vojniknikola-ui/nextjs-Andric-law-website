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

export default function ZakoniClanciSection({ posts }: { posts: BlogPost[] }) {
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
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {(["all", "zakoni", "clanci"] as Tab[]).map((value) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === value ? "bg-white text-slate-900" : "text-slate-200 hover:text-white"
              }`}
            >
              {value === "all" ? "Sve" : value === "zakoni" ? "Zakoni" : "Članci"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pretraži po naslovu ili tagu…"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-10 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/40"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white hover:bg-white/20"
              >
                ×
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ArrowDownUp className="h-4 w-4" />
            {(["newest", "oldest", "az"] as SortKey[]).map((value) => (
              <button
                key={value}
                onClick={() => setSort(value)}
                className={`rounded-full px-3 py-1 font-semibold ${
                  sort === value ? "bg-white text-slate-900" : "border border-white/15 text-slate-200"
                }`}
              >
                {value === "newest" ? "Najnovije" : value === "oldest" ? "Najstarije" : "A-Z"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
        {tagCloud.map((tag) => (
          <button
            key={tag}
            onClick={() => setQ(tag)}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-white/30"
          >
            <TagIcon className="h-3 w-3" /> #{tag}
          </button>
        ))}
      </div>

      {showLaws && (
        <section id="zakoni" className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold text-white">Zakoni i propisi</h3>
          {filteredLaws.length === 0 ? (
            <EmptyState message="Nema zakona za zadani pojam." />
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
        <section id="clanci" className="mt-10 space-y-3">
          <h3 className="text-xl font-semibold text-white">Članci i analize</h3>
          {filteredArticles.length === 0 ? (
            <EmptyState message="Nema članaka za zadani pojam." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {sortedArticles.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
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
      className="group relative block overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 p-5 shadow-xl shadow-black/30 ring-1 ring-cyan-300/15 transition hover:-translate-y-1 hover:shadow-cyan-400/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_35%)] opacity-80" />
      <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-cyan-100/80">
        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/40 bg-cyan-500/20 px-2 py-1 text-[10px] font-semibold">
          Digitalni zakon
        </span>
        <span className="text-cyan-50/80">{status}</span>
      </div>
      <p className="relative mt-4 text-lg font-semibold leading-snug text-white group-hover:text-cyan-50">
        {post.title}
      </p>
      <p className="relative mt-2 text-sm text-slate-200 line-clamp-2">{post.excerpt}</p>
      <div className="relative mt-4 flex items-center justify-between text-sm text-slate-200">
        <div className="flex flex-col gap-1 text-[12px] text-cyan-100/80">
          <span className="font-semibold uppercase tracking-[0.16em]">{citation}</span>
          <span className="text-slate-300">{formatDate(publishedAt)}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-cyan-50">
          Otvori
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
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
