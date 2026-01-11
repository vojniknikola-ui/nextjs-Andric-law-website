import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle2, Clock, ShieldCheck, Users, Phone, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';
import { contactInfo } from '@/lib/contactInfo';

export const metadata: Metadata = {
  title: 'O nama | Andrić Law',
  description:
    'Andrić Law vodi Nikola Andrić, advokat sa 15+ godina iskustva u radnom pravu, IT ugovorima i privrednom pravu. Diskretan, precizan i fokusiran na rezultat.',
  alternates: {
    canonical: 'https://andric.law/o-nama',
  },
  openGraph: {
    title: 'O nama | Andrić Law',
    description: 'Upoznajte način rada Andrić Law kancelarije i Nikolu Andrića, advokata specijaliziranog za radno i IT pravo.',
    url: 'https://andric.law/o-nama',
    type: 'website',
  },
};

const valuePillars = [
  { title: 'Preciznost dokumentacije', desc: 'Ugovori i akti koji izdrže regulatorni i board review.', icon: CheckCircle2 },
  { title: 'Brza isporuka', desc: '24h inicijalni odgovor, 72h pisano mišljenje.', icon: Clock },
  { title: 'Diskretno partnerstvo', desc: 'Jedan kontakt koji vodi predmet od početka do kraja.', icon: ShieldCheck },
  { title: 'Fokus na biznis', desc: 'Pravni savjet preveden na operativne korake bez žargona.', icon: Users },
];

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950"
    >
      <Header contactHref="/kontakt" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[120vw] w-[120vw] rounded-full bg-cyan-500/6 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[-10%] h-[38rem] w-[38rem] rounded-full bg-blue-500/12 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-[1.1fr,0.9fr] gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              O nama
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Kancelarija koja izgleda korporativno, ali radi startup-brzino
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Andrić Law vodi Nikola Andrić, advokat specijaliziran za radno pravo, IT ugovore i privredno pravo. Kombinujemo procesnu disciplinu sa direktnom, jasnom komunikacijom.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Award className="size-4" />
                15+ godina prakse
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Clock className="size-4" />
                Odgovor u 24h
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <ShieldCheck className="size-4" />
                Povjerljivo i precizno
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Zakaži razgovor
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/15 bg-white/5 text-slate-100 font-medium transition-colors hover:bg-white/10 hover:border-white/25"
              >
                <Phone className="size-4" />
                {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {valuePillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-200">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="py-16 md:py-24 border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Metodologija</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kako izgleda saradnja</h2>
            <p className="text-slate-300 leading-relaxed">
              Standardizovani koraci koji čuvaju brzinu i kvalitet: brif, ponuda, dokumenti, follow-up. Jasno vlasništvo nad akcijama, bez gubljenja vremena.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Kick-off: 15-30 min poziv, mapiranje rizika i ciljeva.',
                'Ponuda: fiksna cijena ili blok sati sa rokovima i deliverables.',
                'Dokumenti: draft + dvije iteracije u skladu sa rokovima.',
                'Follow-up: podrška na pregovorima i implementaciji.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-200 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 shadow-xl shadow-slate-950/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-200">
                <Users className="size-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Klijenti</p>
                <p className="text-lg font-semibold text-slate-100">Startup, IT, SME</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Radimo sa osnivačima, IT timovima, startupima i SME kompanijama koje trebaju partnera koji razumije i pravni i biznis kontekst.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Industrije</p>
                <p className="font-semibold text-slate-100 mt-1">Tech, eCommerce, usluge</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Teritorija</p>
                <p className="font-semibold text-slate-100 mt-1">BiH · EU projekti</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-3 transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Pošalji upit
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 transition"
              >
                <Phone className="size-4" />
                {contactInfo.phoneDisplay}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="size-4" />
              Radno vrijeme: 09-17h
            </div>
          </div>
        </div>
      </section>

      <Footer contactHref="/kontakt" />
    </main>
  );
}
