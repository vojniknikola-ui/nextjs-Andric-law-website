"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import {
  ChevronRight, Clock,
} from "lucide-react";
import Link from "next/link";

const HERO_IMAGE_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/hero-lawyer-office-7gAa7FO4H3gsBx4ym2BFeuXY1nWq0o.jpg';
const HOMEPAGE_BG_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/Andric%20Law%20Advokatska%20Kancelarija%20Sarajevo%20.jpg';

export default function AndricLawLanding() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950"
    >
      <Header />

      <section id="hero" className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${HOMEPAGE_BG_URL})` }}
          />
          <div className="absolute inset-0 bg-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
          <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-slate-300 mb-8">
                <Clock className="size-4" /> Odgovor u 24h
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
                Pravni partner za
                <span className="block text-white mt-2">biznis u BiH</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-10">
                Pravna podrška za biznis i pojedince
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-semibold px-8 py-4 text-lg transition-all duration-200 hover:bg-slate-100 hover:scale-105"
                >
                  Zakaži konsultacije <ChevronRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/usluge"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg border border-white/30 bg-transparent text-white font-medium transition-all duration-200 hover:bg-white/10 hover:border-white/50"
                >
                  Pogledaj usluge
                </Link>
              </div>
            </div>
        </div>
      </section>

      <ServicesSection />

      <AboutSection />

      <section id="faq" className="py-24 md:py-32 bg-white text-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Česta pitanja</h2>
            <p className="text-lg text-slate-600">Brzi odgovori na najvažnija pitanja</p>
          </div>
          <div className="space-y-3">
            <Faq q="Da li radite hitne predmete?" a="Da, uz prethodni dogovor." />
            <Faq q="Da li pišete interne akte?" a="Da, pravilnike i politike usklađene sa propisima." />
            <Faq q="Možemo li sve online?" a="Može. Ugovori, sastanci i plaćanja digitalno." />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-sm open:border-slate-300 open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
        <h3 className="font-semibold text-slate-950 text-lg">{q}</h3>
        <ChevronRight className="size-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <p className="mt-4 text-slate-600 leading-relaxed">{a}</p>
    </details>
  );
}
