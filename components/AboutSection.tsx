import Image from 'next/image';
import { Award, Briefcase, GraduationCap, Users, TrendingUp } from 'lucide-react';

const ABOUT_IMAGE_URL = 'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/nikola-andric-portrait-qx7Acm5ZzSSYFJEoZS1g25kTE3g6iD.jpg';

export function AboutSection() {
  return (
    <section id="o-nama" className="py-24 md:py-32 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src={ABOUT_IMAGE_URL}
                alt="Nikola Andrić"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
            <div className="mt-6 flex items-center gap-8 text-sm text-slate-400">
              <div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div>godina iskustva</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div>riješenih slučajeva</div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
              <Award className="size-4" />
              Osnivač i advokat principal
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Nikola Andrić
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Advokat specijaliziran za radno pravo, IT ugovore i privredno pravo
            </p>

            <div className="space-y-4 mb-10 text-slate-300 leading-relaxed">
              <p>
                Sa preko 15 godina iskustva u pravnoj praksi, fokusiram se na pružanje praktičnih pravnih rješenja koja štite interese klijenata i minimiziraju rizike.
              </p>
              <p>
                Vjerujem u transparentnu komunikaciju, jasne rokove i preventivni pristup pravnim pitanjima. Svaki klijent dobija personalizovanu pažnju i stručno mišljenje zasnovano na aktuelnoj praksi.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="size-5" />
                  Oblasti specijalizacije
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  {[
                    'Radno pravo i HR',
                    'IT ugovori (MSA/SOW/NDA)',
                    'Privredno pravo',
                    'GDPR compliance',
                    'Intelektualno vlasništvo',
                    'Sporovi i arbitraža'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-white" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
