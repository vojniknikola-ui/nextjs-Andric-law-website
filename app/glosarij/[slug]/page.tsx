import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getGlossaryEntries, getGlossaryEntryBySlug, slugifyGlossaryTerm } from '@/lib/glossary';

interface GlossaryEntryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGlossaryEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: GlossaryEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntryBySlug(slug);
  if (!entry) {
    return {
      title: 'Pojam nije pronađen',
    };
  }
  return {
    title: `${entry.term} | Pravni glosarij`,
    description: entry.def.slice(0, 160),
    alternates: {
      canonical: `https://andric.law/glosarij/${entry.slug}`,
    },
  };
}

export default async function GlossaryEntryPage({ params }: GlossaryEntryPageProps) {
  const { slug } = await params;
  const entry = getGlossaryEntryBySlug(slug);

  if (!entry) {
    return notFound();
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/glosarij" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-slate-200">
            &larr; Nazad na glosarij
          </Link>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/30">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                {entry.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">{entry.term}</h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">{entry.def}</p>
          </div>

          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Povezani pojmovi</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.relatedTerms.map((term) => (
                  <Link
                    key={term}
                    href={`/glosarij/${slugifyGlossaryTerm(term)}`}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 hover:border-white/30"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            Trebate dodatno pojašnjenje? Kontaktirajte Andrić Law i dobijte odgovor u roku od 24h.
            <div className="mt-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-5 py-2 transition hover:from-blue-600 hover:to-cyan-600"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
