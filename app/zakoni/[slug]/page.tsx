import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchActSnapshot } from '@/lib/acts';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1h snapshot cache

interface Params {
  params: { slug: string };
  searchParams?: { at?: string };
}

export default async function ActViewerPage({ params, searchParams }: Params) {
  const snapshotDate = searchParams?.at || new Date().toISOString().slice(0, 10);

  const record = await fetchActSnapshot(params.slug, snapshotDate).catch(() => null);

  if (!process.env.DATABASE_URL) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-white">LawViewer baza nije konfigurirana</h1>
        <p className="mt-4 text-slate-300">
          Dodajte <code className="rounded bg-white/10 px-1 py-0.5">DATABASE_URL</code> u <code>.env.local</code>, pokrenite Drizzle
          migracije i ponovno se učitajte da biste vidjeli sadržaj zakona.
        </p>
        <p className="mt-8 text-sm text-slate-400">
          Traženi slug: <code>{params.slug}</code>
        </p>
      </main>
    );
  }

  if (!record) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-100">
      <header className="border-b border-white/10 pb-6">
        <div className="text-sm uppercase tracking-[0.4em] text-slate-400">Digitalni zakon</div>
        <h1 className="mt-2 text-3xl font-bold">{record.act.title}</h1>
        <p className="mt-2 text-sm text-slate-400">
          Jurisdikcija: {record.act.jurisdiction} · Stanje na dan {snapshotDate}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="rounded-full border border-white/15 px-3 py-1 text-slate-200 hover:border-white/40" href="/lawviewer">
            ← Povratak na LawViewer hub
          </Link>
          <span className="rounded-full border border-white/15 px-3 py-1 text-slate-300">
            {record.provisions.length} odredbi
          </span>
        </div>
      </header>

      <section className="mt-10 space-y-10">
        {record.provisions.length === 0 && (
          <p className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-4 text-yellow-100">
            Još nema uvezenih članova za ovaj zakon. Pokrenite ETL skriptu da biste napunili bazu.
          </p>
        )}

        {record.provisions.map((item) => (
          <article key={item.id} id={item.provisionKey} className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white">
              {item.heading || `Član ${item.orderIndex + 1}`}
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-slate-100/90 leading-relaxed">{item.content}</p>
            <p className="mt-2 text-xs text-slate-400">
              Važi od {item.validFrom}
              {item.validTo ? ` do ${item.validTo}` : ''}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
