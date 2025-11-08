"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import Image from "next/image";
import type { LawIndexItem } from "@/types/law";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";

type Tab = "all" | "zakoni" | "clanci";

type LawHubItem = {
  id: string;
  title: string;
  href: string;
  entity?: string;
  source: "json" | "blog";
};

export default function LawViewerHub({ laws, posts }: { laws: LawIndexItem[]; posts: BlogPost[] }) {
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

    // de-duplicate by href
    const map = new Map<string, LawHubItem>();
    [...fromIndex, ...fromBlog].forEach((x) => {
      map.set(x.href, x);
    });
    return Array.from(map.values());
  }, [laws, posts]);

  const blogArticles = useMemo(() => posts.filter((p) => !p.isLawDocument), [posts]);

  const fuseLaws = useMemo(() => new Fuse(allLaws, { includeScore: true, threshold: 0.35, keys: ["title", "id", "entity"] }), [allLaws]);
  const fusePosts = useMemo(() => new Fuse(blogArticles, { includeScore: true, threshold: 0.35, keys: ["title", "excerpt", "tags"] }), [blogArticles]);

  const filteredLaws = useMemo(() => (q.trim() ? fuseLaws.search(q).map((r) => r.item) : allLaws), [q, allLaws, fuseLaws]);
  const filteredPosts = useMemo(() => (q.trim() ? fusePosts.search(q).map((r) => r.item) : blogArticles), [q, blogArticles, fusePosts]);

  const showLaws = tab === "all" || tab === "zakoni";
  const showPosts = tab === "all" || tab === "clanci";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1">
          <button onClick={() => setTab("all")} className={`px-3 py-1.5 text-sm rounded-xl ${tab === "all" ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white'}`}>Sve</button>
          <button onClick={() => setTab("zakoni")} className={`px-3 py-1.5 text-sm rounded-xl ${tab === "zakoni" ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white'}`}>Zakoni</button>
          <button onClick={() => setTab("clanci")} className={`px-3 py-1.5 text-sm rounded-xl ${tab === "clanci" ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white'}`}>Članci</button>
        </div>
        <div className="relative w-full md:w-96">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži zakone i članke…"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/20"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
        </div>
      </div>

      {/* Laws */}
      {showLaws && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Zakoni</h2>
            <span className="text-xs text-slate-400">{filteredLaws.length} zapisa</span>
          </div>
          {filteredLaws.length === 0 ? (
            <p className="text-sm text-slate-400">Nema rezultata.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLaws.map((law) => (
                <a key={law.href} href={law.href} className="group block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white line-clamp-2">{law.title}</p>
                    <span className="text-[11px] rounded-full border border-blue-300/30 bg-blue-900/30 px-2 py-0.5 text-blue-100">LawViewer</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>{law.entity || (law.source === 'blog' ? 'blog' : 'zakon')}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition">Otvori →</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles */}
      {showPosts && (
        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Članci</h2>
            <span className="text-xs text-slate-400">{filteredPosts.length} zapisa</span>
          </div>
          {filteredPosts.length === 0 ? (
            <p className="text-sm text-slate-400">Nema rezultata.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

