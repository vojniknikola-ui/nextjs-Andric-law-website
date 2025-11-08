import { promises as fs } from 'fs';
import path from 'path';
import LawViewerInteractive from '@/components/LawViewerInteractive';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Zakon o privremenoj zabrani raspolaganja državnom imovinom | Andrić Law',
  description: 'Neslužbeni prečišćeni tekst zakona kojim je zabranjeno raspolaganje državnom imovinom Bosne i Hercegovine, sa svim izmjenama od 2005. do 2022.',
  alternates: {
    canonical: 'https://andric.law/zakoni/zakon-o-privremenoj-zabrani-drzavne-imovine',
  },
};

export default async function PrivremenaZabranaDrzavneImovinePage() {
  const filePath = path.join(
    process.cwd(),
    'public',
    'laws',
    'zakon-o-privremenoj-zabrani-raspolaganja-drzavnom-imovinom-bih.txt',
  );
  const lawContent = await fs.readFile(filePath, 'utf-8');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Državna imovina"
        title="Zakon o privremenoj zabrani raspolaganja državnom imovinom BiH"
        description="Privremena zabrana prenosa državne imovine, uz jasno definisana izuzeća (odbrana, privatizacija i odluke Komisije za državnu imovinu)."
        actions={[]}
        highlights={[
          { label: 'Službeni glasnik BiH', description: '18/05, 29/06, 85/06, 32/07, 41/07, 74/07, 99/07, 58/08, 22/22' },
          { label: 'Status', description: 'Važi do usvajanja državnog zakona o vlasništvu nad imovinom' },
        ]}
      />

      <LawViewerInteractive
        lawContent={lawContent}
        gazetteNote="Službeni glasnik BiH: 18/05, 29/06, 85/06, 32/07, 41/07, 74/07, 99/07, 58/08, 22/22"
      />
    </main>
  );
}
