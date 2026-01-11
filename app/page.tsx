"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import {
  ChevronRight, Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/hero-lawyer-office-7gAa7FO4H3gsBx4ym2BFeuXY1nWq0o.jpg';
const GALLERY_IMAGE_ONE_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/andric-law-office-YzE8kiDlZyAQvDy5IyKTNcddi0lqLU.jpg';
const GALLERY_IMAGE_TWO_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/andric-law-office-alt-y7U1pIT9mru1GYj8FrQNlKxKiectag.jpg';

export default function AndricLawLanding() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950">
      <Header />

      <section id="hero" className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
          <div className="hero-kinetic" aria-hidden="true">
            <span className="hero-kinetic__orbit hero-kinetic__orbit--one" />
            <span className="hero-kinetic__orbit hero-kinetic__orbit--two" />
            <span className="hero-kinetic__orbit hero-kinetic__orbit--three" />
            <span className="hero-kinetic__core" />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:gap-8 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <Clock className="size-3" /> Odgovor u 24h · Pisano mišljenje u 72h
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Pravni partner za <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400">biznis u BiH</span>
              </h1>
              <p className="text-slate-200 text-lg leading-relaxed">
                Specijalizirani za radno pravo, IT ugovore i privredno pravo. Stručno, precizno i brzo — bez agresivnog marketinga, sa fokusom na rezultat. Tekst i elementi su skraćeni radi lakšeg čitanja na mobilnim uređajima.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Zakaži konsultacije <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/usluge"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-white/20 bg-white/5 text-slate-100 font-medium transition-colors hover:bg-white/10 hover:border-white/30"
                >
                  Pogledaj usluge
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                {[
                  '9 premium specijalizacija',
                  'FBiH · RS · Brčko · cross-border',
                  'Jasni rokovi i povjerljivost',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative lg:pl-6">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-10 sm:-inset-12 rounded-[32px] bg-gradient-to-br from-cyan-400/12 via-white/6 to-transparent blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden border border-white/12 bg-gradient-to-b from-slate-900/70 to-slate-950/70 shadow-2xl shadow-slate-950/70">
                  <Image
                    src={HERO_IMAGE_URL}
                    alt="Advokatski ured u modernom poslovnom okruženju"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 42vw, 92vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-white/10" aria-hidden="true" />
                </div>

                <div className="hidden sm:block absolute -left-12 bottom-10 w-44 sm:w-52 lg:w-56 aspect-[5/6] rounded-2xl overflow-hidden border border-white/12 shadow-xl shadow-slate-950/60 bg-slate-900/80">
                  <Image
                    src={GALLERY_IMAGE_ONE_URL}
                    alt="Detalj iz kancelarije Andrić Law"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 15vw, 38vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                </div>

                <div className="hidden sm:block absolute -top-10 right-4 w-36 sm:w-44 lg:w-48 aspect-[3/4] rounded-2xl overflow-hidden border border-white/12 shadow-xl shadow-slate-950/60 bg-slate-900/80">
                  <Image
                    src={GALLERY_IMAGE_TWO_URL}
                    alt="Kancelarija Andrić Law"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 13vw, 34vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-6 right-2 sm:right-4 rounded-2xl border border-white/12 bg-slate-900/90 px-4 py-3 text-xs text-slate-200 shadow-lg shadow-slate-950/70 backdrop-blur">
                  Diskretno. Precizno. Fokusirano na rezultat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <AboutSection />

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

      <Footer />
    </main>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all duration-300 ease-in-out hover:bg-slate-800/50 open:bg-slate-800/60 open:border-slate-600">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
        <h3 className="font-semibold text-slate-100">{q}</h3>
        <ChevronRight className="size-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-90" />
      </summary>
      <p className="mt-4 text-slate-300 leading-relaxed">{a}</p>
    </details>
  );
}
