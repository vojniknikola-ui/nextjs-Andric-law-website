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

interface LawHeroStat {
  label: string;
  value: string;
  description?: string;
}

interface LawHeroProps {
  badge: string;
  title: string;
  description: string;
  actions: ActionItem[];
  stats: LawHeroStat[];
}

export function LawHero({ badge, title, description, actions, stats }: LawHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[3fr,2fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
            {badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold text-slate-950 lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {description}
          </p>

          {actions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) => {
                const variant = action.variant ?? 'primary';
                const className =
                  variant === 'primary'
                    ? 'inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5'
                    : 'inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100';

                if (action.type === 'render') {
                  return (
                    <RenderPdfButton key={action.label} label={action.label} className={className} />
                  );
                }

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className={className}
                    download={action.download}
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">Status dokumenta</p>
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">{stat.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">{stat.value}</dd>
                {stat.description && (
                  <p className="text-xs text-slate-500">{stat.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
