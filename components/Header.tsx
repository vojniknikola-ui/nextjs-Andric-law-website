'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onContactClick?: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Usluge', href: '/#usluge' },
    { name: 'LawViewer', href: '/lawviewer' },
    { name: 'Glosarij', href: '/#glosarij' },
    { name: 'O nama', href: '/#o-nama' },
    { name: 'Kontakt', href: '/#kontakt' },
  ];

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-slate-950/90 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-6 text-slate-400">
              <a 
                href="tel:+38761000000" 
                className="inline-flex items-center gap-2 hover:text-zinc-300 transition"
                aria-label="Pozovite nas"
              >
                <Phone className="size-3" />
                <span>+387 61 000 000</span>
              </a>
              <a 
                href="mailto:office@andric.law" 
                className="hover:text-zinc-300 transition"
                aria-label="Pošaljite email"
              >
                office@andric.law
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                Dostupni 24/7
              </span>
              <span className="text-slate-500">|</span>
              <span>Sarajevo, BiH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/10' 
            : 'bg-slate-950/70 backdrop-blur border-b border-white/5'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Glavna navigacija">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
              aria-label="Andrić Law - Početna stranica"
            >
              <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-500 flex items-center justify-center font-bold text-slate-950 group-hover:scale-105 transition-transform">
                AL
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg lg:text-xl tracking-tight text-slate-100">
                  ANDRIĆ LAW
                </div>
                <div className="text-xs text-slate-400 -mt-0.5">
                  Advokatski ured
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-zinc-300 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onContactClick}
                className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-2.5 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                aria-label="Zakažite besplatne konsultacije"
              >
                <Phone className="size-4" />
                <span>Zakaži konsultacije</span>
              </button>

              {/* Mobile CTA */}
              <a
                href="tel:+38761000000"
                className="lg:hidden inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 py-2 transition-all"
                aria-label="Pozovite nas"
              >
                <Phone className="size-4" />
                <span className="sm:inline hidden">Pozovi</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition"
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 py-4 animate-in slide-in-from-top-5 duration-300">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-zinc-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick?.();
                  }}
                  className="mt-4 mx-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-3 transition"
                >
                  <Phone className="size-4" />
                  Zakaži konsultacije
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
