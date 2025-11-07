import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

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
  const tariffCount = tariffMatches ? tariffMatches.length : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[3fr,2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">
              Andrić Law · Tarife
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 lg:text-5xl">
              Advokatska tarifa Republike Srpske
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Digitalno izdanje službene tarife sa tarifnim brojevima, osnovicama i pravilima obračuna. Idealan alat za brzu provjeru nagrada i naknada u praksi pred sudovima RS.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#law-amandmani"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/40 transition hover:-translate-y-0.5"
              >
                Pregled tarifnih napomena
              </a>
              <a
                href="/laws/advokatska-tarifa-rs.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                download
              >
                Preuzmi PDF
              </a>
              <a
                href="/search?q=advokatska%20tarifa%20rs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Pretraži izmjene
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-700">Status dokumenta</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Važeća tarifa</h2>
            <p className="mt-1 text-slate-600">
              Obuhvaća osnovne i posebne tarifne brojeve, dodatke za putne troškove i pravila o PDV-u.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-600">Tarifni brojevi</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">{tariffCount ?? '30+'}</dd>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-600">Format</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">LawViewer TXT + PDF</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-slate-500">
              Tekst preuzet iz zvanične tarife i konvertovan u pretraživi LawViewer format – dovoljno je ažurirati TXT fajl da bi izmjene bile vidljive na stranici.
            </p>
          </div>
        </div>
      </section>

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
