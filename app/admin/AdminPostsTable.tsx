'use client';

import Link from 'next/link';
import { useState } from 'react';

type PostRow = {
  slug: string;
  title: string | null;
  excerpt: string | null;
  tags: string[] | null;
  isLawDocument: boolean | null;
  featured: boolean | null;
  publishedAt: string | null;
  lawSlug?: string | null;
};

export default function AdminPostsTable({ posts }: { posts: PostRow[] }) {
  const [items, setItems] = useState(posts);
  const [filter, setFilter] = useState('');

  const removePost = async (slug: string) => {
    const confirmed = window.confirm(`Obrisati "${slug}"?`);
    if (!confirmed) return;
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Brisanje nije uspjelo.');
        return;
      }
      setItems((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert('Brisanje nije uspjelo.');
    }
  };

  if (items.length === 0) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
        <h2 className="text-xl font-semibold text-white">Objavljeni članci</h2>
        <p className="mt-3 text-sm text-slate-400">Još nema članaka u bazi.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Objavljeni članci</h2>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtriraj po naslovu/slug-u"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white placeholder:text-slate-400 focus:border-white/30 focus:outline-none"
          />
          <span>{items.length} ukupno</span>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-slate-400">
              <th className="px-2 py-2">Naslov</th>
              <th className="px-2 py-2">Slug</th>
              <th className="px-2 py-2">Tagovi</th>
              <th className="px-2 py-2">Tip</th>
              <th className="px-2 py-2 text-right">Akcija</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items
              .filter((post) => {
                const query = filter.toLowerCase();
                if (!query) return true;
                return (
                  (post.title ?? '').toLowerCase().includes(query) ||
                  post.slug.toLowerCase().includes(query)
                );
              })
              .map((post) => (
              <tr key={post.slug}>
                <td className="px-2 py-2">{post.title ?? '—'}</td>
                <td className="px-2 py-2 text-xs text-slate-400">{post.slug}</td>
                <td className="px-2 py-2 text-xs text-slate-300">
                  {post.tags?.slice(0, 3).join(', ') ?? '—'}
                  {post.tags && post.tags.length > 3 ? '…' : ''}
                </td>
                <td className="px-2 py-2 text-xs">{post.isLawDocument ? 'Zakon' : 'Blog'}</td>
                <td className="px-2 py-2 text-right space-x-3">
                  <Link
                    href={post.isLawDocument && post.lawSlug ? `/zakoni/${post.lawSlug}` : `/blog/${post.slug}`}
                    className="text-blue-300 hover:underline"
                  >
                    Otvori
                  </Link>
                  <Link href={`/admin/law-uploader?slug=${post.slug}`} className="text-cyan-300 hover:underline">Uredi</Link>
                  <button
                    type="button"
                    onClick={() => removePost(post.slug)}
                    className="text-red-300 hover:underline"
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
