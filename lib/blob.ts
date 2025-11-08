import "server-only";
import { Law, LawIndex } from "@/types/law";

const INDEX_URL = process.env.LAWS_INDEX_URL || `${process.cwd()}/public/sample-laws/index.json`;

// Helper: fetch JSON from HTTP or local file
async function fetchJson<T>(url: string): Promise<T> {
  if (url.startsWith("http")) {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return (await res.json()) as T;
  } else {
    const fs = await import("node:fs/promises");
    const data = await fs.readFile(url, "utf8");
    return JSON.parse(data) as T;
  }
}

export async function getLawIndex(): Promise<LawIndex> {
  return await fetchJson<LawIndex>(INDEX_URL);
}

// Strategy:
// - If index.item.href exists, fetch there.
// - If not, try public/sample-laws/[id].json
export async function getLawById(id: string): Promise<Law | null> {
  const idx = await getLawIndex();
  const item = idx.items.find((x) => x.id === id);
  if (!item) return null;

  if (item.href) {
    const res = await fetch(item.href, { cache: "force-cache" });
    if (!res.ok) throw new Error(`Not found: ${item.href}`);
    return (await res.json()) as Law;
  }

  // local fallback
  const local = `${process.cwd()}/public/sample-laws/${id}.json`;
  try {
    return await fetchJson<Law>(local);
  } catch {
    return null;
  }
}

