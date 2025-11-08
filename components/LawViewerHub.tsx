"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import type { LawIndexItem } from "@/types/law";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import { SearchIcon } from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Chip
            variant={tab === "all" ? "solid" : "flat"}
            color={tab === "all" ? "primary" : "default"}
            onClick={() => setTab("all")}
            className="cursor-pointer"
          >
            Sve
          </Chip>
          <Chip
            variant={tab === "zakoni" ? "solid" : "flat"}
            color={tab === "zakoni" ? "primary" : "default"}
            onClick={() => setTab("zakoni")}
            className="cursor-pointer"
          >
            Zakoni
          </Chip>
          <Chip
            variant={tab === "clanci" ? "solid" : "flat"}
            color={tab === "clanci" ? "primary" : "default"}
            onClick={() => setTab("clanci")}
            className="cursor-pointer"
          >
            Članci
          </Chip>
        </div>
        <Input
          isClearable
          aria-label="Pretraži"
          className="w-full md:w-96"
          placeholder="Pretraži zakone i članke…"
          startContent={<SearchIcon className="text-default-400" size={18} />}
          value={q}
          onValueChange={setQ}
          onClear={() => setQ("")}
        />
      </div>

      {/* Laws */}
      {showLaws && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Zakoni</h2>
            <span className="text-sm text-default-500">
              {filteredLaws.length} zapisa
            </span>
          </div>
          {filteredLaws.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-content1/50 p-12 text-center">
              <h3 className="text-lg font-semibold text-foreground">
                Nema rezultata
              </h3>
              <p className="text-sm text-default-500">
                Pokušajte s drugim pojmom za pretragu.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLaws.map((law) => (
                <Card
                  key={law.href}
                  isPressable
                  as={Link}
                  href={law.href}
                  className="hover:border-primary"
                >
                  <CardHeader>
                    <h3 className="text-md font-semibold text-foreground leading-tight">
                      {law.title}
                    </h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="flex items-center justify-between">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={law.source === "blog" ? "secondary" : "primary"}
                      >
                        {law.entity ||
                          (law.source === "blog" ? "Blog" : "Zakon")}
                      </Chip>
                      <span className="text-xs text-default-500">
                        Otvori →
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles */}
      {showPosts && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Članci</h2>
            <span className="text-sm text-default-500">
              {filteredPosts.length} zapisa
            </span>
          </div>
          {filteredPosts.length === 0 && !showLaws ? (
             <div className="flex flex-col items-center justify-center rounded-2xl bg-content1/50 p-12 text-center">
             <h3 className="text-lg font-semibold text-foreground">
               Nema rezultata
             </h3>
             <p className="text-sm text-default-500">
               Pokušajte s drugim pojmom za pretragu.
             </p>
           </div>
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

