import { promises as fs } from 'fs';
import path from 'path';
import LawViewerInteractive from '@/components/LawViewerInteractive';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Kazneni zakon Federacije BiH | Andrić Law',
  description: 'Kazneni zakon Federacije BiH - pročišćeni tekst sa historijatom izmjena',
  alternates: {
    canonical: 'https://andric.law/zakoni/kazneni-zakon',
  },
};

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
        actions={[]}
        highlights={[
          { label: 'Službene novine FBiH 36/03 → 58/25', description: 'Sve izmjene uključene (opći i posebni dio)' },
          { label: 'Historijat', description: `${historyCount}+ bilješki uz članke` },
        ]}
      />

      <LawViewerInteractive lawContent={lawContent} showHistory />
    </main>
  );
}
