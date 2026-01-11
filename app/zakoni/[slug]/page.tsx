import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogCard } from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { fetchActSnapshot } from '@/lib/acts';
import { loadFallbackLaw } from '@/lib/lawFallbacks';
import { contactInfo } from '@/lib/contactInfo';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1h snapshot cache

interface Params {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ at?: string }>;
}

const FALLBACK_OG_IMAGE = 'https://andric.law/fallbacks/andric-law.jpg';

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const record = process.env.DATABASE_URL
		? await fetchActSnapshot(slug, new Date().toISOString().slice(0, 10)).catch(() => null)
		: null;

	const fallbackRecord = record ?? (await loadFallbackLaw(slug));

	if (!fallbackRecord) {
		return {
			title: 'Zakon nije pronađen',
		};
	}

	const act = fallbackRecord.act;
	const canonicalUrl = `https://andric.law/zakoni/${act.slug}`;
	const description = act.summary || `Pregled zakona ${act.title} sa svim članovima i izmjenama.`;

	return {
		title: `${act.title} | Andrić Law`,
		description: description,
		keywords: [act.title.split(' '), 'zakon', 'propis', 'Bosna i Hercegovina'].flat(),
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: act.title,
			description: description,
			type: 'article',
			url: canonicalUrl,
			images: [{ url: FALLBACK_OG_IMAGE }],
		},
		twitter: {
			card: "summary_large_image",
			title: `${act.title} | Andrić Law`,
			description: description,
			images: [FALLBACK_OG_IMAGE],
		},
	};
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
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-6 py-16">
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

  const bibliographyItems = buildBibliography(fallbackRecord.act);

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.65),_rgba(2,6,23,1))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/50 p-8 shadow-2xl shadow-black/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">Digitalni Zakon</p>
              <h1 className="mt-4 text-4xl font-bold text-white lg:text-5xl">{fallbackRecord.act.title}</h1>
              <div className="mt-6 space-y-3 text-slate-300">
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Bibliografski izvor
                  </p>
                  <dl className="mt-4 space-y-2 text-sm text-slate-200">
                    {bibliographyItems.map((item) => (
                      <div key={item.label} className="flex flex-wrap gap-2">
                        <dt className="font-semibold text-slate-100">{item.label}:</dt>
                        <dd className="text-slate-300">
                          {item.href ? (
                            <a href={item.href} className="text-cyan-300 hover:text-cyan-200 underline">
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {fallbackRecord.act.summary && (
                  <p>
                    <span className="font-semibold text-slate-100">Izmjene:</span>{' '}
                    {fallbackRecord.act.summary}
                  </p>
                )}
                {isFallback && (
                  <p className="font-medium text-amber-300">Prikazuje se offline snapshot.</p>
                )}
              </div>
            </div>
            <Link
              href="/zakoni"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800/60 hover:border-slate-500"
            >
              &larr; Svi zakoni
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
                  className="scroll-mt-28 rounded-3xl border border-slate-700/50 bg-slate-800/30 p-6 shadow-lg transition-all duration-300 hover:bg-slate-800/50 hover:border-slate-600"
                >
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wider text-slate-400">
                    <span>{item.provisionKey.replace('clan_', 'Član ')}</span>
                    <span className="font-mono text-xs">{formatDisplayDate(item.validFrom)}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{item.heading || `Član ${item.orderIndex + 1}`}</h2>
                  <div className="prose prose-invert prose-slate mt-4 max-w-none text-slate-300">
                    <p className="whitespace-pre-wrap leading-relaxed">{item.content}</p>
                  </div>
                  {item.validTo && (
                    <p className="mt-4 text-xs text-amber-300">Prestaje da važi {formatDisplayDate(item.validTo)}</p>
                  )}
                </article>
              ))
            )}
          </div>
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
            <a href={`mailto:${contactInfo.email}`} className="text-white hover:underline">
              {contactInfo.email}
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

function buildBibliography(act: { title: string; officialNumber?: string | null; officialUrl?: string | null; publishedAt?: string | null; jurisdiction?: string | null }) {
  const publishedAt = act.publishedAt ? formatDisplayDate(act.publishedAt) : 'Nije uneseno';
  return [
    { label: 'Naziv propisa', value: act.title },
    { label: 'Službeni glasnik', value: act.officialNumber ?? 'Nije uneseno' },
    { label: 'Datum objave', value: publishedAt },
    { label: 'Nadležnost', value: act.jurisdiction ?? 'BiH' },
    {
      label: 'Službeni izvor',
      value: act.officialUrl ? 'Pogledaj dokument' : 'Nije dostupno',
      href: act.officialUrl ?? undefined,
    },
  ];
}
