import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ZakoniClanciSection from "@/components/ZakoniClanciSection";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Zakoni i članci | Andrić Law",
  description: "Digitalni pregled zakona i autorskih članaka u istom vizuelnom ritmu. Filtrirajte i otvorite propise ili analize.",
  openGraph: {
    title: "Zakoni i članci | Andrić Law",
    description: "Brza lista propisa i stručnih tekstova sa jednostavnim filtriranjem.",
    type: "website",
  },
};

export const revalidate = 1800;

export default async function ZakoniClanciPage() {
  const posts = await getAllPosts();
  const lawCount = posts.filter((post) => post.isLawDocument).length;
  const articleCount = posts.length - lawCount;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[120vw] w-[120vw] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Centar znanja</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Zakoni i članci
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Sve relevantne propise i stručne analize držimo na jednom mjestu. Brzo filtriranje po tipu i jasan pregled bez dodatnih klikova.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Zakoni" value={lawCount} note="Digitalni propisi" />
            <StatCard label="Članci" value={articleCount} note="Stručne analize" />
            <StatCard label="Ukupno" value={posts.length} note="Ažurirano redovno" />
          </div>
        </div>
      </section>

      <ZakoniClanciSection posts={posts} />

      <Footer />
    </main>
  );
}

function StatCard({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
    </div>
  );
}
