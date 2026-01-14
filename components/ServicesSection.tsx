'use client';

import { ServiceCard } from './ServiceCard';
import { services } from '@/lib/services';

export function ServicesSection() {
  return (
    <section id="usluge" className="relative py-20 md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300 mb-5">
            <div className="size-2 rounded-full bg-zinc-400 animate-pulse" />
            Specijalizirane pravne usluge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">usluge</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Jasne specijalizacije, sažeti opisi i kratke liste usluga za brzu orijentaciju bez pretrpanosti informacijama.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            Niste sigurni koja usluga vam je potrebna?
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 font-semibold px-8 py-4 transition-colors hover:bg-slate-100"
          >
            Zakažite besplatne konsultacije
          </a>
        </div>
      </div>
    </section>
  );
}
