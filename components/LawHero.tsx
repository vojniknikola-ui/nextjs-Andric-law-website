import { RenderPdfButton } from './RenderPdfButton';

type ActionItem =
  | {
      type: 'link';
      label: string;
      href: string;
      download?: boolean;
      variant?: 'primary' | 'secondary';
    }
  | {
      type: 'render';
      label: string;
      variant?: 'primary' | 'secondary';
    };

interface LawHeroHighlight {
  label: string;
  description?: string;
}

interface LawHeroProps {
  badge: string;
  title: string;
  description: string;
  actions: ActionItem[];
  highlights?: LawHeroHighlight[];
}

export function LawHero({ badge, title, description, actions, highlights }: LawHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
              AL
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
                {badge}
              </span>
            </div>
          </div>
          <h1 className="mt-5 text-4xl font-bold text-slate-950 lg:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>

          {actions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) => {
                const variant = action.variant ?? 'primary';
                const baseClass =
                  variant === 'primary'
                    ? 'inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5'
                    : 'inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100';

                if (action.type === 'render') {
                  return (
                    <RenderPdfButton
                      key={action.label}
                      label={action.label}
                      className={baseClass}
                    />
                  );
                }

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className={baseClass}
                    download={action.download}
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {!!highlights?.length && (
          <div className="flex-1 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              Sažetak izmjena
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-700">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/60 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-slate-900">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
