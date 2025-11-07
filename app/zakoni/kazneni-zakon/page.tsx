import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Kazneni zakon Federacije BiH - LawViewer izdanje',
  description: 'Kompletan kazneni zakon sa interaktivnim historijatom izmjena i označenim amandmanima.',
  alternates: {
    canonical: 'https://andric.law/zakoni/kazneni-zakon',
  },
  openGraph: {
    title: 'Kazneni zakon Federacije BiH - LawViewer izdanje',
    description: 'Kompletan kazneni zakon sa interaktivnim historijatom izmjena i označenim amandmanima.',
    url: 'https://andric.law/zakoni/kazneni-zakon',
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-black via-slate-900 to-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Andrić Law · LawViewer
            </span>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Kazneni zakon Federacije BiH
              </h1>
              <p className="mt-4 text-lg text-white/85">
                Nezvanični pročišćeni tekst sa interaktivnim historijatom izmjena od 2003. do 2025. godine.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#izmjena-2025"
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-900/40 hover:opacity-90"
              >
                Otvori izmjene 2025.
              </a>
              <a
                href="#article-vi"
                className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Skoči na odjeljak VI
              </a>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300">Status</p>
              <p className="mt-2 font-semibold">Važeći tekst + izmjene do SN 58/25</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300">Objave</p>
              <p className="mt-2 font-semibold">
                SN FBiH: 36/03, 37/03, 21/04, 69/04, 18/05, 42/10, 42/11, 59/14, 76/14, 46/16, 75/17, 31/23, 58/25
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-10 grid gap-4">
        {AMENDMENTS.map((amendment) => (
          <details
            key={amendment.id}
            id={amendment.id}
            className="group rounded-3xl border border-blue-200/40 bg-blue-50/90 p-6 text-blue-900 shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-900">
              <span>{amendment.label} — {amendment.summary}</span>
              <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-900 group-open:bg-blue-900 group-open:text-blue-50">
                Prikaži
              </span>
            </summary>
            <div className="mt-4 space-y-2 text-sm leading-relaxed">
              {amendment.details.map((line) => (
                <p key={line}>• {line}</p>
              ))}
            </div>
          </details>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Napomena</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Tekst služi za informativne svrhe i rad sa klijentima. Za službenu upotrebu uvijek konsultujte originalne objave u "Službenim novinama Federacije BiH".
          </p>
        </div>
      </section>

      <LawViewer lawContent={lawContent} />
    </main>
  );
}
