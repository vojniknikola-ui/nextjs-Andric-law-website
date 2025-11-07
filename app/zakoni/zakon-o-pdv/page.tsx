import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Zakon o PDV-u | Andrić Law',
  description: 'Neslužbeni konsolidovani tekst Zakona o porezu na dodatu vrijednost (PDV) u BiH u LawViewer formatu.',
  alternates: {
    canonical: 'https://andric.law/zakoni/zakon-o-pdv',
  },
};

export default async function PDVLawPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'zakon-o-pdv-bih.txt');
  const lawContent = await fs.readFile(lawPath, 'utf-8');

  const articleMatches = lawContent.match(/Član(?:ak)?\s+[A-Z0-9.\-]+/gi);
  const articleCount = articleMatches ? articleMatches.length : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · PDV"
        title="Zakon o porezu na dodatu vrijednost (PDV)"
        description="Neslužbeni pregled PDV propisa u LawViewer formatu – članci i jasna struktura."
        actions={[]}
        highlights={[
          { label: 'Napomena', description: 'Neslužbeni konsolidovani tekst' },
          { label: 'Struktura', description: articleCount ? `${articleCount} članova` : 'više članova' },
        ]}
      />

      <LawViewer lawContent={lawContent} mode="minimal" />
    </main>
  );
}
