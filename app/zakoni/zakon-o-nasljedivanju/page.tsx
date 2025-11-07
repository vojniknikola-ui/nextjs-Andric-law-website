import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Zakon o nasljeđivanju FBiH | Andrić Law',
  description: 'Konsolidovani tekst Zakona o nasljeđivanju u Federaciji BiH (SG FBiH 80/14, 32/19) sa naglaskom na nužni dio i prava bračnih partnera.',
  alternates: {
    canonical: 'https://andric.law/zakoni/zakon-o-nasljedjivanju',
  },
};

export default async function ZakonONasljedjivanjuPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'zakon-o-nasljedivanju-fbih.txt');
  const lawContent = await fs.readFile(lawPath, 'utf-8');
  const articleMatches = lawContent.match(/Član\s+\d+/gi);
  const articleCount = articleMatches ? articleMatches.length : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Nasljeđivanje"
        title="Zakon o nasljeđivanju u Federaciji BiH"
        description="Kompletan pregled nasljednih redova, testamentarnih formi, nužnog dijela i ostavinskog postupka – sa napomenama o odluci Ustavnog suda 32/19."
        actions={[
          { type: 'render', label: 'Preuzmi PDF', variant: 'primary' },
        ]}
        highlights={[
          { label: 'Službene novine FBiH 80/14', description: 'Novi okvir nasljeđivanja' },
          { label: 'Odluka US FBiH 32/19', description: 'Tumačenje nužnog dijela i prava bračnog partnera' },
          { label: 'Struktura', description: `${articleCount} članova · 7 cjelina` },
        ]}
      />

      <LawViewer lawContent={lawContent} />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Napomena</h2>
          <p className="text-sm leading-relaxed">
            Tekst je adaptiran za LawViewer radi lakšeg rada s klijentima. Za zvaničnu verziju provjerite „Službene novine Federacije BiH“.
          </p>
        </div>
      </section>
    </main>
  );
}
