'use client';

import { useEffect, type ReactNode } from 'react';
import { X, Check, ArrowRight, Phone } from 'lucide-react';

type Service = {
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
  details: {
    lead: string;
    bullets: string[];
  };
};

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative z-[101] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 shadow-2xl animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-zinc-400/20 to-zinc-500/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300 shrink-0">
                <div className="scale-125">
                  {service.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 id="modal-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {service.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 size-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors group"
              aria-label="Zatvori modal"
            >
              <X className="size-5 text-slate-400 group-hover:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Lead text */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
            <p className="text-slate-300 leading-relaxed">
              {service.details.lead}
            </p>
          </div>

          {/* What we offer */}
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <div className="size-6 rounded-lg bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center">
                <Check className="size-4 text-zinc-300" />
              </div>
              Šta nudimo
            </h4>
            <ul className="space-y-3">
              {service.details.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-300 group/item"
                >
                  <div className="shrink-0 mt-1">
                    <div className="size-6 rounded-lg bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover/item:bg-zinc-400/20 transition-colors">
                      <Check className="size-3.5 text-zinc-400" />
                    </div>
                  </div>
                  <span className="leading-relaxed text-sm">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key services */}
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              Ključne usluge
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <p className="text-sm text-slate-300 font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-400/5 to-transparent p-6">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              Kako funkcioniše proces?
            </h4>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Inicijalni poziv', desc: 'Besplatne konsultacije (15-30 min)' },
                { step: '2', title: 'Ponuda', desc: 'Jasna cijena i rokovi u pisanoj formi' },
                { step: '3', title: 'Izrada', desc: 'Priprema dokumentacije i pravnih akata' },
                { step: '4', title: 'Isporuka', desc: 'Finalni dokumenti + follow-up podrška' },
              ].map((phase) => (
                <div key={phase.step} className="flex items-start gap-4">
                  <div className="shrink-0 size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center font-bold text-zinc-300">
                    {phase.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-slate-200 mb-1">
                      {phase.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-lg border-t border-white/10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold text-slate-200 mb-1">
                Zainteresovani za ovu uslugu?
              </p>
              <p className="text-xs text-slate-400">
                Kontaktirajte nas za besplatne inicijalne konsultacije
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
              <a
                href="tel:+38761000000"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/10 hover:bg-white/5 transition text-sm font-medium"
              >
                <Phone className="size-4" />
                Pozovi
              </a>
              <a
                href="#kontakt"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-3 transition-all hover:scale-105 shadow-lg shadow-blue-500/30 text-sm"
              >
                Zatraži ponudu
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
