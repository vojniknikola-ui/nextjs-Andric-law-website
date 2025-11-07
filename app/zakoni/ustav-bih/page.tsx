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

const AMENDMENT_TEXT = `U Ustavu Bosne i Hercegovine iza člana VI.3. dodaje se novi član VI.4. koji glasi:
"Brčko Distrikt Bosne i Hercegovine, koji postoji pod suverenitetom Bosne i Hercegovine i spada pod nadležnosti institucija Bosne i Hercegovine onako kako te nadležnosti proizilaze iz ovog ustava, čija je teritorija u zajedničkoj svojini (kondominiju) entiteta, jedinica je lokalne samouprave s vlastitim institucijama, zakonima i propisima i s ovlaštenjima i statusom konačno propisanim odlukama Arbitražnog tribunala za spor u vezi s međuentitetskom linijom razgraničenja u oblasti Brčkog. Odnos između Brčko Distrikta Bosne i Hercegovine i institucija Bosne i Hercegovine i entiteta može se dalje urediti zakonom koji donosi Parlamentarna skupština Bosne i Hercegovine."
"Ustavni sud Bosne i Hercegovine nadležan je da odlučuje o bilo kakvom sporu u vezi sa zaštitom utvrđenog statusa i ovlaštenja Brčko Distrikta Bosne i Hercegovine koji se može javiti između jednog ili više entiteta i Brčko Distrikta Bosne i Hercegovine ili između Bosne i Hercegovine i Brčko Distrikta Bosne i Hercegovine po ovom ustavu i odlukama Arbitražnog tribunala."
"Svaki takav spor također može pokrenuti većina poslanika u Skupštini Brčko Distrikta Bosne i Hercegovine koja uključuje najmanje jednu petinu izabranih poslanika iz reda svakog od konstitutivnih naroda."
"Dosadašnji član VI.4. postaje član VI.5."
Amandman I stupa na snagu osmog dana od objavljivanja u "Službenom glasniku BiH", broj 25/09.`;

export default async function UstavBiHPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih.txt');
  const amendmentPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih-amandman.txt');
  
  const lawContent = await fs.readFile(lawPath, 'utf-8');
  const amendmentContent = await fs.readFile(amendmentPath, 'utf-8');

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-black via-slate-900 to-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Andrić Law · LawViewer
            </span>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Ustav Bosne i Hercegovine
              </h1>
              <p className="mt-4 text-lg text-white/85">
                Službeni tekst sa jasno označenim člancima i istaknutim Amandmanom I (Brčko distrikt).
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#amandman-i"
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-900/40 hover:opacity-90"
              >
                Otvori Amandman I (Brčko distrikt)
              </a>
              <a
                href="#clan-vi-4"
                className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Skoči na član VI.4
              </a>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300">Status</p>
              <p className="mt-2 font-semibold">Važeći tekst + Amandman I</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300">Objava</p>
              <p className="mt-2 font-semibold">"Službeni glasnik BiH", br. 25/09</p>
            </div>
          </div>
        </div>
      </section>

      <section id="amandman-i" className="max-w-5xl mx-auto px-6 mt-10">
        <details className="group rounded-3xl border border-amber-200/60 bg-amber-50/90 p-6 text-amber-900 shadow-sm">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
            <span>Amandman I na Ustav BiH (Brčko distrikt)</span>
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900 group-open:bg-amber-900 group-open:text-amber-50">
              Prikaži
            </span>
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-amber-950">
            {AMENDMENT_TEXT.split('\n').map((paragraph, index) => (
              <p key={`amandman-${index}`}>{paragraph}</p>
            ))}
          </div>
        </details>
      </section>

      <LawViewer lawContent={lawContent} amendmentContent={amendmentContent} />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Napomena</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Tekst je pripremljen za LawViewer i služi kao pomoć pri brzom pronalaženju relevantnih ustavnih odredbi. Za službenu upotrebu obavezno se konsultujte sa originalnim objavama u "Službenom glasniku Bosne i Hercegovine".
          </p>
        </div>
      </section>
    </main>
  );
}
