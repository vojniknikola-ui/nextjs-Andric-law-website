'use client';

import { Phone, Mail, MapPin, MessageSquare, Clock, Send, Shield } from 'lucide-react';
import { forwardRef } from 'react';
import { contactInfo } from '@/lib/contactInfo';

type ContactSectionProps = {
  defaultService?: string;
};

export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(({ defaultService }, ref) => {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.addressLine)}`;

  return (
    <section id="kontakt" ref={ref} className="py-20 md:py-28 bg-slate-950/40 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
              <MessageSquare className="size-4" />
              Kontaktirajte nas
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Zakažite <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">besplatne</span> konsultacije
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Javite se za uvodni poziv (15-30 min). Bez obaveze. Odgovaramo u roku od 24h.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              <a 
                href={contactInfo.phoneHref}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="size-5 text-zinc-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-1">Telefon</p>
                  <p className="font-semibold text-slate-200">{contactInfo.phoneDisplay}</p>
                </div>
              </a>

              <a 
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="size-5 text-zinc-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-1">Email</p>
                  <p className="font-semibold text-slate-200">{contactInfo.email}</p>
                </div>
              </a>

              <a 
                href="https://wa.me/38761000000?text=Pozdrav%20Andrić%20Law%2C%20trebam%20kratke%20konsultacije."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all"
              >
                <div className="size-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="size-5 text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-1">WhatsApp</p>
                  <p className="font-semibold text-slate-200">Brzi odgovor</p>
                </div>
              </a>

              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="size-12 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="size-5 text-zinc-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-1">Lokacija</p>
                  <p className="font-semibold text-slate-200">{contactInfo.addressLine}</p>
                </div>
              </a>
            </div>

            {/* Working Hours */}
            <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="size-5 text-zinc-300" />
                <h3 className="font-semibold text-slate-200">Radno vrijeme</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Pon - Pet</span>
                  <span className="font-medium">09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Subota</span>
                  <span className="font-medium">Po dogovoru</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Nedjelja</span>
                  <span>Zatvoreno</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400 flex items-center gap-2">
              <Shield className="size-4" />
              Povjerljivo. Podatke koristimo samo radi povratnog kontakta.
            </p>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-7">
            <form className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="ime" className="text-sm font-medium text-slate-200">
                    Ime i prezime *
                  </label>
                  <input
                    id="ime"
                    name="ime"
                    required
                    placeholder="Vaše ime"
                    className="w-full h-12 rounded-xl bg-slate-900/60 border border-white/10 px-4 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-zinc-400/60 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-200">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="vas@email.com"
                    className="w-full h-12 rounded-xl bg-slate-900/60 border border-white/10 px-4 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-zinc-400/60 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="telefon" className="text-sm font-medium text-slate-200">
                    Telefon
                  </label>
                  <input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    placeholder="+387 6X XXX XXX"
                    className="w-full h-12 rounded-xl bg-slate-900/60 border border-white/10 px-4 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-zinc-400/60 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="usluga" className="text-sm font-medium text-slate-200">
                    Usluga
                  </label>
                  <select
                    id="usluga"
                    name="usluga"
                    defaultValue={defaultService ?? ''}
                    className="w-full h-12 rounded-xl bg-slate-900/60 border border-white/10 px-4 text-slate-100 outline-none focus:ring-2 focus:ring-zinc-400/60 transition"
                  >
                    <option value="">Izaberite uslugu</option>
                    <option value="radno">Radno pravo</option>
                    <option value="ugovori">Ugovori i IT</option>
                    <option value="privreda">Privredno pravo</option>
                    <option value="sporovi">Sporovi i zastupanje</option>
                    <option value="compliance">Compliance i HR</option>
                    <option value="ip">Intelektualno vlasništvo</option>
                    <option value="ostalo">Ostalo</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="tema" className="text-sm font-medium text-slate-200">
                    Tema
                  </label>
                  <input
                    id="tema"
                    name="tema"
                    placeholder="Npr. Otkaz ugovora o radu / NDA / Osnivanje društva"
                    className="w-full h-12 rounded-xl bg-slate-900/60 border border-white/10 px-4 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-zinc-400/60 transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="poruka" className="text-sm font-medium text-slate-200">
                    Poruka *
                  </label>
                  <textarea
                    id="poruka"
                    name="poruka"
                    rows={5}
                    required
                    placeholder="Opišite ukratko vašu situaciju..."
                    className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-zinc-400/60 transition resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-400 flex items-start gap-2">
                  <Shield className="size-4 shrink-0 mt-0.5" />
                  <span>
                    Slanjem forme prihvatate našu{' '}
                    <a href="/politika-privatnosti" className="underline hover:text-zinc-300">
                      politiku privatnosti
                    </a>
                  </span>
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  Pošalji upit
                  <Send className="size-4" />
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                Odgovor u 24h
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <Shield className="size-3" />
                100% povjerljivo
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <Clock className="size-3" />
                Besplatne konsultacije
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
