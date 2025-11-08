import { promises as fs } from 'fs';
import path from 'path';
import LawViewerInteractive from '@/components/LawViewerInteractive';
import { LawHero } from '@/components/LawHero';

export const metadata = {
  title: 'Ustav Bosne i Hercegovine - LawViewer izdanje',
  description: 'Kompletan tekst Ustava Bosne i Hercegovine sa jasno označenim člancima i istaknutim Amandmanom I (Brčko distrikt).',
  alternates: {
    canonical: 'https://andric.law/zakoni/ustav-bih',
  },
  openGraph: {
    title: 'Ustav Bosne i Hercegovine - LawViewer izdanje',
    description: 'Kompletan tekst Ustava Bosne i Hercegovine sa jasno označenim člancima i istaknutim Amandmanom I (Brčko distrikt).',
    url: 'https://andric.law/zakoni/ustav-bih',
  },
};

export default async function UstavBiHPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih.txt');
  const amendmentPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih-amandman.txt');

  const [lawContent, amendmentContent] = await Promise.all([
    fs.readFile(lawPath, 'utf-8'),
    fs.readFile(amendmentPath, 'utf-8'),
  ]);

  const articleMatches = lawContent.match(/Član(?:ak)?\s+[A-Z0-9.\-]+/gi);
  const articleCount = articleMatches ? articleMatches.length : 0;
  const amendmentParagraphs = amendmentContent.split('\n').filter((line) => line.trim().length > 0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LawHero
        badge="Andrić Law · Ustav BiH"
        title="Ustav Bosne i Hercegovine – LawViewer izdanje"
        description="Pravno obavezujući tekst iz Aneksa IV sa jasno označenim člancima i eksplicitno izdvojenim Amandmanom I za Brčko distrikt."
        actions={[
          { type: 'link', label: 'Amandman I (Brčko distrikt)', href: '#law-amandmani', variant: 'secondary' },
        ]}
        highlights={[
          { label: 'Službeni glasnik BiH 25/09', description: 'Amandman I – Brčko distrikt' },
          { label: 'Struktura', description: `${articleCount}+ članova · Glave I – XII` },
        ]}
      />

      <section id="law-amandmani" className="mx-auto mt-10 max-w-5xl px-6">
        <details className="group rounded-3xl border border-amber-200/80 bg-amber-50/90 p-6 text-amber-900 shadow-sm">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
            <span>Amandman I na Ustav BiH (Brčko distrikt)</span>
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900 transition group-open:bg-amber-900 group-open:text-amber-50">
              {`Prikaži`}
            </span>
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-amber-950">
            {amendmentParagraphs.map((paragraph, index) => (
              <p key={`amandman-${index}`}>{paragraph}</p>
            ))}
          </div>
        </details>
      </section>

      <LawViewerInteractive
        lawContent={lawContent}
        amendmentContent={amendmentContent}
        gazetteNote="Službeni glasnik BiH: Aneks IV Ustava + Amandman I (25/09)"
      />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Napomena</h2>
          <p className="text-sm leading-relaxed">
            Tekst je pripremljen za LawViewer i služi kao pomoć pri brzom pronalaženju relevantnih ustavnih odredbi. Za službenu upotrebu obavezno se konsultujte sa originalnim objavama u "Službenom glasniku Bosne i Hercegovine".
          </p>
        </div>
      </section>
    </main>
  );
}
