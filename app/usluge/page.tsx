import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/lib/services';
import { contactInfo } from '@/lib/contactInfo';

export const metadata: Metadata = {
  title: 'Usluge | Andrić Law',
  description:
    'Najtraženije pravne specijalizacije u BiH: radno, porodično, imovinsko, nasljedno, privredno, porezno, bankarsko, IT/telekom i energetsko pravo. Odgovor u 24h i dokumenti usklađeni sa FBiH/RS/BD propisima.',
  alternates: {
    canonical: 'https://andric.law/usluge',
  },
  openGraph: {
    title: 'Usluge | Andrić Law',
    description: 'Devet premium specijalizacija u BiH na jednom mjestu – brz odgovor, jasne ponude, diskretna isporuka.',
    url: 'https://andric.law/usluge',
    type: 'website',
  },
};

const highlights = [
  { label: 'Praksa', value: '9 specijalizacija', icon: Sparkles },
  { label: 'Odgovor', value: '24h e-mail', icon: Clock },
  { label: 'Geo fokus', value: 'FBiH · RS · BD', icon: ShieldCheck },
];

export default function ServicesPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950"
    >
      <Header contactHref="/kontakt" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-[120vw] w-[120vw] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                Najtraženije specijalizacije
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Najtraženije i najplaćenije pravne specijalizacije u BiH
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Devet premium oblasti: radno, porodično, imovinsko, nasljedno, privredno, porezno, bankarsko, IT/telekom i energetsko pravo. Odgovor u 24h, pisano mišljenje u 72h i dokumenti usklađeni sa FBiH/RS/BD propisima.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Zakaži konsultacije
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
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <CheckCircle2 className="size-3" />
                  Odgovor u 24h
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <ShieldCheck className="size-3" />
                  Diskretan pristup
                </span>
              </div>
            </div>

            <div className="grid w-full max-w-xl grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-100">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Odgovor na upit u 24h i pisano mišljenje u 72h.',
              'Dokumentacija usklađena sa propisima FBiH/RS/Brčko i sektorom.',
              '100% povjerljivo: brzi uvid u situaciju i jasni rokovi realizacije.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Ponuda</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Sve usluge na jednom mjestu
              </h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                Premium isporuka, jasni dokumenti i struktura koja prolazi i interne audite i regulatorne provjere.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <ShieldCheck className="size-4 text-cyan-300" />
              Transparentna ponuda prije starta.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                href={`/usluge/${service.slug}`}
                icon={<service.icon className="size-6" />}
                title={service.title}
                description={service.description}
                items={service.items}
                featured={service.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Kako radimo</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Proces bez iznenađenja</h2>
            <p className="text-slate-300 leading-relaxed">
              Brief, ponuda, dokumenti i follow-up. Jasna vlasništva nad akcijama i komunikacijom, sa jednim kontaktom koji prati predmet do kraja.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Kick-off', desc: '15-30 min poziv, uzimanje brifa, mapiranje rizika.' },
                { title: 'Ponuda', desc: 'Fiksni ili blok-sat model sa terminima i deliverables.' },
                { title: 'Isporuka', desc: 'Dokumenti i komentari u roku, iteracije ako trebaju.' },
                { title: 'Follow-up', desc: 'Podrška na pregovorima i implementaciji.' },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs text-slate-400 mb-2">Korak {index + 1}</div>
                  <p className="font-semibold text-slate-200">{item.title}</p>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 shadow-xl shadow-slate-950/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-200">
                <Phone className="size-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Kontakt</p>
                <p className="text-lg font-semibold text-slate-100">Zakažite termin</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Besplatne inicijalne konsultacije i jasna ponuda u roku od 24h. Online ili uživo.
            </p>
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
