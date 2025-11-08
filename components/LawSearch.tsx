"use client";

import { Input, Kbd } from "@nextui-org/react";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { LawIndexItem } from "@/types/law";

export default function LawSearch({ items }: { items: LawIndexItem[] }) {
  const [q, setQ] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(items, {
      includeScore: true,
      threshold: 0.35,
      keys: ["title", "id", "entity"],
    });
  }, [items]);

  const results = q.trim()
    ? fuse.search(q).slice(0, 10).map((r) => r.item)
    : items.slice(0, 10);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Input
          aria-label="Pretraga zakona"
          placeholder="Pretraži zakone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size="sm"
          className="max-w-lg"
          startContent={<span className="text-neutral-500">🔎</span>}
          endContent={<Kbd>/</Kbd>}
        />
      </div>

      <ul className="mt-3 grid sm:grid-cols-2 gap-2">
        {results.map((it) => (
          <li key={it.id} className="border rounded-lg p-3">
            <div className="text-xs text-neutral-500">{it.entity}</div>
            <Link className="font-medium hover:underline" href={`/zakoni/${it.id}`}>
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
