'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { contactInfo } from '@/lib/contactInfo';

interface HeaderProps {
  onContactClick?: () => void;
  contactHref?: string;
}

export function Header({ onContactClick, contactHref }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const resolvedContactHref = contactHref ?? '/kontakt';

  const navigation = [
    { name: 'Usluge', href: '/#usluge' },
    { name: 'Zakoni i članci', href: '/zakoni' },
    { name: 'Zakažite konsultacije', href: resolvedContactHref },
    { name: 'O nama', href: '/#o-nama' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactButtonClasses =
    'inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300';

  const renderContactButton = (extraClasses: string, onPress?: () => void) => {
    const handlePress = () => {
      onPress?.();
      onContactClick?.();
    };

    if (onContactClick) {
      return (
        <button
          type="button"
          onClick={handlePress}
          className={`${contactButtonClasses} ${extraClasses}`}
          aria-label="Zakažite besplatne konsultacije"
        >
          <Phone className="size-4" />
          <span>Kontakt</span>
        </button>
      );
    }

    return (
      <Link
        href={resolvedContactHref}
        onClick={onPress}
        className={`${contactButtonClasses} ${extraClasses}`}
        aria-label="Zakažite besplatne konsultacije"
      >
        <Phone className="size-4" />
        <span>Kontakt</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-900/30 transition-opacity duration-500 ${
          hasScrolled ? 'opacity-100' : 'opacity-95'
        }`}
        aria-hidden="true"
      />
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-4" aria-label="Glavna navigacija">
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-6 py-3 sm:py-3.5 shadow-lg shadow-slate-950/50 ring-1 ring-white/10 transition-all duration-300 ${
            hasScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Andrić Law - Početna stranica">
              <div className="size-11 sm:size-12 rounded-xl bg-gradient-to-br from-zinc-300 to-slate-100 text-slate-950 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform duration-200">
                AL
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-semibold text-sm sm:text-base tracking-tight text-white">ANDRIĆ LAW</div>
                <div className="text-[11px] text-slate-400 -mt-0.5">Advokatski ured</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.18em] text-[11px]">
                Odgovor u 24h
              </span>
              <span className="hidden lg:block h-6 w-px bg-white/10" aria-hidden="true" />
              <a
                href={contactInfo.phoneHref}
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:border-white/20 hover:text-white transition-colors duration-200"
              >
                <Phone className="size-4 text-cyan-300" />
                <span className="whitespace-nowrap">{contactInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {renderContactButton(
              'hidden md:inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] hover:shadow-cyan-500/30'
            )}

            {onContactClick ? (
              <button
                type="button"
                onClick={() => onContactClick()}
                className="md:hidden inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 transition duration-200"
                aria-label="Kontaktirajte nas"
              >
                <Phone className="size-5 text-cyan-200" />
              </button>
            ) : (
              <Link
                href={resolvedContactHref}
                className="md:hidden inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 transition duration-200"
                aria-label="Kontaktirajte nas"
              >
                <Phone className="size-5 text-cyan-200" />
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              aria-label="Otvori meni"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-4 shadow-2xl shadow-slate-950/70 ring-1 ring-white/10 backdrop-blur-xl space-y-4">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base text-slate-100 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="grid gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm text-slate-100 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-cyan-300" />
                  <div className="text-left">
                    <p className="font-semibold">Pozovite kancelariju</p>
                    <p className="text-xs text-slate-400">{contactInfo.phoneDisplay}</p>
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">iOS · Android</span>
              </a>
            </div>

            {renderContactButton(
              'w-full justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35',
              () => setIsMobileMenuOpen(false)
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
