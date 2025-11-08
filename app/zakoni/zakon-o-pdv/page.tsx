import { promises as fs } from 'fs';
import path from 'path';
import LawViewerInteractive from '@/components/LawViewerInteractive';
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · PDV"
        title="Zakon o porezu na dodatu vrijednost (PDV)"
        description="Neslužbeni pregled PDV propisa u LawViewer formatu – članci i jasna struktura."
        actions={[]}
        highlights={[
          { label: 'Službeni glasnik BiH', description: '9/05, 35/05, 100/07, 33/08, 35/09, 65/10, 26/11, 38/12' },
          { label: 'Napomena', description: 'Neslužbeni konsolidovani tekst – provjerite objave UIO BiH' },
        ]}
      />

      <LawViewerInteractive
        lawContent={lawContent}
        gazetteNote="Službeni glasnik BiH: 9/05, 35/05, 100/07, 33/08, 35/09, 65/10, 26/11, 38/12"
      />
    </main>
  );
}
