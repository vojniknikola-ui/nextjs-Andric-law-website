'use client';

import { ServiceCard } from './ServiceCard';
import { services } from '@/lib/services';

export function ServicesSection() {
  return (
    <section id="usluge" className="relative py-24 md:py-32 bg-slate-50">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4">
            Naše usluge
          </h2>
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

        <div className="mt-16 text-center">
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 text-white font-semibold px-8 py-4 transition-all hover:bg-slate-800 hover:scale-105"
          >
            Zakažite konsultacije
          </a>
        </div>
      </div>
    </section>
  );
}
