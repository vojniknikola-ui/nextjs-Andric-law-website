import Image from 'next/image';
import { Award, Briefcase, GraduationCap, Users, TrendingUp } from 'lucide-react';

const ABOUT_IMAGE_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/nikola-andric-portrait-qx7Acm5ZzSSYFJEoZS1g25kTE3g6iD.jpg';

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
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src={ABOUT_IMAGE_URL}
                    alt="Nikola Andrić"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 35vw, 90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span>15+ godina iskustva</span>
                <span className="text-slate-600">•</span>
                <span>500+ riješenih slučajeva</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
              <Award className="size-4" />
              Osnivač i advokat principal
            </p>

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
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="border-l border-white/10 pl-4">
                    <p className="font-medium text-slate-200">Pravni fakultet Univerziteta u Sarajevu</p>
                    <p className="text-sm text-slate-400">Magistar pravnih nauka</p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
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
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <TrendingUp className="size-5 text-zinc-300" />
                Pristup radu
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="size-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                  <span><strong>Preventiva prije kuracije</strong> – Fokus na izbjegavanje problema, ne samo njihovo rješavanje</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                  <span><strong>Jasna komunikacija</strong> – Bez pravnog žargona, razumljivo objašnjenje</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                  <span><strong>Transparentne tarife</strong> – Znate cijenu prije nego što počnemo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
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
