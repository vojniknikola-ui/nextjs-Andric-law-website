import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

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
      <LawHero
        badge="Andrić Law · Kazneno pravo"
        title="Kazneni zakon Federacije BiH – pročišćeni tekst"
        description="Jedinstvena LawViewer verzija sa kompletnim člancima, historijatom izmjena i sidrima za brzo kretanje kroz OPĆI i POSEBNI dio zakona."
        actions={[
          { type: 'render', label: 'Preuzmi PDF', variant: 'primary' },
        ]}
        highlights={[
          { label: 'Službene novine FBiH 36/03 → 58/25', description: 'Sve izmjene uključene (opći i posebni dio)' },
          { label: 'Historijat', description: `${historyCount}+ bilješki uz članke` },
        ]}
      />

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
