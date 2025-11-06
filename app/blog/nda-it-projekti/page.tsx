import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, BookOpen, Tag, Share2, ArrowLeft, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NDA u IT projektima – šta mora da sadrži',
  description: 'Ključne klauzule povjerljivosti, rokovi i odnos prema autorskim pravima i GDPR-u.',
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop"
          alt="NDA u IT projektima"
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
            {['Ugovori', 'IT', 'GDPR'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            NDA u IT projektima – šta mora da sadrži
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
              18. januar 2025.
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              6 min čitanja
            </span>
          </div>

          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <p className="text-lg text-slate-300 leading-relaxed">
              Non-Disclosure Agreement (NDA) ili ugovor o povjerljivosti je ključan dokument u IT industriji gdje se razmjenjuju osjetljive informacije.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4">Osnovni elementi NDA</h2>

            <h3 className="text-2xl font-semibold mt-6 mb-3">1. Definicija povjerljivih informacija</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Ključno je precizno definisati šta se smatra povjerljivom informacijom:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Izvorni kod i tehnička dokumentacija',
                'Poslovni planovi i strategije',
                'Klijentske liste i baze podataka',
                'Know-how i poslovne tajne',
                'Finansijski podaci i projekcije'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <div className="shrink-0 mt-1">
                    <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center">
                      <Check className="size-3 text-zinc-400" />
                    </div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">2. Obaveze primatelja</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              NDA mora jasno definisati obaveze strane koja prima povjerljive informacije:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
              <li className="ml-4">Čuvanje tajnosti i neobjavljivanje trećim licima</li>
              <li className="ml-4">Ograničenje korištenja samo za dogovorenu svrhu</li>
              <li className="ml-4">Zaštita od neovlaštenog pristupa (tehnička i organizaciona)</li>
              <li className="ml-4">Vraćanje ili uništavanje podataka nakon završetka saradnje</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">3. Izuzeci od povjerljivosti</h3>
            <div className="my-6 p-6 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Standardni izuzeci koji se obično uključuju u NDA:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                <li className="ml-4">Javno dostupne informacije (bez krivice primaoca)</li>
                <li className="ml-4">Nezavisno razvijene informacije</li>
                <li className="ml-4">Informacije dobijene od treće strane bez obaveze povjerljivosti</li>
                <li className="ml-4">Zakonske obaveze objavljivanja (sudski nalog, regulativa)</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Odnos prema GDPR-u</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Kada NDA uključuje lične podatke, mora biti usklađen sa GDPR-om:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">DPA klauzule</h4>
                <p className="text-sm text-slate-300">
                  Data Processing Agreement mora biti dio NDA-a ako se obrađuju lični podaci.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Obaveze procesora</h4>
                <p className="text-sm text-slate-300">
                  Jasno definisane obaveze u vezi sa obradom, čuvanjem i brisanjem podataka.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Prava subjekata</h4>
                <p className="text-sm text-slate-300">
                  Mehanizmi za ostvarivanje prava pristupa, ispravke i brisanja podataka.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <h4 className="font-semibold text-slate-200 mb-2">Sigurnosne mjere</h4>
                <p className="text-sm text-slate-300">
                  Tehnička i organizaciona zaštita ličnih podataka prema GDPR standardima.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Trajanje i kazne</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Ključni elementi vezani za trajanje i posljedice povrede:
            </p>

            <div className="space-y-4 my-6">
              <div className="p-5 rounded-xl border border-zinc-400/20 bg-zinc-400/5">
                <h4 className="font-semibold text-slate-200 mb-2">Trajanje obaveze</h4>
                <p className="text-sm text-slate-300">
                  Tipično 2-5 godina nakon završetka saradnje. Za poslovne tajne može biti neograničeno.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-zinc-400/20 bg-zinc-400/5">
                <h4 className="font-semibold text-slate-200 mb-2">Ugovorne kazne</h4>
                <p className="text-sm text-slate-300">
                  Fiksni iznos za svaku povredu (npr. 10.000-50.000 EUR) ili procenat od vrijednosti projekta.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-zinc-400/20 bg-zinc-400/5">
                <h4 className="font-semibold text-slate-200 mb-2">Naknada štete</h4>
                <p className="text-sm text-slate-300">
                  Pravo na punu naknadu stvarne štete, nezavisno od ugovorne kazne.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Preporuke</h2>
            <div className="my-6 p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Prilagodite NDA</strong> specifičnom projektu i industriji</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Konsultujte pravnika</strong> prije potpisivanja</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Dokumentujte</strong> sve razmjene povjerljivih informacija</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-5 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>Obučite tim</strong> o obavezama povjerljivosti</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Dobro napisan NDA je osnova za sigurnu saradnju u IT projektima i ključan je za zaštitu vaših poslovnih tajni i intelektualnog vlasništva.
            </p>
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
              Trebate pomoć sa NDA ugovorom?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Pripremamo NDA ugovore prilagođene IT industriji sa svim potrebnim klauzulama.
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
