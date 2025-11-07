import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

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
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[3fr,2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
              Andrić Law · Ustav BiH
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 lg:text-5xl">
              Ustav Bosne i Hercegovine – LawViewer izdanje
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Potpuno pretraživ prikaz osnovnog ustavnog akta BiH sa jasno označenim člancima, sidrima za svaki paragraf i eksplicitno izdvojenim Amandmanom I za Brčko distrikt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#amandman-i"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5"
              >
                Amandman I (Brčko distrikt)
              </a>
              <a
                href="#clan-vi-4"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Skoči na član VI.4
              </a>
              <a
                href="/laws/ustav-bih.txt"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                download
              >
                Preuzmi TXT
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Automatska sidra</p>
                <p className="mt-2 text-base font-semibold text-slate-900">Članovi I – XII</p>
                <p className="text-slate-600">Klikom otvarate tačan član bez ručnog skrolanja.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Historijat izmjena</p>
                <p className="mt-2 text-base font-semibold text-slate-900">Amandman I integriran</p>
                <p className="text-slate-600">Brčko distrikt vidljiv kao posebna kartica i u LawViewer-u.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">Status dokumenta</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">{articleCount}+ članova</h2>
            <p className="mt-1 text-slate-600">
              Kompletan tekst iz Aneksa IV Općeg okvirnog sporazuma + Amandman I ("Službeni glasnik BiH", br. 25/09).
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">Glave</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">11 struktura</dd>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">Brčko distrikt</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">Amandman I</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-slate-500">
              Formatirano kroz LawViewer – nema ručnog HTML uređivanja, dovoljno je dodati TXT/MD fajl u <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-[11px]">/public/laws</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="amandman-i" className="mx-auto mt-10 max-w-5xl px-6">
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

      <LawViewer lawContent={lawContent} amendmentContent={amendmentContent} />

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
