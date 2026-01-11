import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Uslovi korištenja | Andrić Law',
  description: 'Uslovi korištenja web stranice Andrić Law.',
};

export default function TermsOfUsePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Pravno</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">Uslovi korištenja</h1>
            <p className="text-slate-300 mt-4">
              Korištenjem ove web stranice prihvatate sljedeće uslove.
            </p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Informacije nisu pravni savjet</h2>
            <p>Sadržaj na web stranici je informativan i ne predstavlja pravni savjet.</p>

            <h2>Korištenje sadržaja</h2>
            <p>Dozvoljeno je dijeljenje uz navođenje izvora. Nije dozvoljeno komercijalno korištenje bez pisane saglasnosti.</p>

            <h2>Ograničenje odgovornosti</h2>
            <p>Ne odgovaramo za štetu nastalu oslanjanjem na sadržaj bez stručne konsultacije.</p>

            <h2>Vanjski linkovi</h2>
            <p>Web stranica može sadržavati linkove ka trećim stranama. Ne odgovaramo za njihov sadržaj.</p>

            <h2>Izmjene uslova</h2>
            <p>Zadržavamo pravo izmjene ovih uslova bez prethodne najave.</p>

            <h2>Kontakt</h2>
            <p>Za pitanja o uslovima korištenja pišite na: office@andric.law.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
