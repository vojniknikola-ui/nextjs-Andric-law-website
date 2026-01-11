import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { contactInfo } from '@/lib/contactInfo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageSquare, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontakt i zakazivanje | Andrić Law',
  description: 'Zakažite pravne konsultacije ili nas kontaktirajte direktno. Advokat Sarajevo za radno pravo, imovinsko-pravne odnose, IT ugovore i privredno pravo.',
  keywords: [
    'kontakt advokat Sarajevo',
    'zakazi konsultacije',
    'advokat Sarajevo kontakt',
    'pravne konsultacije',
    'radno pravo',
    'imovinsko-pravni odnosi',
    'IT ugovori',
    'privredno pravo',
  ],
  alternates: {
    canonical: 'https://andric.law/kontakt',
  },
  openGraph: {
    title: 'Kontakt i zakazivanje | Andrić Law',
    description: 'Zakažite termin ili nas kontaktirajte direktno. Brz odgovor u 24h.',
    type: 'website',
    url: 'https://andric.law/kontakt',
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Kontakt i termin</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Zakažite konsultacije ili nas kontaktirajte odmah
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Advokatski ured Andrić Law iz Sarajeva. Fokusirani na radno pravo, imovinsko-pravne odnose, IT ugovore i privredno pravo.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Clock className="size-4" />
                Odgovor u 24h
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <ShieldCheck className="size-4" />
                100% povjerljivo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <MapPin className="size-4" />
                {contactInfo.addressLine}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Kontakt informacije</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Razgovarajmo o vašem slučaju</h2>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Pišite nam ili nas pozovite. Uvodi poziv traje 15-30 minuta i služi za procjenu vašeg predmeta.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={contactInfo.phoneHref}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <Phone className="size-5 text-slate-200" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Telefon</p>
                      <p className="font-semibold text-slate-100">{contactInfo.phoneDisplay}</p>
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <Mail className="size-5 text-slate-200" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="font-semibold text-slate-100">{contactInfo.email}</p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/38761000000?text=Pozdrav%20Andri%C4%87%20Law%2C%20trebam%20kratke%20konsultacije."
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-4 transition hover:border-[#25D366]/40 hover:bg-[#25D366]/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-[#25D366]/20 flex items-center justify-center">
                      <MessageSquare className="size-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">WhatsApp</p>
                      <p className="font-semibold text-slate-100">Brzi odgovor</p>
                    </div>
                  </div>
                </a>

                <a
                  href={contactInfo.maps.google}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="size-5 text-slate-200" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Lokacija</p>
                      <p className="font-semibold text-slate-100">Sarajevo</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="size-4 text-slate-300" />
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

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mape</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={contactInfo.maps.google}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Google Maps
                    <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href={contactInfo.maps.apple}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Apple Maps
                    <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href={contactInfo.maps.bing}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Bing Maps
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Zakazivanje</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Odaberite termin konsultacija</h2>
                  </div>
                  <a
                    href={contactInfo.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    <Phone className="size-3.5" />
                    Pozovi odmah
                  </a>
                </div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                  <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    Online ili u kancelariji
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    Brza potvrda termina
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    Jasni sljedeći koraci
                  </li>
                </ul>
              </div>

              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
