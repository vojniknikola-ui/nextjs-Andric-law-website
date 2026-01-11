import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GDPR | Andrić Law',
  description: 'Informacije o zaštiti podataka i pravima ispitanika u skladu sa GDPR.',
};

export default function GdprPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Pravno</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">GDPR i zaštita podataka</h1>
            <p className="text-slate-300 mt-4">
              Sažetak prava i obaveza u vezi sa zaštitom ličnih podataka.
            </p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Naš pristup privatnosti</h2>
            <p>Postupamo u skladu sa GDPR principima: zakonitost, transparentnost i minimizacija podataka.</p>

            <h2>Prava ispitanika</h2>
            <ul>
              <li>Pravo na pristup i kopiju podataka.</li>
              <li>Pravo na ispravku netačnih podataka.</li>
              <li>Pravo na brisanje (“pravo na zaborav”) kada su ispunjeni uslovi.</li>
              <li>Pravo na prenosivost podataka.</li>
              <li>Pravo na prigovor na obradu.</li>
            </ul>

            <h2>Sigurnost</h2>
            <p>Primjenjujemo tehničke i organizacione mjere kako bismo zaštitili vaše podatke.</p>

            <h2>Kontakt</h2>
            <p>Za pitanja o GDPR zahtjevima pišite na: office@andric.law.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
