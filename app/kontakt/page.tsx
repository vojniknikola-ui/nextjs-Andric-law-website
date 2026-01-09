import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { contactInfo } from '@/lib/contactInfo';

export const metadata: Metadata = {
  title: 'Kontakt | Andrić Law',
  description: 'Kontaktirajte Andrić Law za pravne konsultacije. Odgovor u 24h.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <section className="border-b border-white/10 bg-slate-900/60 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Kontakt</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Andrić Law – razgovarajmo o vašem slučaju
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Telefon: {contactInfo.phoneDisplay} · Email: {contactInfo.email} · {contactInfo.addressLine}
          </p>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}
