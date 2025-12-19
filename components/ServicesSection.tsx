'use client';

import { useState, type ReactNode } from 'react';
import { ServiceCard } from './ServiceCard';
import { ServiceModal } from './ServiceModal';
import {
  Scale, FileText, Briefcase, ShieldCheck, Handshake, Gavel
} from 'lucide-react';

type Service = {
  key: string;
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
  featured?: boolean;
  details: {
    lead: string;
    bullets: string[];
  };
};

const services: Service[] = [
  {
    key: "radno",
    icon: <Briefcase className="size-6" />,
    title: "Radno pravo",
    description: "Kompletan ciklus radnih odnosa od zapošljavanja do prestanka rada",
    items: [
      "Ugovori o radu i aneksi",
      "Pravilnici i interne politike",
      "Otkazi i disciplinski postupci",
      "Kolektivni ugovori"
    ],
    details: {
      lead: "Pokrivamo cijeli ciklus radnih odnosa: od zapošljavanja do prestanka rada, sa fokusom na smanjenje rizika spora.",
      bullets: [
        "Priprema ugovora, aneksa i rješenja (usklađeno sa FBiH/RS).",
        "Modeli pravilnika (rad, zaštita na radu, plaće, disciplina).",
        "Vođenje disciplinskih postupaka i otkaza (formalni koraci, rokovi, dokazivanje).",
        "Zastupanje u radnim sporovima pred sudovima i inspekcijom rada."
      ],
    },
    featured: true,
  },
  {
    key: "ugovori",
    icon: <FileText className="size-6" />,
    title: "Ugovori i IT",
    description: "Struktura ugovora koja štiti vaš interes sa jasnim deliverables",
    items: [
      "MSA / SOW / NDA",
      "SaaS i licenciranje",
      "DPAs i GDPR klauzule",
      "Vendor agreements"
    ],
    details: {
      lead: "Struktura ugovora koja štiti interes klijenta, jasni deliverables i mjerljivi rokovi. Fokus na IT projektima.",
      bullets: [
        "MSA/SOW/NDA set – pregled rizika, IP, odgovornost i kazne.",
        "SaaS i licencni modeli, podrška prilikom pregovora.",
        "DPA, SCCs i GDPR klauzule sa jasnim obavezama i audit mehanizmima.",
        "Review i redrafting postojećih ugovora."
      ],
    },
    featured: true,
  },
  {
    key: "privreda",
    icon: <Handshake className="size-6" />,
    title: "Privredno pravo",
    description: "Od osnivanja do izmjena osnivačkih akata i odnosa članova",
    items: [
      "Osnivanje i registracija",
      "Statusne promjene",
      "Skupštine i odluke",
      "Dioničari i udjeli"
    ],
    details: {
      lead: "Pratimo vas od osnivanja do izmjena osnivačkih akata i odnosa članova/akcionara.",
      bullets: [
        "Osnivanje d.o.o./a.d., registracije i promjene.",
        "Skupštine, odluke i zapisnici (forma + rokovi).",
        "Ugovori između članova/dioničara, tag/drag along, vesting.",
        "Due diligence i M&A transakcije."
      ],
    },
  },
  {
    key: "sporovi",
    icon: <Gavel className="size-6" />,
    title: "Sporovi i zastupanje",
    description: "Procesna disciplina i realna procjena uspjeha",
    items: [
      "Parnice i ostavinski postupci",
      "Radni sporovi",
      "Arbitraža i mirenje",
      "Izvršni postupci"
    ],
    details: {
      lead: "Procesna disciplina i realna procjena uspjeha. Spremnost na nagodbu kada je racionalno.",
      bullets: [
        "Parnice iz ugovora, naknade štete i radnih odnosa.",
        "Priprema tužbi, odgovora, dokaznih prijedloga.",
        "Arbitražno rješavanje i medijacija gdje je efikasnije.",
        "Zastupanje pred svim sudovima u BiH."
      ],
    },
  },
  {
    key: "compliance",
    icon: <ShieldCheck className="size-6" />,
    title: "Compliance i HR",
    description: "Skalabilni interni akti i procedure sa jasnim kontrolama",
    items: [
      "Interni akti i politike",
      "Onboarding i evaluacije",
      "Procjena rizika",
      "GDPR compliance"
    ],
    details: {
      lead: "Skalabilni interni akti i procedure – jasne obaveze, odgovornosti i kontrole.",
      bullets: [
        "Pravilnici i politike (disciplinarni, WFH, BYOD, DLP).",
        "Onboarding, ciljevi, evaluacije i PIP procesi.",
        "Procjene rizika i planovi korektivnih mjera.",
        "GDPR audit i implementacija mjera zaštite."
      ],
    },
  },
  {
    key: "ip",
    icon: <Scale className="size-6" />,
    title: "Intelektualno vlasništvo",
    description: "Jasna vlasništva nad kodom, brendom i sadržajem",
    items: [
      "Autorska i srodna prava",
      "Ugovori o prenosu prava",
      "Zaštita brenda i žigova",
      "IP due diligence"
    ],
    details: {
      lead: "Jasna vlasništva nad kodom, brendom i sadržajem – bez sivih zona.",
      bullets: [
        "Ugovori o prenosu imovinskih prava i work‑for‑hire klauzule.",
        "Registracija žigova i zaštita vizualnog identiteta.",
        "Egzekucija prava (opomene, tužbe, nagodbe).",
        "IP strategija za startupe i tech kompanije."
      ],
    },
  },
];

export function ServicesSection() {
  const [openModal, setOpenModal] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const openService = (srv: Service) => {
    setActiveService(srv);
    setOpenModal(true);
  };

  const closeService = () => {
    setOpenModal(false);
    setActiveService(null);
  };

  return (
    <>
      <section id="usluge" className="relative py-20 md:py-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-zinc-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-zinc-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
              <div className="size-2 rounded-full bg-zinc-400 animate-pulse" />
              Specijalizirane pravne usluge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500">usluge</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Konzistentan pristup i jasna dokumentacija, prilagođeno kompanijama i osnivačima. 
              Fokus na preventivi i smanjenju pravnih rizika.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={service.title}
                description={service.description}
                items={service.items}
                featured={service.featured}
                onClick={() => openService(service)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-6">
              Niste sigurni koja usluga vam je potrebna?
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Zakažite besplatne konsultacije
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {openModal && activeService && (
        <ServiceModal service={activeService} onClose={closeService} />
      )}
    </>
  );
}
