import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';

interface FooterProps {
  contactHref?: string;
}

export function Footer({ contactHref }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const resolvedContactHref = contactHref ?? '/#kontakt';

  const footerLinks = {
    usluge: services.map((service) => ({
      name: service.title,
      href: `/usluge/${service.slug}`,
    })),
    resursi: [
      { name: 'Blog', href: '/blog' },
      { name: 'Pravni glosarij', href: '/#glosarij' },
      { name: 'O nama', href: '/#o-nama' },
      { name: 'Kontakt', href: resolvedContactHref },
    ],
    pravno: [
      { name: 'Politika privatnosti', href: '/politika-privatnosti' },
      { name: 'Uslovi korištenja', href: '/uslovi-koristenja' },
      { name: 'Impresum', href: '/impresum' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="size-12 rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-500 flex items-center justify-center font-bold text-slate-950 group-hover:scale-105 transition-transform">
                AL
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight text-slate-100">
                  ANDRIĆ LAW
                </div>
                <div className="text-xs text-slate-400 -mt-0.5">
                  Advokatski ured
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Specijalizirani za radno pravo, IT ugovore i privredno pravo. Pružamo stručne pravne usluge kompanijama i osnivačima u BiH.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="tel:+38761000000" 
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-zinc-300 transition group"
              >
                <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition">
                  <Phone className="size-4" />
                </div>
                <span>+387 61 000 000</span>
              </a>
              <a 
                href="mailto:office@andric.law" 
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-zinc-300 transition group"
              >
                <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition">
                  <Mail className="size-4" />
                </div>
                <span>office@andric.law</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="size-4" />
                </div>
                <span>Sarajevo, Bosna i Hercegovina</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Usluge
            </h3>
            <ul className="space-y-3">
              {footerLinks.usluge.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-zinc-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Resursi
            </h3>
            <ul className="space-y-3">
              {footerLinks.resursi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-zinc-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Pravne informacije
            </h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.pravno.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-zinc-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <span className="size-2 rounded-full bg-green-500" />
                Licencirani advokat
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <span className="size-2 rounded-full bg-blue-500" />
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
              <p>© {currentYear} Andrić Law. Sva prava zadržana.</p>
              <span className="hidden md:inline text-slate-600">|</span>
              <p className="text-xs">
                JIB: 4200000000000 • PDV: 200000000000
              </p>
              <span className="hidden md:inline text-slate-600">|</span>
              <p className="text-xs">
                Ažurirano: {new Date().toLocaleDateString('sr-Latn-BA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/politika-privatnosti" className="hover:text-zinc-300 transition text-xs">
                Privatnost
              </Link>
              <Link href="/uslovi-koristenja" className="hover:text-zinc-300 transition text-xs">
                Uslovi
              </Link>
              <Link href="/sitemap.xml" className="hover:text-zinc-300 transition text-xs">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500 text-center md:text-left leading-relaxed">
              Napomena: Informacije na ovoj web stranici su opšteg karaktera i ne predstavljaju pravni savjet. 
              Za konkretne pravne situacije, molimo kontaktirajte nas za profesionalnu konsultaciju.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Andrić Law",
            "description": "Advokatski ured specijaliziran za radno pravo, IT ugovore i privredno pravo u BiH",
            "url": "https://andric.law",
            "logo": "https://andric.law/logo.png",
            "image": "https://andric.law/og-image.jpg",
            "telephone": "+38761000000",
            "email": "office@andric.law",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sarajevo",
              "addressCountry": "BA"
            },
            "areaServed": [
              "Federacija Bosne i Hercegovine",
              "Republika Srpska",
              "Brčko Distrikt"
            ],
            "priceRange": "$$",
            "openingHours": "Mo-Fr 09:00-17:00",
            "sameAs": [
              "https://linkedin.com/company/andric-law",
              "https://facebook.com/andriclaw",
              "https://instagram.com/andriclaw"
            ]
          })
        }}
      />
    </footer>
  );
}
