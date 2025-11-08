"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { LawIndexItem } from "@/types/law";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import { Search as SearchIcon, ChevronRight } from "lucide-react";

type Tab = "all" | "zakoni" | "clanci";

type LawHubItem = {
  id: string;
  title: string;
  href: string;
  entity?: string;
  source: "json" | "blog";
};

export default function LawViewerHub({
  laws,
  posts,
}: {
  laws: LawIndexItem[];
  posts: BlogPost[];
}) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const allLaws: LawHubItem[] = useMemo(() => {
    const fromIndex = (laws || []).map((it) => ({
      id: it.id,
      title: it.title,
      href: `/zakoni/${it.id}`,
      entity: it.entity,
      source: "json" as const,
    }));

    const fromBlog = (posts || [])
      .filter((p) => p.isLawDocument && p.lawViewerPath)
      .map((p) => ({
        id: p.slug,
        title: p.title,
        href: p.lawViewerPath!,
        entity: undefined,
        source: "blog" as const,
      }));

    const map = new Map<string, LawHubItem>();
    [...fromIndex, ...fromBlog].forEach((x) => {
      map.set(x.href, x);
    });
    return Array.from(map.values());
  }, [laws, posts]);

  const blogArticles = useMemo(
    () => posts.filter((p) => !p.isLawDocument),
    [posts]
  );

  const fuseLaws = useMemo(
    () =>
      new Fuse(allLaws, {
        includeScore: true,
        threshold: 0.35,
        keys: ["title", "id", "entity"],
      }),
    [allLaws]
  );
  const fusePosts = useMemo(
    () =>
      new Fuse(blogArticles, {
        includeScore: true,
        threshold: 0.35,
        keys: ["title", "excerpt", "tags"],
      }),
    [blogArticles]
  );

  const filteredLaws = useMemo(
    () => (q.trim() ? fuseLaws.search(q).map((r) => r.item) : allLaws),
    [q, allLaws, fuseLaws]
  );
  const filteredPosts = useMemo(
    () =>
      q.trim() ? fusePosts.search(q).map((r) => r.item) : blogArticles,
    [q, blogArticles, fusePosts]
  );

  const showLaws = tab === "all" || tab === "zakoni";
  const showPosts = tab === "all" || tab === "clanci";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-white">
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {(["all", "zakoni", "clanci"] as Tab[]).map((value) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === value
                  ? "bg-white text-slate-900 shadow-lg shadow-white/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {value === "all" ? "Sve" : value === "zakoni" ? "Zakoni" : "Članci"}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži zakone i članke…"
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/40"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Laws */}
      {showLaws && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Zakoni</h2>
            <span className="text-sm text-slate-400">{filteredLaws.length} zapisa</span>
          </div>
          {filteredLaws.length === 0 ? (
            <EmptyState message="Nema zakona za zadani pojam. Pokušajte s drugim izrazom." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLaws.map((law) => (
                <LawCard key={law.href} law={law} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles */}
      {showPosts && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Članci</h2>
            <span className="text-sm text-slate-400">{filteredPosts.length} zapisa</span>
          </div>
          {filteredPosts.length === 0 && !showLaws ? (
            <EmptyState message="Nema članaka za zadani pojam. Pokušajte ponovno." />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
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

function LawCard({ law }: { law: LawHubItem }) {
  return (
    <Link
      href={law.href}
      className="group block rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 shadow-xl shadow-black/30 ring-1 ring-white/10 transition hover:-translate-y-1 hover:border-white/40 hover:ring-white/30"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-300">
        <span>LawViewer</span>
        <span>{law.entity || (law.source === "blog" ? "Blog" : "Zakon")}</span>
      </div>
      <p className="mt-4 text-lg font-semibold leading-snug text-white">
        {law.title}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-200">
        <span>{law.source === "blog" ? "Blog + zakon" : "Zakon"}</span>
        <span className="inline-flex items-center gap-1 text-white">
          Otvori
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
