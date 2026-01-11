import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-zinc-300">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Članak nije pronađen</h2>
        <p className="mt-2 text-slate-400">
          Traženi članak ne postoji ili je uklonjen.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
          >
            <ArrowLeft className="size-4" />
            Nazad na blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
          >
            Početna
          </Link>
        </div>
      </div>
    </main>
  );
}
