import { Award, Briefcase, GraduationCap, Users, Scale, TrendingUp } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="o-nama" className="py-20 md:py-28 bg-slate-950/40 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - Profile */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-700/30 via-slate-800 to-slate-900">
                  {/* Placeholder - zamijeni sa pravom slikom */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="size-32 rounded-full bg-zinc-400/20 border-4 border-zinc-400/30 flex items-center justify-center">
                      <span className="text-5xl font-bold text-zinc-300">NA</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 size-24 rounded-2xl bg-zinc-400/90 border-4 border-slate-950 flex items-center justify-center">
                  <Scale className="size-12 text-slate-950" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-3xl font-bold text-zinc-300 mb-1">15+</div>
                  <div className="text-xs text-slate-400">Godina iskustva</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-3xl font-bold text-zinc-300 mb-1">500+</div>
                  <div className="text-xs text-slate-400">Riješenih slučajeva</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
              <Award className="size-4" />
              Osnivač i advokat principal
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Nikola Andrić
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Advokat specijaliziran za radno pravo, IT ugovore i privredno pravo
            </p>

            <div className="prose prose-invert prose-slate max-w-none mb-10">
              <p className="text-slate-300 leading-relaxed">
                Sa preko 15 godina iskustva u pravnoj praksi, fokusiram se na pružanje praktičnih pravnih rješenja koja štite interese klijenata i minimiziraju rizike. Specijalizacija u radnom pravu i IT ugovorima omogućava mi da razumijem specifične potrebe modernih kompanija.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Vjerujem u transparentnu komunikaciju, jasne rokove i preventivni pristup pravnim pitanjima. Svaki klijent dobija personalizovanu pažnju i stručno mišljenje zasnovano na aktuelnoj praksi i zakonodavstvu.
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Briefcase className="size-5 text-zinc-300" />
                  Oblasti specijalizacije
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Radno pravo i HR',
                    'IT ugovori (MSA/SOW/NDA)',
                    'Privredno pravo',
                    'GDPR compliance',
                    'Intelektualno vlasništvo',
                    'Sporovi i arbitraža'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="size-1.5 rounded-full bg-zinc-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <GraduationCap className="size-5 text-zinc-300" />
                  Obrazovanje i licence
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <p className="font-medium text-slate-200">Pravni fakultet Univerziteta u Sarajevu</p>
                    <p className="text-sm text-slate-400">Magistar pravnih nauka</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <p className="font-medium text-slate-200">Advokatska komora FBiH</p>
                    <p className="text-sm text-slate-400">Licencirani advokat</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Users className="size-5 text-zinc-300" />
                  Klijenti
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Radim sa startupima, IT kompanijama, malim i srednjim preduzećima, kao i individualnim osnivačima. 
                  Klijenti cijene direktan pristup, brze odgovore i praktična rješenja bez nepotrebnog pravnog žargona.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="p-6 rounded-2xl border border-zinc-400/20 bg-gradient-to-br from-zinc-400/5 to-transparent">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <TrendingUp className="size-5 text-zinc-300" />
                Pristup radu
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-1.5 rounded-full bg-zinc-400" />
                  </div>
                  <span><strong>Preventiva prije kuracije</strong> – Fokus na izbjegavanje problema, ne samo njihovo rješavanje</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-1.5 rounded-full bg-zinc-400" />
                  </div>
                  <span><strong>Jasna komunikacija</strong> – Bez pravnog žargona, razumljivo objašnjenje</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-1.5 rounded-full bg-zinc-400" />
                  </div>
                  <span><strong>Transparentne tarife</strong> – Znate cijenu prije nego što počnemo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="size-1.5 rounded-full bg-zinc-400" />
                  </div>
                  <span><strong>Brzi odgovori</strong> – 24h za email, 72h za pisano mišljenje</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
