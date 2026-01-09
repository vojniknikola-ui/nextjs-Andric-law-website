export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, BookOpen, Tag, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { generateBlogMetadata, generateBlogJsonLd } from '@/lib/blogMetadata';

export const metadata: Metadata = generateBlogMetadata(
  'Osnivanje d.o.o. – praktični koraci i troškovi',
  'Od ideje do registracije: dokumenti, organi društva i najčešće dileme osnivača.',
  'osnivanje-doo-bih',
  '2025-01-03',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=85'
);

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop"
          alt="Osnivanje d.o.o."
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={85}
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
            {['Privredno pravo', 'Osnivanje', 'd.o.o.'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Osnivanje d.o.o. – praktični koraci i troškovi
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
              3. januar 2025.
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              8 min čitanja
            </span>
          </div>

          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <p className="text-lg text-slate-300 leading-relaxed">
              Društvo sa ograničenom odgovornošću (d.o.o.) je najčešći oblik privrednog društva u BiH. Evo kompletnog vodiča kroz proces osnivanja.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4">Osnovni koraci</h2>

            <div className="space-y-6 my-8">
              <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300 text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Priprema dokumentacije</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Odluka o osnivanju / Osnivački akt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Ugovor o osnivanju (ako ima više osnivača)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Dokaz o uplati temeljnog kapitala</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Lične karte osnivača i direktora</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300 text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Minimalni kapital</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-slate-400 mb-1">FBiH</p>
                        <p className="text-2xl font-bold text-zinc-300">1 KM</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-slate-400 mb-1">RS</p>
                        <p className="text-2xl font-bold text-zinc-300">1 KM</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mt-3">
                      <strong>Preporuka:</strong> Realan kapital prema djelatnosti (5.000-10.000 KM)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300 text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Registracija</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Prijava u sudski registar (online ili lično)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Dobijanje JIB-a (automatski)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Registracija za PDV (ako je obavezno)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Otvaranje poslovnog računa</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Organi društva</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-2xl border border-zinc-400/20 bg-zinc-400/5">
                <h3 className="text-xl font-semibold mb-3">Skupština</h3>
                <p className="text-sm text-slate-300 mb-3">
                  Najviše tijelo upravljanja društvom
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Donosi ključne odluke</li>
                  <li>• Bira direktora</li>
                  <li>• Usvaja finansijske izvještaje</li>
                  <li>• Mijenja osnivački akt</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-400/20 bg-zinc-400/5">
                <h3 className="text-xl font-semibold mb-3">Direktor</h3>
                <p className="text-sm text-slate-300 mb-3">
                  Izvršni organ društva
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Zastupa i predstavlja društvo</li>
                  <li>• Vodi poslovanje</li>
                  <li>• Odgovoran za zakonitost rada</li>
                  <li>• Može biti i osnivač</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Troškovi osnivanja</h2>

            <div className="my-8 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-200">Stavka</th>
                    <th className="text-right p-4 text-sm font-semibold text-slate-200">Cijena (KM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 text-sm text-slate-300">Sudska taksa</td>
                    <td className="p-4 text-sm text-slate-300 text-right">100-200</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm text-slate-300">Notarski troškovi</td>
                    <td className="p-4 text-sm text-slate-300 text-right">50-150</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm text-slate-300">Pravne usluge</td>
                    <td className="p-4 text-sm text-slate-300 text-right">300-800</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm text-slate-300">Pečat i štambilj</td>
                    <td className="p-4 text-sm text-slate-300 text-right">50-100</td>
                  </tr>
                  <tr className="bg-zinc-400/5">
                    <td className="p-4 text-sm font-semibold text-slate-200">UKUPNO</td>
                    <td className="p-4 text-sm font-semibold text-slate-200 text-right">500-1.250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Najčešće dileme</h2>

            <div className="space-y-6 my-8">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Koliko osnivača?</h4>
                <p className="text-sm text-slate-300">
                  Može biti jedan ili više osnivača. Različiti udjeli u kapitalu su mogući. Jedan osnivač pojednostavljuje odlučivanje, više osnivača dijeli rizik.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Koja djelatnost?</h4>
                <p className="text-sm text-slate-300">
                  Registrujte sve planirane djelatnosti odmah. Lako se mogu dodavati kasnije, ali košta dodatno. Konsultujte se o šiframa djelatnosti.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Direktor ili ne?</h4>
                <p className="text-sm text-slate-300">
                  Osnivač može biti i direktor (najčešće). Može se angažovati i eksterni direktor. Direktor mora biti fizičko lice.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Koliko traje proces?</h4>
                <p className="text-sm text-slate-300">
                  Sa kompletnom dokumentacijom: 3-7 radnih dana. Online registracija je brža. Hitna procedura je moguća uz dodatnu taksu.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Zaključak</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Osnivanje d.o.o. je relativno jednostavno, ali zahtijeva pažnju na detalje. Dobro pripremljena dokumentacija štedi vrijeme i novac.
            </p>

            <div className="my-8 p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-green-400">Savjet:</strong> Angažujte pravnika za pripremu osnivačkih akata. Greške u dokumentaciji mogu kasnije koštati mnogo više nego inicijalna pravna pomoć.
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
              Osnivate d.o.o.?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Pomažemo vam sa kompletnom dokumentacijom i registracijom. Brzo, jednostavno i bez stresa.
            </p>
            <div className="mt-6">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
              >
                Zakažite konsultacije
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogJsonLd(
            'Osnivanje d.o.o. – praktični koraci i troškovi',
            'Od ideje do registracije: dokumenti, organi društva i najčešće dileme osnivača.',
            '2025-01-03',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=85'
          )),
        }}
      />
    </main>
  );
}
