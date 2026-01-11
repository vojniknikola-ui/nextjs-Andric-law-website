import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { getServiceBySlug, services } from '@/lib/services';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Usluga nije pronađena',
    };
  }

  const canonicalUrl = `https://andric.law/usluge/${service.slug}`;

  return {
    title: `${service.title} | Andrić Law`,
    description: service.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} | Andrić Law`,
      description: service.description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Andrić Law - ${service.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Andrić Law`,
      description: service.description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const Icon = service.icon;

  const processSteps = [
    { step: '1', title: 'Inicijalni poziv', desc: 'Besplatne konsultacije (15-30 min).' },
    { step: '2', title: 'Ponuda', desc: 'Jasna cijena i rokovi u pisanoj formi.' },
    { step: '3', title: 'Izrada', desc: 'Priprema dokumentacije i pravnih akata.' },
    { step: '4', title: 'Isporuka', desc: 'Finalni dokumenti + follow-up podrška.' },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100 selection:bg-zinc-300/30 selection:text-zinc-950">
      <Header contactHref="/kontakt" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-zinc-500/5 blur-3xl" />
          <div className="absolute top-16 right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/#usluge" className="hover:text-zinc-300 transition">
              Usluge
            </Link>
            <ChevronRight className="size-4" />
            <span className="text-slate-200">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 mb-6">
                <span className="size-2 rounded-full bg-zinc-400 animate-pulse" />
                Specijalizirana pravna usluga
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-zinc-400/20 to-zinc-500/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300">
                  <Icon className="size-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {service.title}
                </h1>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 text-slate-300">
                {service.details.lead}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <Clock className="size-3" />
                  Odgovor u 24h
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <ShieldCheck className="size-3" />
                  100% povjerljivo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <Check className="size-3" />
                  Jasni rokovi
                </span>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-11 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Brzi pregled</p>
                  <p className="text-lg font-semibold text-slate-100">
                    {service.title}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="shrink-0 mt-0.5">
                      <div className="size-6 rounded-lg bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center">
                        <Check className="size-3.5 text-zinc-300" />
                      </div>
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <a
                href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-3 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  Zatraži ponudu
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="tel:+38761000000"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 border border-white/10 hover:bg-white/5 transition text-sm font-medium"
                >
                  <Phone className="size-4" />
                  Pozovi odmah
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Besplatne inicijalne konsultacije (15-30 min).
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ključne aktivnosti
              </h2>
              <p className="text-slate-300 mt-3">
                Fokus na jasno definisane korake i dokumentaciju bez sivih zona.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {service.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300">
                        <Check className="size-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-200 leading-snug">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Šta dobijate
              </h2>
              <p className="text-slate-300 mt-3">
                Konkretne preporuke, precizne ugovore i podršku kroz cijeli proces.
              </p>
              <ul className="mt-6 space-y-4">
                {service.details.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-4">
                    <div className="size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300 shrink-0">
                      <Check className="size-4" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
              <h3 className="text-lg font-semibold text-slate-200">
                Proces saradnje
              </h3>
              <div className="mt-6 space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-slate-200 mb-1">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-slate-200">
                Zašto Andrić Law
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-4 text-zinc-300 mt-0.5" />
                  Jasne preporuke i dokumentacija usklađena sa FBiH/RS.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-zinc-300 mt-0.5" />
                  Transparentna ponuda i mjerljivi rokovi isporuke.
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="size-4 text-zinc-300 mt-0.5" />
                  Brz feedback i pragmatičan pristup rješavanju rizika.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-slate-400">Povezane usluge</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Istražite i ostale oblasti
              </h2>
            </div>
            <Link
              href="/#usluge"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-zinc-200 transition"
            >
              Sve usluge
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((item) => {
              const RelatedIcon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/usluge/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-11 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300">
                      <RelatedIcon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-300">
                    Saznaj više
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection defaultService={service.key} />

      <Footer contactHref="/kontakt" />
    </main>
  );
}
