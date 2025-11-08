import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Andrić Law</p>
            <h1 className="text-xl font-semibold text-white">LawViewer Admin</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Link href="/lawviewer" className="rounded-full border border-white/15 px-3 py-1 hover:border-white/40">
              Pogledaj LawViewer
            </Link>
            <Link href="/" className="rounded-full border border-white/15 px-3 py-1 hover:border-white/40">
              Povratak na web
            </Link>
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
