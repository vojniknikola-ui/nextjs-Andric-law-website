import "server-only";
import { Law, LawIndex } from "@/types/law";

// Build a base URL for public assets in server runtime (works on Vercel)
function getPublicBase(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const INDEX_URL = process.env.LAWS_INDEX_URL || `${getPublicBase()}/sample-laws/index.json`;

// Helper: fetch JSON via HTTP; in dev fallback to fs
async function fetchJson<T>(url: string): Promise<T> {
  if (url.startsWith("http")) {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return (await res.json()) as T;
  }

  // Development-only fs fallback
  if (process.env.NODE_ENV !== "production") {
    const fs = await import("node:fs/promises");
    const data = await fs.readFile(url, "utf8");
    return JSON.parse(data) as T;
  }

  // In production, always fetch over HTTP from /public
  const abs = `${getPublicBase()}${url}`;
  const res = await fetch(abs, { cache: "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${abs}`);
  return (await res.json()) as T;
}

export async function getLawIndex(): Promise<LawIndex> {
  return await fetchJson<LawIndex>(INDEX_URL);
}

// Strategy:
// - If index.item.href exists, fetch there.
// - If not, fetch from public/sample-laws/[id].json via HTTP
export async function getLawById(id: string): Promise<Law | null> {
  const idx = await getLawIndex();
  const item = idx.items.find((x) => x.id === id);
  if (!item) return null;

  if (item.href) {
    const res = await fetch(item.href, { cache: "force-cache" });
    if (!res.ok) throw new Error(`Not found: ${item.href}`);
    return (await res.json()) as Law;
  }

  // HTTP from public (works on Vercel)
  const httpUrl = `${getPublicBase()}/sample-laws/${id}.json`;
  const res = await fetch(httpUrl, { cache: "force-cache" });
  if (!res.ok) return null;
  return (await res.json()) as Law;
}
