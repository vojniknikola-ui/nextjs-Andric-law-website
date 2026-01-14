'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';

interface HeaderProps {
  onContactClick?: () => void;
  contactHref?: string;
}

export function Header({ onContactClick, contactHref }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const resolvedContactHref = contactHref ?? '/kontakt';

  const navigation = [
    { name: 'Usluge', href: '/usluge' },
    { name: 'Zakoni i članci', href: '/zakoni' },
    { name: 'O nama', href: '/o-nama' },
    { name: 'Kontakt', href: resolvedContactHref },
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
    'inline-flex items-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300';

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
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-900/30 transition-opacity duration-500 ${
          hasScrolled ? 'opacity-100' : 'opacity-95'
        }`}
        aria-hidden="true"
      />
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3" aria-label="Glavna navigacija">
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 sm:px-6 py-3 shadow-sm transition-all duration-300 ${
            hasScrolled ? 'backdrop-blur-lg' : 'backdrop-blur-md'
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
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {renderContactButton(
              'hidden md:inline-flex bg-white text-slate-950 px-5 py-2.5 text-sm hover:bg-slate-100'
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
          <div className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-4 shadow-xl shadow-slate-950/60 backdrop-blur-lg space-y-3">
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

            {renderContactButton(
              'w-full justify-center bg-white text-slate-950 px-5 py-3 text-base hover:bg-slate-100',
              () => setIsMobileMenuOpen(false)
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
