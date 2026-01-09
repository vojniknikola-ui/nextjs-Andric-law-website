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
  const resolvedContactHref = contactHref ?? '/kontakt';

  const navigation = [
    { name: 'Usluge', href: '/#usluge' },
    { name: 'Zakoni i članci', href: '/zakoni' },
    { name: 'Zakaži termin', href: '/booking' },
    { name: 'Glosarij', href: '/glosarij' },
    { name: 'O nama', href: '/#o-nama' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg shadow-black/30">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Glavna navigacija">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Andrić Law - Početna stranica">
            <div className="size-11 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center font-bold text-slate-100 text-xl group-hover:scale-105 group-hover:from-slate-500 transition-all">
              A
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg tracking-tight text-slate-100">ANDRIĆ LAW</div>
              <div className="text-xs text-slate-400 -mt-0.5">Advokatski ured</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {onContactClick ? (
              <button
                onClick={onContactClick}
                className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-2.5 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                aria-label="Zakažite besplatne konsultacije"
              >
                <Phone className="size-4" />
                <span>Kontakt</span>
              </button>
            ) : (
              <Link
                href={resolvedContactHref}
                className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-2.5 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                aria-label="Zakažite besplatne konsultacije"
              >
                <Phone className="size-4" />
                <span>Kontakt</span>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800/60 transition"
              aria-label="Otvori meni"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="size-6 text-slate-300" />
              ) : (
                <Menu className="size-6 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-700/50 py-4 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={resolvedContactHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 mx-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-3 transition-all"
              >
                <Phone className="size-4" />
                <span>Kontakt</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
