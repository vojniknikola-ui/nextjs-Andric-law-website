import { promises as fs } from 'fs';
import path from 'path';
import LawViewerInteractive from '@/components/LawViewerInteractive';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Zakon o reprezentativnosti sindikata i udruženja poslodavaca FBiH | Andrić Law',
  description: 'LawViewer izdanje zakona o reprezentativnosti sindikata i udruženja poslodavaca (SN FBiH 103/21) – pregled članka i brzi PDF.',
  alternates: {
    canonical: 'https://andric.law/zakoni/zakon-o-reprezentativnosti-sindikata-i-udruzenja-poslodavaca-fbih',
  },
};

export default async function ReprezentativnostFBiHPage() {
  const lawPath = path.join(
    process.cwd(),
    'public',
    'laws',
    'zakon-o-reprezentativnosti-sindikata-i-udruzenja-poslodavaca-fbih.txt',
  );
  const lawContent = await fs.readFile(lawPath, 'utf-8');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Radno pravo"
        title="Zakon o reprezentativnosti sindikata i udruženja poslodavaca FBiH"
        description="Konsolidovani prikaz članka sa fokusom na kriterije i postupak utvrđivanja reprezentativnosti sindikata i udruženja poslodavaca."
        actions={[]}
        highlights={[
          { label: 'Službene novine FBiH', description: '103/21 — 22.12.2021.' },
          { label: 'Fokus', description: 'Kriteriji i postupak utvrđivanja reprezentativnosti' },
        ]}
      />

      <LawViewerInteractive
        lawContent={lawContent}
        gazetteNote="Službene novine FBiH 103/21"
      />
    </main>
  );
}
