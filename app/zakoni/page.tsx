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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Header />

      <section className="border-b border-white/10 bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Andrić Law</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Zakoni i članci</h1>
          <p className="max-w-3xl text-slate-200">
            Jedinstvena lista propisa i autorskih tekstova. Jednostavno filtriranje po tipu i sortiranje bez dodatnih ekrana.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#zakoni" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Idi na zakone
            </a>
            <a href="#clanci" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">
              Idi na članke
            </a>
          </div>
        </div>
      </section>

      <ZakoniClanciSection posts={posts} />

      <Footer />
    </main>
  );
}
