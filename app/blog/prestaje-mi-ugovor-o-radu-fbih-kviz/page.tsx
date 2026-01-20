export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, BookOpen, Tag, Share2, ArrowLeft, Sparkles } from 'lucide-react';
import { generateBlogMetadata, generateBlogJsonLd } from '@/lib/blogMetadata';
import { EmploymentTerminationQuiz } from '@/components/EmploymentTerminationQuiz';

export const metadata: Metadata = generateBlogMetadata(
  'Prestaje mi ugovor o radu u FBiH – što mi pripada?',
  'Interaktivni kviz/decision tree koji provjerava otkazni rok, otpremninu i prve korake zaštite prava u FBiH.',
  'prestaje-mi-ugovor-o-radu-fbih-kviz',
  '2025-02-20',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop'
);

export default function BlogPost() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop"
          alt="Prestaje mi ugovor o radu u FBiH"
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-zinc-300 transition">
              <ArrowLeft className="size-4" />
              Nazad na blog
            </Link>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Radno pravo', 'FBiH', 'Kviz', 'Otkaz'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Prestaje mi ugovor o radu u FBiH – što mi pripada?
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
              Februar 2025.
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              6 min čitanja
            </span>
          </div>

          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <p className="text-lg text-slate-300 leading-relaxed">
              Ovaj interaktivni kviz je kratka, praktična mapa kroz prestanak ugovora o radu u Federaciji BiH. Cilj je da u 7–12
              klikova dobijete odgovor: da li je prestanak „čist“ ili postoje crvene zastavice, koliki je minimalni otkazni rok i
              imate li pravo na otpremninu.
            </p>

            <div className="my-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
              <p className="text-sm text-blue-100 leading-relaxed">
                <strong className="text-blue-50">Pravna osnova:</strong> Zakon o radu FBiH (prečišćeni tekst, 26/16 i 89/18).
              </p>
            </div>
          </div>

          <div className="mt-10 not-prose">
            <EmploymentTerminationQuiz />
          </div>

          <div className="prose prose-invert prose-slate max-w-none mt-12">
            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Sparkles className="size-7 text-blue-400" />
              Kako koristiti kviz
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li className="ml-4">Krenite od prvog pitanja i birajte tačan scenarij.</li>
              <li className="ml-4">Sistem će označiti crvene zastavice i ključne rokove.</li>
              <li className="ml-4">Ako ispunjavate uslove, dobićete okvirni izračun otpremnine.</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Mermaid dijagram (za dokumentaciju)</h2>
          </div>

          <div className="mt-6 not-prose">
            <details className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <summary className="cursor-pointer text-sm font-semibold text-slate-200">
                Prikaži flowchart kod
              </summary>
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-slate-200">
                <code>{`flowchart TD
  A[Q1: Kako prestaje ugovor?] -->|Poslodavac otkaz| B[Q2: Probni rad?]
  A -->|Radnik otkaz| R1[Q2B: Redovno ili bez roka?]
  A -->|Sporazum| S1[Q2C: Pisani sporazum?]
  A -->|Istek određenog| D1[Q2D: >3 godine bez prekida?]

  B -->|DA| B2[Info: otkazni rok 7 dana]
  B -->|NE| C[Q3: Pisani otkaz?]
  B2 --> C

  C -->|NE| O1[OUT: Formalno sporno]
  C -->|DA| C2[Q4: Obrazložen?]
  C2 -->|NE| O1
  C2 -->|DA| E[Q5: Razlog otkaza]

  E -->|Neopravdan razlog| O4[OUT: Neopravdan razlog]
  E -->|Nejasno| O1
  E -->|Ekonomski/nesposobnost| F[Q6: Otkazni rok?]
  E -->|Disciplinski| G1[Q7: Teža povreda?]

  G1 -->|DA| G2[Q8: Odbrana omogućena?]
  G1 -->|NE| F
  G2 -->|NE| O3[OUT: Izvanredni sporan]
  G2 -->|DA| K[Q9: Rok 60 dana?]
  K --> O3

  F --> H[Q10: Neodređeno?]
  H -->|DA| I[Q11: >=2 godine?]
  H -->|NE| O2[OUT: Rok + otpremnina]
  I -->|DA| J[Q12-Q13: Plata + godine]
  I -->|NE| O2
  J --> O2

  R1 -->|Redovno| R2[Q3B: Rok >=7 dana?]
  R1 -->|Bez roka| R3[OUT: Otkaz bez roka]
  R2 --> O9[OUT: Radnik otkaz]

  S1 -->|NE| O5[OUT: Sporazum nevaljan]
  S1 -->|DA| S2[OUT: Sporazum validan]

  D1 -->|DA| D2[OUT: Pretvara se u neodređeno]
  D1 -->|NE| D3[OUT: Istek ugovora]
  D1 -->|Ne znam| D4[OUT: Provjeriti trajanje]`}</code>
              </pre>
            </details>
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
              Trebate pomoć oko otkaza ugovora o radu?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Pripremamo strategiju, provjeravamo dokumentaciju i vodimo postupak zaštite prava.
            </p>
            <div className="mt-6">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
              >
                Zatražite konsultacije
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
            'Prestaje mi ugovor o radu u FBiH – što mi pripada?',
            'Interaktivni kviz/decision tree koji provjerava otkazni rok, otpremninu i prve korake zaštite prava u FBiH.',
            '2025-02-20',
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop'
          )),
        }}
      />
    </main>
  );
}
