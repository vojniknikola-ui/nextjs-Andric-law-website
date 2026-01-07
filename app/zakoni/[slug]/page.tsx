import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogCard } from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { fetchActSnapshot } from '@/lib/acts';
import { loadFallbackLaw } from '@/lib/lawFallbacks';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1h snapshot cache

interface Params {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ at?: string }>;
}

export default async function ActViewerPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { at } = (await searchParams) ?? {};
  const snapshotDate = at || new Date().toISOString().slice(0, 10);

  const record = process.env.DATABASE_URL
    ? await fetchActSnapshot(slug, snapshotDate).catch(() => null)
    : null;

  const fallbackRecord = record ?? (await loadFallbackLaw(slug));

  if (!fallbackRecord) {
    if (!process.env.DATABASE_URL) {
      return (
        <main className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-semibold text-white">Zakon nije pronađen</h1>
          <p className="mt-4 text-slate-300">
            Dodajte <code className="rounded bg-white/10 px-1 py-0.5">DATABASE_URL</code> ili registrujte zakon među
            fallback datotekama kako bi bio dostupan.
          </p>
        </main>
      );
    }
    return notFound();
  }

  const isFallback = !record;
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((post) => !post.isLawDocument && post.lawSlug === fallbackRecord.act.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.65),_rgba(2,6,23,1))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Andrić Law</p>
          <h1 className="mt-4 text-4xl font-bold text-white lg:text-5xl">{fallbackRecord.act.title}</h1>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-slate-200">Službeni glasnik:</span>{' '}
              {fallbackRecord.act.officialNumber ?? 'n/a'}
            </p>
            {fallbackRecord.act.summary && (
              <p>
                <span className="font-semibold text-slate-200">Izmjene:</span>{' '}
                {fallbackRecord.act.summary}
              </p>
            )}
            {isFallback && (
              <p className="text-amber-200">Offline snapshot</p>
            )}
          </div>
          <div className="mt-4">
            <Link
              href="/zakoni"
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-1 text-sm text-slate-200 hover:border-white/40"
            >
              ← Nazad na zakone
            </Link>
          </div>
        </section>

        <section className="mt-8 space-y-6">
          <div>
            {fallbackRecord.provisions.length === 0 ? (
              <p className="rounded-2xl border border-yellow-400/40 bg-yellow-500/10 p-4 text-yellow-100">
                Još nema uvezenih članova za ovaj zakon. Pokrenite ETL kako biste popunili sadržaj.
              </p>
            ) : (
              fallbackRecord.provisions.map((item) => (
                <article
                  key={item.id}
                  id={item.provisionKey}
                  className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40"
                >
                  <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
                    <span>{item.provisionKey.replace('clan_', 'Član ')}</span>
                    <span>{item.validFrom}</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{item.heading || `Član ${item.orderIndex + 1}`}</h2>
                  <p className="mt-4 whitespace-pre-wrap text-slate-100/90 leading-relaxed">{item.content}</p>
                  {item.validTo ? (
                    <p className="mt-3 text-xs text-slate-400">Prestaje važiti {item.validTo}</p>
                  ) : (
                    <p className="mt-3 text-xs text-slate-400">Važi od {item.validFrom}</p>
                  )}
                </article>
              ))
            )}
        </section>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 text-xs text-slate-300">
          Informacije na ovoj stranici služe samo u informativne svrhe i ne predstavljaju pravni savjet. Za zvanično tumačenje provjerite službene izvore ili kontaktirajte Andrić Law.
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Povezani članci</h2>
              <Link href="/blog" className="text-sm text-slate-300 hover:text-white">
                Svi članci →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p>
            Treba vam stručno tumačenje ili analiza izmjena? Pišite nam nenametljivo na{' '}
            <a href="mailto:info@andric.law" className="text-white hover:underline">
              info@andric.law
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}

function formatDisplayDate(value: string) {
  try {
    return new Date(value).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return value;
  }
}
