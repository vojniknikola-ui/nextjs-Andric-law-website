import { Scale, FileText, Gavel } from 'lucide-react';

const steps = [
  {
    title: 'Procjena i strategija',
    description: 'U 24h mapiramo pravni okvir, rizike i naredne korake.',
    icon: Scale,
    motionClass: 'legal-icon-sway',
  },
  {
    title: 'Dokumentacija bez šuma',
    description: 'Pripremamo ugovore, politike i akte jasno i razumljivo.',
    icon: FileText,
    motionClass: 'legal-icon-float',
  },
  {
    title: 'Zastupanje i zaštita',
    description: 'Vodimo pregovore i štitimo interese do rješenja.',
    icon: Gavel,
    motionClass: 'legal-icon-strike',
  },
];

export function LegalJourney() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-7 backdrop-blur">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Pravni put</p>
          <h3 className="text-xl font-semibold text-white mt-2">Vodimo vas kroz svaki korak</h3>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
          <span>01 → 03</span>
          <span className="text-slate-500">Jedno mjesto</span>
        </div>
      </div>

      <div className="legal-journey">
        <div className="legal-journey__rail" aria-hidden="true">
          <span className="legal-journey__dot" />
        </div>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="grid grid-cols-[40px_1fr] gap-4">
                <div
                  className={`relative z-10 size-10 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center ${step.motionClass}`}
                  style={{ animationDelay: `${index * 0.6}s` }}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">
                    Korak 0{index + 1}
                  </p>
                  <h4 className="text-base font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
