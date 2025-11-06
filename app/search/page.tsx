import { Suspense } from 'react';
import Link from 'next/link';
import { Mail, Phone, ShieldCheck, Scale, BookOpenCheck, ArrowRight } from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import SearchResults from '@/components/SearchResults';

export const metadata = {
  title: 'Pretraga | Andrić Law',
  description: 'Pretražite zakone, sudsku praksu, vijesti i članke',
  robots: 'noindex,follow'
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string }> }) {
  const params = await searchParams;
  const query = params.q ?? '';

  return (
    <div className="bg-slate-50">
      <HeroSection initialQuery={query} />
      <ResultsSection query={params.q} filter={params.filter} />
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
        >
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function HeroSection({ initialQuery }: { initialQuery: string }) {
  const quickQueries = [
    { label: 'Član 6 – stvarna prava', query: 'član 6 stvarna prava' },
    { label: 'Otkaz ugovora', query: 'otkaz ugovora o radu' },
    { label: 'Osnivanje d.o.o.', query: 'osnivanje doo' },
    { label: 'NDA IT projekti', query: 'NDA IT projekti' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/50 blur-3xl" />
        <div className="absolute bottom-0 left-12 h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute -bottom-20 right-4 h-80 w-80 rounded-full bg-slate-500/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),320px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Andrić Law Research Hub
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Pretražite bazu znanja kancelarije <span className="text-blue-200">Andrić Law</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200">
              Pronađite stručne pravne analize, zakonske članke i praktične vodiče iz područja radnog, privrednog i IT prava.
            </p>

            <SearchBox
              initialQuery={initialQuery}
              variant="hero"
              className="mt-8 max-w-2xl"
              placeholder="Unesite pojam – npr. &quot;član 6 stvarna prava&quot;"
            />

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <span className="text-xs uppercase tracking-[0.2em] text-blue-200">Popularne pretrage</span>
              {quickQueries.map((item) => (
                <Link
                  key={item.query}
                  href={`/search?q=${encodeURIComponent(item.query)}`}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:border-white hover:bg-white/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-sm text-slate-100 shadow-xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">Andrić Law</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Pravni partner za digitalne i poslovne timove</h2>
            <p className="mt-3 text-slate-200">
              Specijalizovani za radno pravo, IT i IP ugovore, te podršku privrednim društvima u BiH.
            </p>
            <div className="mt-6 space-y-3 text-slate-100">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-200" />
                <span>Precizne analize zakona i podzakonskih akata</span>
              </div>
              <div className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 text-blue-200" />
                <span>Usmjerenost na praktična rješenja i zaštitu klijenata</span>
              </div>
              <div className="flex items-start gap-3">
                <BookOpenCheck className="mt-0.5 h-5 w-5 text-blue-200" />
                <span>Vodiči i checkliste dostupni kroz pretragu</span>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-base font-medium">
              <a href="tel:+38761924848" className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-2 text-white transition hover:bg-white/25">
                <Phone className="h-5 w-5" /> +387 61 924 848
              </a>
              <a href="mailto:info@andriclaw.ba" className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-2 text-white transition hover:bg-white/25">
                <Mail className="h-5 w-5" /> info@andriclaw.ba
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection({
  query,
  filter,
}: {
  query?: string;
  filter?: string;
}) {
  const insights = [
    {
      title: 'Radno i privredno pravo',
      description: 'Aktuelne teme iz radnog prava, privrednih ugovora i osnivanja društava.',
    },
    {
      title: 'IT i intelektualna svojina',
      description: 'NDA, licencni ugovori i zaštita koda za IT kompanije i startupe.',
    },
    {
      title: 'Sudska praksa',
      description: 'Sažeci odluka i obrazloženja relevantnih sudova u BiH.',
    },
  ];

  return (
    <section className="relative -mt-16 pb-16 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
              <Suspense fallback={<SearchSkeleton />}>
                <SearchResults query={query} filter={filter} />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Šta pokriva pretraga?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Na jednom mjestu objedinjene su objave Andrić Law tima, pravni vodiči i relevantni zakonski tekstovi.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {insights.map((item) => (
                  <li key={item.title} className="rounded-2xl bg-slate-100/60 px-3 py-2">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Trebate brzi savjet?</h3>
              <p className="mt-2 text-sm text-blue-100">
                Ako ne pronalazite ono što vam treba, pošaljite nam upit – odgovor stiže u roku od jednog radnog dana.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                Kontakt forma <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
