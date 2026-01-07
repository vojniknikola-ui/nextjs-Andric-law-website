'use client';

import { ServiceCard } from './ServiceCard';
import { services } from '@/lib/services';

export function ServicesSection() {
  return (
    <section id="usluge" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-zinc-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-zinc-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
            <div className="size-2 rounded-full bg-zinc-400 animate-pulse" />
            Specijalizirane pravne usluge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">usluge</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Konzistentan pristup i jasna dokumentacija, prilagođeno kompanijama i osnivačima. 
            Fokus na preventivi i smanjenju pravnih rizika.
          </p>
        </div>

        {/* Services Grid */}
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            Niste sigurni koja usluga vam je potrebna?
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Zakažite besplatne konsultacije
          </a>
        </div>
      </div>
    </section>
  );
}
