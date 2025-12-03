"use client";

import { useRef } from "react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlossarySection } from '@/components/GlossarySection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import SearchBoxLazy from '@/components/SearchBoxLazy';
import {
  ChevronRight, Clock,
} from "lucide-react";

export default function AndricLawLanding() {
  const kontaktRef = useRef<HTMLElement>(null);

  const scrollToKontakt = () => {
    kontaktRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950">
      <Header onContactClick={scrollToKontakt} />

      <section id="hero" className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="flex flex-col items-center text-center gap-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Clock className="size-3" /> Odgovor u 24h · Pisano mišljenje u 72h
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Pravni partner za <span className="text-zinc-300">biznis u BiH</span>
            </h1>
            <p className="max-w-2xl text-slate-300 text-lg">
              Specijalizirani za radno pravo, IT ugovore i privredno pravo. Stručno, precizno i brzo — bez agresivnog marketinga, sa fokusom na rezultat.
            </p>
            <div className="w-full max-w-2xl mb-4">
              <SearchBoxLazy />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={scrollToKontakt} className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-3 transition">
                Zakaži konsultacije <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
              </button>
              <a href="#usluge" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition">
                Pogledaj usluge
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <AboutSection />

      <GlossarySection />

      <section id="faq" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Česta pitanja</h2>
          <div className="mt-8 space-y-4">
            <Faq q="Da li radite hitne predmete?" a="Da, uz prethodni dogovor i hitni dodatak na tarifu. Procjenu dobijate odmah nakon uvodnog poziva." />
            <Faq q="Da li pišete interne akte (pravilnici, politike)?" a="Da. Uz konzultacije i usklađivanje sa važećim propisima FBiH/RS/Brčko i EU regulativom (GDPR)." />
            <Faq q="Možemo li sve online?" a="Može. Ugovori, sastanci i plaćanja idu digitalno, a originali naknadno po potrebi." />
          </div>
        </div>
      </section>

      <ContactSection ref={kontaktRef} />

      <Footer />
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10 transition">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-6">
          <h3 className="font-semibold">{q}</h3>
          <ChevronRight className="size-4 shrink-0 transition group-open:rotate-90 text-zinc-300" />
        </div>
      </summary>
      <p className="mt-3 text-sm text-slate-300">{a}</p>
    </details>
  );
}
