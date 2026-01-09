import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlossarySection } from '@/components/GlossarySection';

export const metadata: Metadata = {
  title: 'Pravni glosarij | Andrić Law',
  description: 'Pojmovi iz prakse: kratka objašnjenja ključnih pravnih termina na jednom mjestu.',
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <GlossarySection headingLevel="h1" />
      <Footer />
    </main>
  );
}
