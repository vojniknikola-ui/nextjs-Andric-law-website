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
    { name: 'Zakažite konsultacije', href: resolvedContactHref },
    { name: 'O nama', href: '/#o-nama' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Glavna navigacija">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Andrić Law - Početna stranica">
            <div className="size-11 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-900 text-xl group-hover:bg-gray-200 transition-all duration-200">
              A
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg tracking-tight text-gray-900">ANDRIĆ LAW</div>
              <div className="text-xs text-gray-600 -mt-0.5">Advokatski ured</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {onContactClick ? (
              <button
                onClick={onContactClick}
                className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-5 py-2.5 transition-all duration-200 hover:bg-blue-700 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                aria-label="Zakažite besplatne konsultacije"
              >
                <Phone className="size-4" />
                <span>Kontakt</span>
              </button>
            ) : (
              <Link
                href={resolvedContactHref}
                className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-2.5 transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                aria-label="Zakažite besplatne konsultacije"
              >
                <Phone className="size-4" />
                <span>Kontakt</span>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-gray-100 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              aria-label="Otvori meni"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="size-6 text-gray-700" />
              ) : (
                <Menu className="size-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={resolvedContactHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 mx-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-5 py-3 transition-all duration-200 hover:bg-blue-700 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
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
