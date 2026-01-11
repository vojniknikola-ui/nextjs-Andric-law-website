import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Zakaži konsultacije | Andrić Law',
  description: 'Zakažite pravne konsultacije online ili u našoj kancelariji. Brzo i jednostavno.',
};

export default function BookingPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />
      
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Zakaži konsultacije
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Izaberite način konsultacija i zakažite termin koji vam odgovara
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}