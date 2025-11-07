import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Advokatska tarifa Republike Srpske | Andrić Law',
  description: 'Kompletan tekst Advokatske tarife Republike Srpske prilagođen za LawViewer – tarifni brojevi, naknade i primjena u jednom interaktivnom prikazu.',
  alternates: {
    canonical: 'https://andric.law/zakoni/advokatska-tarifa-rs',
  },
};

export default async function AdvokatskaTarifaRSPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'advokatska-tarifa-rs.txt');
  const lawContent = await fs.readFile(lawPath, 'utf-8');

  const tariffMatches = lawContent.match(/tarifni broj/gi);
  const tariffCount = tariffMatches ? tariffMatches.length : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Tarife"
        title="Advokatska tarifa Republike Srpske"
        description="Digitalno izdanje službene tarife sa tarifnim brojevima, osnovicama i pravilima obračuna – spremno za brzu provjeru nagrada i naknada."
        actions={[
          { type: 'render', label: 'Preuzmi PDF', variant: 'primary' },
        ]}
        stats={[
          { label: 'Tarifni brojevi', value: tariffCount ? `${tariffCount}` : '30+', description: 'Osnovni i posebni brojevi' },
          { label: 'Format', value: 'LawViewer + PDF', description: 'TXT sadržaj + originalni dokument' },
        ]}
      />

      <LawViewer lawContent={lawContent} />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Napomena</h2>
          <p className="text-sm leading-relaxed">
            Advokatska tarifa Republike Srpske objavljena je u informativne svrhe. Za precizne iznose i eventualne izmjene obavezno provjerite posljednja izdanja &quot;Službenog glasnika Republike Srpske&quot;.
          </p>
        </div>
      </section>
    </main>
  );
}
