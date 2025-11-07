import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Politika direktnih stranih ulaganja | Andrić Law',
  description: 'Konsolidovani tekst Zakona o politici direktnih stranih ulaganja u BiH (SG 4/98, 17/98, 13/03, 48/10, 22/15) u LawViewer formatu.',
  alternates: {
    canonical: 'https://andric.law/zakoni/politika-direktnih-ulaganja',
  },
};

export default async function PolitikaDirektnihUlaganjaPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'politika-direktnih-stranih-ulaganja-bih.txt');
  const lawContent = await fs.readFile(lawPath, 'utf-8');
  const articleMatches = lawContent.match(/Član\s+\d+/gi);
  const articleCount = articleMatches ? articleMatches.length : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Strana ulaganja"
        title="Zakon o politici direktnih stranih ulaganja u BiH"
        description="Kompletan konsolidovani tekst sa izmjenama 2003, 2010. i 2015. godine – uključuje prava ulagača, garancije, procedure i rješavanje sporova."
        actions={[
          { type: 'render', label: 'Preuzmi PDF', variant: 'primary' },
        ]}
        stats={[
          { label: 'Članovi', value: `${articleCount}`, description: 'Dio I–VII' },
          { label: 'Izmjene', value: '4 paketa', description: 'SG BiH 4/98 – 22/15' },
        ]}
      />

      <LawViewer lawContent={lawContent} />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Napomena</h2>
          <p className="text-sm leading-relaxed">
            Tekst je pripremljen za LawViewer kako bi klijenti imali jedinstven pregled svih izmjena. Za zvaničnu upotrebu provjerite objave u „Službenom glasniku Bosne i Hercegovine“.
          </p>
        </div>
      </section>
    </main>
  );
}
