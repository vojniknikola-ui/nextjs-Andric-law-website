import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Zakažite konsultacije | Andrić Law',
  description: 'Zakažite pravne konsultacije online ili u kancelariji. Advokat Sarajevo za radno pravo, imovinsko-pravne odnose, IT ugovore i privredno pravo.',
  keywords: [
    'zakazi konsultacije',
    'advokat Sarajevo',
    'pravne konsultacije',
    'radno pravo',
    'imovinsko-pravni odnosi',
    'IT ugovori',
    'privredno pravo',
  ],
  alternates: {
    canonical: 'https://andric.law/booking',
  },
  openGraph: {
    title: 'Zakažite konsultacije | Andrić Law',
    description: 'Zakažite termin za pravne konsultacije. Brz odgovor u 24h.',
    type: 'website',
    url: 'https://andric.law/booking',
  },
};

export default function BookingPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Zakazivanje</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Zakažite konsultacije
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Odaberite termin za pravne konsultacije. Online ili u kancelariji - prilagodimo se vašim potrebama.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
