import { getAllPosts } from "@/lib/blog";
import LawViewerHub from "@/components/LawViewerHub";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LawViewerIndexPage() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">AL</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">LawViewer</h1>
              <p className="text-sm text-slate-300">Jedinstveno mjesto za zakone i članke — pretraga, filtriranje i brzi ulaz u zakon.</p>
            </div>
          </div>
        </div>
      </section>

      <LawViewerHub posts={posts} />
    </main>
  );
}
