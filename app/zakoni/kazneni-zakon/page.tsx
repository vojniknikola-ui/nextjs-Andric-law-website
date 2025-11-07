import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Kazneni zakon Federacije BiH | Andrić Law',
  description: 'Kazneni zakon Federacije BiH - pročišćeni tekst sa historijatom izmjena',
  alternates: {
    canonical: 'https://andric.law/zakoni/kazneni-zakon',
  },
};

const AMENDMENTS = [
  {
    id: 'izmjena-2025',
    label: '2025 · SN 58/25',
    summary: 'Direktiva (EU) 2024/1385 – zaštita žrtava rodno zasnovanog nasilja',
    details: [
      'Uveden članak 1a – usklađivanje sa evropskom direktivom.',
      'Pojačane sankcije za digitalno i rodno zasnovano nasilje.',
      'Precizirani pojmovi i procesne garancije za žrtve.',
    ],
  },
  {
    id: 'izmjena-2017',
    label: '2017 · SN 75/17',
    summary: 'Korupcija i zloupotreba položaja',
    details: [
      'Strožije kazne za zloupotrebu položaja i koruptivne radnje.',
      'Nove mjere za oduzimanje imovinske koristi.',
      'Precizirana definicija službene osobe.',
    ],
  },
];

export default async function KazneniZakonPage() {
  const filePath = path.join(process.cwd(), 'public', 'laws', 'kazneni-zakon-fbih.md');
  const lawContent = await fs.readFile(filePath, 'utf-8');
  const articleMatches = lawContent.match(/Član(?:ak)?\s+[A-Z0-9.\-]+/gi);
  const articleCount = articleMatches ? articleMatches.length : 0;
  const historyMatches = lawContent.match(/Historijat izmjena/gi);
  const historyCount = historyMatches ? historyMatches.length : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[3fr,2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
              Andrić Law · Kazneno pravo
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 lg:text-5xl">
              Kazneni zakon Federacije BiH – pročišćeni tekst
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Jedinstvena LawViewer verzija sa kompletnim člancima, historijatom izmjena i sidrima za brzo kretanje kroz OPĆI i POSEBNI dio zakona.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/laws/kazneni-zakon-fbih.md"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5"
                download
              >
                Preuzmi MD pročišćeni tekst
              </a>
              <a
                href="/search?q=kazneni%20zakon"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Pretraži izmjene
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Službene novine</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  36/03 → 58/25
                </p>
                <p className="text-slate-600">
                  Uključuje sve izmjene (ispravke, dopune i 2025. izmjene zasnovane na EU direktivi).
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Historijat</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{historyCount}+ anotacija</p>
                <p className="text-slate-600">
                  Klikom na “Historijat izmjena” otvara se verzija člana prije izmjene.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">Status dokumenta</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">{articleCount}+ članaka</h2>
            <p className="mt-1 text-slate-600">
              OPĆI dio + POSEBNI dio sa svim kaznenim djelima i bilješkama o izmjenama.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">Glave</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">25</dd>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">Historijat</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">{historyCount}+ članova</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-slate-500">
              LawViewer format omogućava uredniku da samo ubaci novi MD/TXT fajl u <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-[11px]">/public/laws</code>, bez dodatnog kodiranja.
            </p>
          </div>
        </div>
      </section>

      <LawViewer lawContent={lawContent} />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Historija ključnih izmjena</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sažetak najvažnijih izmjena koje su već ugrađene u LawViewer pročišćeni tekst. Svaki član u samom prikazu ima i detaljan historijat.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {AMENDMENTS.map((amendment) => (
              <article key={amendment.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">{amendment.label}</span>
                  <span className="rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-800">
                    Uključeno
                  </span>
                </div>
                <p className="mt-3 text-base font-semibold text-slate-900">{amendment.summary}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {amendment.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50/80 p-6 text-yellow-900">
          <h3 className="text-lg font-semibold mb-2">Napomena</h3>
          <p className="text-sm leading-relaxed">
            Ovo je neslužbeni pročišćeni tekst koji služi isključivo za informativne svrhe. Za službenu uporabu potrebno je konsultirati originalne tekstove objavljene u
            <strong> "Službenim novinama Federacije BiH"</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
