import { notFound } from 'next/navigation';
import Link from 'next/link';
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
  const headCount = fallbackRecord.provisions.filter((prov) => /glava/i.test(prov.heading ?? '') || prov.level === 'chapter').length;
  const quickNavItems = fallbackRecord.provisions.slice(0, 18);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.65),_rgba(2,6,23,1))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
            <span>Andrić Law</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] text-slate-200">Digitalni zakon</span>
            {isFallback && (
              <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-amber-200">Offline snapshot</span>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white lg:text-5xl">{fallbackRecord.act.title}</h1>
              <p className="mt-3 text-base text-slate-300">
                {fallbackRecord.act.jurisdiction} · Stanje na dan{' '}
                <span className="font-semibold text-white">{formatDisplayDate(snapshotDate)}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <InfoChip label="Članova" value={fallbackRecord.provisions.length} />
              <InfoChip label="Glava" value={headCount || '—'} />
              <InfoChip label="Objava" value={fallbackRecord.act.officialNumber ?? 'n/a'} />
              <Link
                href="/zakoni"
                className="rounded-full border border-white/15 px-4 py-1 text-slate-200 hover:border-white/40"
              >
                ← Nazad na zakone
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <div className="space-y-6">
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
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 shadow-lg shadow-black/30">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Brza navigacija</p>
            <div className="mt-4 space-y-2">
              {quickNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.provisionKey}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs uppercase tracking-[0.2em] text-slate-300 hover:border-white/40 hover:text-white"
                >
                  {item.heading || item.provisionKey.replace('clan_', 'Član ')}
                </a>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
              <p>Možete slobodno podijeliti link ove stranice – sadržaj ostaje vjeran "Službenim novinama".</p>
            </div>
          </aside>
        </section>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 text-xs text-slate-300">
          Informacije na ovoj stranici služe samo u informativne svrhe i ne predstavljaju pravni savjet. Za zvanično tumačenje provjerite službene izvore ili kontaktirajte Andrić Law.
        </div>

        <footer className="mt-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
          <p>
            Treba vam stručno tumačenje ili analiza izmjena? Pišite nam nenametljivo na{' '}
            <a href="mailto:info@andric.law" className="text-white hover:underline">
              info@andric.law
            </a>
            . Odgovori se spremaju diskretno, bez agresivnih CTA poruka.
          </p>
        </footer>
      </div>
    </main>
  );
}

function InfoChip({ label, value }: { label: string; value: number | string }) {
  return (
    <span className="rounded-full border border-white/15 px-3 py-1 text-slate-300">
      <span className="mr-2 text-xs uppercase tracking-[0.3em] text-slate-500">{label}</span>
      <span className="text-white">{value}</span>
    </span>
  );
}

function formatDisplayDate(value: string) {
  try {
    return new Date(value).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return value;
  }
}
