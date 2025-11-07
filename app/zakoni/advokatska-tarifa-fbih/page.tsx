import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Advokatska tarifa FBiH | Andrić Law',
  description: 'Tarifa o nagradama i naknadi za rad odvjetnika u Federaciji BiH (SN FBiH 43/25) u LawViewer formatu – pregled tarifnih brojeva i napomena.',
  alternates: {
    canonical: 'https://andric.law/zakoni/advokatska-tarifa-fbih',
  },
};

export default async function AdvokatskaTarifaFBiHPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'advokatska-tarifa-fbih.md');
  const lawContent = await fs.readFile(lawPath, 'utf-8');

  const tariffMatches = lawContent.match(/tarifni broj/gi);
  const tariffCount = tariffMatches ? tariffMatches.length : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Tarife"
        title="Advokatska tarifa Federacije BiH"
        description="Tarifa o nagradama i naknadi za rad odvjetnika – pregled tarifnih brojeva i osnovica, spremno za brzu provjeru i rad sa strankama."
        actions={[
          { type: 'render', label: 'Preuzmi PDF', variant: 'primary' },
          { type: 'link', label: 'Službene novine 43/25 (PDF)', href: '/laws/advokatska-tarifa-fbih.pdf', variant: 'secondary', download: true },
        ]}
        highlights={[
          { label: 'Službene novine FBiH 43/25', description: 'Aktuelna tarifa (FBiH)' },
          { label: 'Tarifni brojevi', description: tariffCount ? `${tariffCount} stavki` : 'više od 30 stavki' },
        ]}
      />

      <LawViewer lawContent={lawContent} />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Napomena</h2>
          <p className="text-sm leading-relaxed">
            Tekst je pripremljen za LawViewer radi lakšeg rada i pretraživanja. Za službenu upotrebu provjerite objavu u „Službenim novinama Federacije BiH“ (43/25).
          </p>
        </div>
      </section>
    </main>
  );
}

