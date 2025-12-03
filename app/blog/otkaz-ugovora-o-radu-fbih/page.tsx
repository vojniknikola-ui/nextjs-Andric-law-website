export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, BookOpen, Tag, Share2, ArrowLeft } from 'lucide-react';
import { generateBlogMetadata, generateBlogJsonLd } from '@/lib/blogMetadata';

export const metadata: Metadata = generateBlogMetadata(
  'Otkaz ugovora o radu – vodič za poslodavce u FBiH',
  'Kratak pregled zakonitih razloga, procedura i tipičnih grešaka koje dovode do sporova. Stručna pravna pomoć za poslodavce u FBiH.',
  'otkaz-ugovora-o-radu-fbih',
  '2025-01-28',
  'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Book%20Lot%20on%20Shelf.jpg'
);

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
        <Image
          src="https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Book%20Lot%20on%20Shelf.jpg"
          alt="Otkaz ugovora o radu"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </div>

      {/* Article */}
      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-zinc-300 transition">
              <ArrowLeft className="size-4" />
              Nazad na blog
            </Link>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Radno pravo', 'HR', 'FBiH'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Otkaz ugovora o radu – vodič za poslodavce u FBiH
          </h1>

          {/* Meta */}
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
              28. januar 2025.
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              7 min čitanja
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <p className="text-lg text-slate-300 leading-relaxed">
              Otkaz ugovora o radu je jedna od najosjetljivijih tema u radnom pravu. Poslodavci moraju biti izuzetno pažljivi jer greške mogu dovesti do skupih sudskih sporova.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-4">Zakoniti razlozi za otkaz</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Prema Zakonu o radu FBiH, poslodavac može otkazati ugovor o radu iz:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
              <li className="ml-4">Poslovnih razloga (tehnološki, ekonomski ili organizacioni)</li>
              <li className="ml-4">Razloga koji se odnose na radnika (nesposobnost, povreda radne obaveze)</li>
            </ul>

            <div className="my-8 p-6 rounded-2xl border border-zinc-400/20 bg-zinc-400/5">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-slate-100">Važno:</strong> Svaki otkaz mora biti obrazložen i mora postojati valjan razlog. Proizvoljni otkaz može biti proglašen ništavim.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Procedura otkaza</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Pravilna procedura je ključna za valjanost otkaza:
            </p>

            <div className="space-y-4 my-6">
              <div className="flex gap-4">
                <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Pisana opomena</h3>
                  <p className="text-slate-300 text-sm">
                    Obavezna za povrede radne discipline. Mora sadržavati opis povrede, datum i potpis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Saslušanje radnika</h3>
                  <p className="text-slate-300 text-sm">
                    Mora se omogućiti odbrana. Zapisnik o saslušanju je obavezan dokument.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Pisano rješenje</h3>
                  <p className="text-slate-300 text-sm">
                    Sa jasnim obrazloženjem razloga i pravnim poukom o mogućnosti žalbe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Otkazni rok</h3>
                  <p className="text-slate-300 text-sm">
                    Minimalno 30 dana, osim kod teških povreda gdje je moguć vanredni otkaz.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Najčešće greške</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Ove greške najčešće dovode do poništaja otkaza:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
              <li className="ml-4"><strong>Nedostatak dokumentacije</strong> – Nema pisanih dokaza o povredi</li>
              <li className="ml-4"><strong>Propuštanje roka</strong> – Otkaz izrečen nakon zakonskog roka</li>
              <li className="ml-4"><strong>Nepoštivanje procedure</strong> – Preskočeno saslušanje radnika</li>
              <li className="ml-4"><strong>Nejasno obrazloženje</strong> – Razlozi nisu konkretno navedeni</li>
            </ul>

            <div className="my-8 p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-red-400">Upozorenje:</strong> Diskriminatorni otkaz (na osnovu pola, rase, religije, trudnoće) je strogo zabranjen i može rezultirati visokim kaznama.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-10 mb-4">Zaključak</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Svaki otkaz mora biti pažljivo pripremljen i dokumentovan. Preporučujemo:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
              <li className="ml-4">Konsultacije sa pravnikom prije donošenja odluke</li>
              <li className="ml-4">Vođenje detaljne dokumentacije o svim povredama</li>
              <li className="ml-4">Poštivanje svih proceduralnih koraka</li>
              <li className="ml-4">Jasno i precizno obrazloženje razloga</li>
            </ul>

            <p className="text-slate-300 leading-relaxed">
              Pravilno sprovedena procedura otkaza štiti poslodavca od sporova i omogućava miran završetak radnog odnosa.
            </p>
          </div>

          {/* Share */}
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

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Trebate pomoć sa otkazom ugovora o radu?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Kontaktirajte nas za stručnu pravnu pomoć. Pomažemo poslodavcima da pravilno sprovedu proceduru otkaza.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogJsonLd(
            'Otkaz ugovora o radu – vodič za poslodavce u FBiH',
            'Kratak pregled zakonitih razloga, procedura i tipičnih grešaka koje dovode do sporova.',
            '2025-01-28',
            'https://sjhnvlvtybo172ko.public.blob.vercel-storage.com/Book%20Lot%20on%20Shelf.jpg'
          )),
        }}
      />
    </main>
  );
}
