import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impresum | Andrić Law',
  description: 'Impresum i osnovne informacije o advokatskom uredu Andrić Law.',
};

export default function ImprintPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Pravno</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">Impresum</h1>
            <p className="text-slate-300 mt-4">
              Osnovne informacije o nosiocu web stranice.
            </p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Naziv</h2>
            <p>Andrić Law – advokatski ured</p>

            <h2>Adresa</h2>
            <p>Sarajevo, Bosna i Hercegovina</p>

            <h2>Kontakt</h2>
            <ul>
              <li>Email: office@andric.law</li>
              <li>Telefon: +387 61 000 000</li>
            </ul>

            <h2>Registracija</h2>
            <p>JIB: 4200000000000 • PDV: 200000000000</p>

            <h2>Odgovornost za sadržaj</h2>
            <p>Ulažemo napore da informacije budu tačne i ažurne, ali ne garantujemo potpunost.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
