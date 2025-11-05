import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import { BlogClientWrapper } from './BlogClientWrapper';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Andrić Law - Pravni savjeti i vodiči',
  description: 'Stručni članci o radnom pravu, IT ugovorima, privrednom pravu i compliance-u. Praktični vodiči za vlasnike firmi i HR.',
  openGraph: {
    title: 'Blog | Andrić Law',
    description: 'Stručni pravni članci i vodiči',
    type: 'website',
  },
};

// ISR - Revalidate every 1 hour
export const revalidate = 3600;

export default async function BlogPage() {
  // SSR - Data fetching on server
  const posts = await getAllPosts();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Pravni blog
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Stručni članci, praktični vodiči i pravne analize. Sve što trebate znati o radnom pravu, IT ugovorima i poslovanju u BiH.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {posts.length} članaka
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Ažurirano redovno
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content - Client Component for filtering */}
      <BlogClientWrapper posts={posts} tags={tags} />

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Trebate pravnu pomoć?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Kontaktirajte nas za besplatne inicijalne konsultacije. Odgovaramo u roku od 24h.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
              >
                Zakaži konsultacije
              </Link>
              <a
                href="tel:+38761000000"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                Pozovi odmah
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
