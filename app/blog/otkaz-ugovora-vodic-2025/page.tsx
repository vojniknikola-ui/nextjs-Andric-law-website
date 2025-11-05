import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, BookOpen, Tag, Share2, ArrowLeft, AlertCircle, CheckCircle2, Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Otkaz ugovora o radu (FBiH & RS) – praktični vodič za 2025',
  description: 'Kompletan pregled pravila o prestanku radnog odnosa otkazom u FBiH i RS, sa ključnim razlikama, rokovima i postupovnim koracima.',
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop"
          alt="Otkaz ugovora o radu"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </div>

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-zinc-300 transition">
              <ArrowLeft className="size-4" />
              Nazad na blog
            </Link>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Radno pravo', 'FBiH', 'RS', 'Vodič 2025'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Otkaz ugovora o radu (FBiH & RS) – praktični vodič za 2025
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-zinc-400/10 border border-zinc-300/20 flex items-center justify-center text-zinc-300 font-semibold">
                AL
              </div>
              <div>
                <p className="text-slate-200 font-medium">Andrić Law</p>
                <p className="text-xs">Advokatski ured</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              Januar 2025.
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              12 min čitanja
            </span>
          </div>

          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <p className="text-lg text-slate-300 leading-relaxed">
              U nastavku je sažet, ali precizan pregled pravila o prestanku radnog odnosa otkazom u Federaciji BiH i Republici Srpskoj, s ključnim razlikama, rokovima i postupovnim koracima – uz upućivanje na konkretne članke važećih zakona i relevantnu sudsku praksu.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Scale className="size-8 text-blue-400" />
              Pravna osnova (trenutno važeće)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">Federacija BiH</h3>
                <p className="text-sm text-slate-300 mb-3">
                  <strong>Zakon o radu</strong> („Sl. novine FBiH" 26/16, 89/18, 23/20 – odluka US, 49/21, 103/21, 44/22 i 39/24)
                </p>
                <a href="https://paragraf.ba" target="_blank" rel="noopener" className="text-sm text-blue-400 hover:text-blue-300 underline">
                  Konsolidovana verzija →
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">Republika Srpska</h3>
                <p className="text-sm text-slate-300 mb-3">
                  <strong>Zakon o radu RS</strong> (konsolidovani tekst)
                </p>
                <a href="https://paragraf.ba" target="_blank" rel="noopener" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                  Konsolidovana verzija →
                </a>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Vrste otkaza i razlozi</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-300">Federacija BiH</h3>
            
            <div className="space-y-4 mb-8">
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <FileText className="size-5 text-blue-400" />
                  Redovni otkaz (uz otkazni rok)
                </h4>
                <p className="text-sm text-slate-300 mb-3">Moguć je zbog:</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Poslovnih razloga</strong> (ekonomski, tehnički, organizacijski)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Nesposobnosti radnika</strong> da izvršava obaveze (samo ako se ne može razumno rasporediti, dokvalifikovati ili prekvalifikovati)</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-400 mt-3">Čl. 96. Zakona o radu FBiH</p>
              </div>

              <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <AlertCircle className="size-5 text-red-400" />
                  Izvanredni otkaz (bez otkaznog roka)
                </h4>
                <p className="text-sm text-slate-300 mb-3">
                  Zbog teže povrede radne obaveze ili težeg prijestupa. Za lakše povrede prethodi pisano upozorenje.
                </p>
                <p className="text-xs text-slate-400">Čl. 97. i 99. Zakona o radu FBiH</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-cyan-300">Republika Srpska</h3>
            
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 mb-8">
              <p className="text-sm text-slate-300 mb-3">
                Razlozi su sistematizovani:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Ekonomski/tehnološki/organizacijski razlozi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Neostvarivanje rezultata rada</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Povreda radne obaveze</span>
                </li>
              </ul>
              <p className="text-xs text-slate-400 mt-3">Čl. 179. Zakona o radu RS</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Postupak prije otkaza</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-300">FBiH</h3>
                
                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Pravo odbrane</h4>
                  <p className="text-sm text-slate-300">
                    Poslodavac mora omogućiti izjašnjenje radnika o navodima kod otkaza zbog ponašanja ili rada.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 101.</p>
                </div>

                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Forma i obrazloženje</h4>
                  <p className="text-sm text-slate-300">
                    Otkaz je pisan i obrazložen, te se uručuje radniku.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 104.</p>
                </div>

                <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Rokovi za izvanredni otkaz</h4>
                  <p className="text-sm text-slate-300">
                    <strong>60 dana</strong> od saznanja za činjenicu, najkasnije <strong>1 godina</strong> od povrede.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 100.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-300">RS</h3>
                
                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Obaveza prethodnog upozorenja</h4>
                  <p className="text-sm text-slate-300">
                    Poslodavac pisano obavještava radnika o razlozima i ostavlja najmanje <strong>8 dana</strong> za odgovor.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 180–181.</p>
                </div>

                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Dostava odluke</h4>
                  <p className="text-sm text-slate-300">
                    Način i učinci dostave su izričito uređeni.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 185.</p>
                </div>

                <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                  <h4 className="font-semibold text-slate-200 mb-2">Rokovi za otkaz</h4>
                  <p className="text-sm text-slate-300">
                    Najkasnije u roku od <strong>3 mjeseca</strong> od saznanja i <strong>6 mjeseci</strong> od nastanka razloga.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Čl. 184.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Otkazni rok</h2>

            <div className="overflow-hidden rounded-2xl border border-white/10 my-8">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-200">Entitet</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-200">Poslodavac otkazuje</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-200">Radnik otkazuje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 text-sm font-medium text-blue-300">FBiH</td>
                    <td className="p-4 text-sm text-slate-300">Min. 14 dana (do 3 mjeseca)</td>
                    <td className="p-4 text-sm text-slate-300">Min. 7 dana</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-medium text-cyan-300">RS</td>
                    <td className="p-4 text-sm text-slate-300">Min. 30 dana</td>
                    <td className="p-4 text-sm text-slate-300">Min. 15 dana</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-400 italic">
              Napomena: Kod probnog rada u FBiH otkazni rok je 7 dana (Čl. 21(3)).
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Otpremnina</h2>

            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 my-8">
              <h3 className="text-xl font-semibold mb-4 text-green-300">Oba entiteta (FBiH i RS)</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Uvjet:</strong> Radnik na neodređeno s najmanje 2 godine staža kod poslodavca</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Iznos:</strong> Minimalno 1/3 prosječne mjesečne plaće za svaku navršenu godinu rada</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Maksimum:</strong> 6 plaća</span>
                </p>
                <p className="flex items-start gap-2">
                  <AlertCircle className="size-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span><strong>Izuzeci:</strong> Kod krivice radnika (teža povreda obaveze)</span>
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-4">FBiH: Čl. 111. | RS: Čl. 194.</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Brzi checklist za poslodavce</h2>

            <div className="space-y-3 my-8">
              {[
                { step: '1', text: 'Dokumentujte razlog (poslovni, radni učinak, povreda obaveza)' },
                { step: '2', text: 'Pozovite radnika na izjašnjenje i omogućite realnu odbranu' },
                { step: '3', text: 'Poštujte rokove za izvanredni otkaz (FBiH: 60 dana/1 god; RS: 3/6 mjeseci)' },
                { step: '4', text: 'Odluku donesite i uručite u pisanoj formi sa obrazloženjem' },
                { step: '5', text: 'Primijenite otkazni rok (FBiH: min. 14 dana; RS: min. 30 dana)' },
                { step: '6', text: 'Obračunajte otpremninu gdje postoji obaveza' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                  <div className="shrink-0 size-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                    {item.step}
                  </div>
                  <p className="text-sm text-slate-300 pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Sudska zaštita i rokovi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">FBiH</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong>Obavezno prethodno obraćanje poslodavcu:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• 30 dana od dostave odluke/saznanja</li>
                    <li>• Ako poslodavac ne udovolji u 30 dana → još 90 dana za tužbu</li>
                  </ul>
                  <p className="text-xs text-slate-400 mt-3">Čl. 114. (izuzetak za novčana potraživanja)</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">RS</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong>Direktan pristup sudu:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Nije uslovljeno prethodnim obraćanjem</li>
                    <li>• Rok za tužbu: najkasnije 6 mjeseci od saznanja/povrede</li>
                  </ul>
                  <p className="text-xs text-slate-400 mt-3">Čl. 201(2), 201(4)</p>
                </div>
              </div>
            </div>

            <div className="my-8 p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300 flex items-center gap-2">
                <AlertCircle className="size-5" />
                Napomena o zabrani diskriminacije
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Svaki otkaz mora poštovati zabranu diskriminacije (npr. po osnovu trudnoće, sindikalnog statusa) i posebne zaštite propisane zakonom. FBiH: čl. 8–12. RS ima ekvivalentna pravila u općem režimu zaštite prava.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Sudska praksa – primjer</h2>

            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent my-8">
              <h3 className="text-lg font-semibold mb-3 text-slate-200">
                Ustavni sud BiH (AP-870/22)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Ustavni sud BiH prihvatio je stav redovnih sudova da se na izvanredni otkaz primjenjuje rok <strong>60 dana/1 godina</strong> iz čl. 100. ZOR FBiH, a ne „15 dana" iz starog propisa.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Potvrđena je i potreba da je radniku omogućeno izjašnjenje u disciplinskom postupku.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Zaključak</h2>

            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <p className="text-slate-300 leading-relaxed mb-4">
                Otkaz ugovora o radu je složen postupak koji zahtijeva precizno poštivanje zakonskih procedura. Razlike između FBiH i RS su značajne, posebno u pogledu rokova i postupka.
              </p>
              <p className="text-slate-300 leading-relaxed">
                <strong>Preporuka:</strong> Konsultujte se sa pravnikom prije donošenja odluke o otkazu kako biste izbjegli skupe sudske sporove i osigurali zakonitost postupka.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Podijelite članak:</p>
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 hover:bg-white/5 transition text-sm">
                <Share2 className="size-4" />
                Podijeli
              </button>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Trebate pravnu pomoć sa otkazom ugovora?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Pomažemo poslodavcima i radnicima u FBiH i RS sa svim aspektima prestanka radnog odnosa.
            </p>
            <div className="mt-6">
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
              >
                Zakažite konsultacije
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
