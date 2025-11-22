import type { ReactNode } from "react";
import { Compass, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { getAllPosts } from "@/lib/blog";
import LawViewerHub from "@/components/LawViewerHub";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const lawviewerDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lawviewer",
});

export default async function LawViewerIndexPage() {
  const posts = await getAllPosts().catch(() => []);
  const lawCount = posts.filter((p) => p.isLawDocument).length;
  const articleCount = posts.length - lawCount;
  const avgReadMinutes = posts.length
    ? Math.round(posts.reduce((acc, p) => acc + (p.readMinutes ?? 0), 0) / posts.length)
    : 0;

  return (
    <main className={`${lawviewerDisplay.className} min-h-screen bg-slate-950 text-slate-50`}>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#193657_0%,transparent_35%),radial-gradient(circle_at_80%_0%,#0a7e65_0%,transparent_25%),radial-gradient(circle_at_50%_100%,#13203b_0%,transparent_35%)] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/90 ring-1 ring-white/10">LawViewer</span>
            <span className="text-slate-300/90">Digitalni hub</span>
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr,0.9fr] lg:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                Hub za <span className="text-emerald-200">propise i analize</span> koji izgleda kao da je pravljen za čitanje.
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/90">
                LawViewer povezuje digitalizovane zakone, propise i blogove u jedinstven, brendirani UI. Sve što objavimo
                dijeli isti vizuelni jezik, tako da lako prelazite iz propisa u komentar bez gubljenja konteksta.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#zakoni"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/70 hover:bg-emerald-400/20"
                >
                  Otvori propise <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#clanci"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Blogovi i analize
                </a>
                <span className="text-xs text-slate-300">
                  Transparentno, responzivno i spremno za citiranje.
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatPill label="Zakona i propisa" value={lawCount} />
                <StatPill label="Blogova i analiza" value={articleCount} />
                <StatPill label="Prosj. čitanje" value={avgReadMinutes ? `${avgReadMinutes} min` : "—"} subtle />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-slate-950 p-6 shadow-2xl ring-1 ring-white/10">
              <div className="absolute -left-12 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/80">Brendirani sloj</p>
                    <h2 className="text-2xl font-semibold text-white">LawViewer UI</h2>
                    <p className="mt-2 text-sm text-slate-200/90">
                      Propisi i članci dijele iste komponente: fokus na tipografiju, čitljivost i brze akcije.
                    </p>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-emerald-200" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FeatureBadge
                    icon={<Sparkles className="h-4 w-4" />}
                    title="Fokus na tekst"
                    desc="Čisto platno za čitanje, bez šuma i nepotrebnih boja."
                  />
                  <FeatureBadge
                    icon={<Compass className="h-4 w-4" />}
                    title="Brza navigacija"
                    desc="Prebacivanje između zakona i analize bez napuštanja huba."
                  />
                </div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-50/90">
                  LawViewer je posebno brendiran za propise, ali zadržava isti grid i interakcije u člancima. Hub prikazuje oba svijeta u istoj strukturi.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LawViewerHub posts={posts} />
    </main>
  );
}

function StatPill({ label, value, subtle = false }: { label: string; value: number | string; subtle?: boolean }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm shadow-inner shadow-black/20 ${
        subtle ? "border-white/10 bg-white/5 text-slate-200" : "border-emerald-300/25 bg-emerald-500/10 text-emerald-50"
      }`}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-white/70">{label}</span>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function FeatureBadge({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/20">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-slate-200/80">{desc}</p>
      </div>
    </div>
  );
}
