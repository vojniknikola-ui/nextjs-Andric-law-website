import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  FileText,
  Handshake,
  Gavel,
  ShieldCheck,
  Scale,
} from 'lucide-react';

export type Service = {
  key: string;
  slug: string;
  title: string;
  description: string;
  items: string[];
  featured?: boolean;
  details: {
    lead: string;
    bullets: string[];
  };
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    key: 'radno',
    slug: 'radno-pravo',
    icon: Briefcase,
    title: 'Radno pravo',
    description: 'Kompletan ciklus radnih odnosa od zapošljavanja do prestanka rada',
    items: [
      'Ugovori o radu i aneksi',
      'Pravilnici i interne politike',
      'Otkazi i disciplinski postupci',
      'Kolektivni ugovori',
    ],
    details: {
      lead: 'Pokrivamo cijeli ciklus radnih odnosa: od zapošljavanja do prestanka rada, sa fokusom na smanjenje rizika spora.',
      bullets: [
        'Priprema ugovora, aneksa i rješenja (usklađeno sa FBiH/RS).',
        'Modeli pravilnika (rad, zaštita na radu, plaće, disciplina).',
        'Vođenje disciplinskih postupaka i otkaza (formalni koraci, rokovi, dokazivanje).',
        'Zastupanje u radnim sporovima pred sudovima i inspekcijom rada.',
      ],
    },
    featured: true,
  },
  {
    key: 'ugovori',
    slug: 'ugovori-it',
    icon: FileText,
    title: 'Ugovori i IT',
    description: 'Struktura ugovora koja štiti vaš interes sa jasnim deliverables',
    items: [
      'MSA / SOW / NDA',
      'SaaS i licenciranje',
      'DPAs i GDPR klauzule',
      'Vendor agreements',
    ],
    details: {
      lead: 'Struktura ugovora koja štiti interes klijenta, jasni deliverables i mjerljivi rokovi. Fokus na IT projektima.',
      bullets: [
        'MSA/SOW/NDA set – pregled rizika, IP, odgovornost i kazne.',
        'SaaS i licencni modeli, podrška prilikom pregovora.',
        'DPA, SCCs i GDPR klauzule sa jasnim obavezama i audit mehanizmima.',
        'Review i redrafting postojećih ugovora.',
      ],
    },
    featured: true,
  },
  {
    key: 'privreda',
    slug: 'privredno-pravo',
    icon: Handshake,
    title: 'Privredno pravo',
    description: 'Od osnivanja do izmjena osnivačkih akata i odnosa članova',
    items: [
      'Osnivanje i registracija',
      'Statusne promjene',
      'Skupštine i odluke',
      'Dioničari i udjeli',
    ],
    details: {
      lead: 'Pratimo vas od osnivanja do izmjena osnivačkih akata i odnosa članova/akcionara.',
      bullets: [
        'Osnivanje d.o.o./a.d., registracije i promjene.',
        'Skupštine, odluke i zapisnici (forma + rokovi).',
        'Ugovori između članova/dioničara, tag/drag along, vesting.',
        'Due diligence i M&A transakcije.',
      ],
    },
  },
  {
    key: 'sporovi',
    slug: 'sporovi-i-zastupanje',
    icon: Gavel,
    title: 'Sporovi i zastupanje',
    description: 'Procesna disciplina i realna procjena uspjeha',
    items: [
      'Parnice i ostavinski postupci',
      'Radni sporovi',
      'Arbitraža i mirenje',
      'Izvršni postupci',
    ],
    details: {
      lead: 'Procesna disciplina i realna procjena uspjeha. Spremnost na nagodbu kada je racionalno.',
      bullets: [
        'Parnice iz ugovora, naknade štete i radnih odnosa.',
        'Priprema tužbi, odgovora, dokaznih prijedloga.',
        'Arbitražno rješavanje i medijacija gdje je efikasnije.',
        'Zastupanje pred svim sudovima u BiH.',
      ],
    },
  },
  {
    key: 'compliance',
    slug: 'compliance-hr',
    icon: ShieldCheck,
    title: 'Compliance i HR',
    description: 'Skalabilni interni akti i procedure sa jasnim kontrolama',
    items: [
      'Interni akti i politike',
      'Onboarding i evaluacije',
      'Procjena rizika',
      'GDPR compliance',
    ],
    details: {
      lead: 'Skalabilni interni akti i procedure – jasne obaveze, odgovornosti i kontrole.',
      bullets: [
        'Pravilnici i politike (disciplinarni, WFH, BYOD, DLP).',
        'Onboarding, ciljevi, evaluacije i PIP procesi.',
        'Procjene rizika i planovi korektivnih mjera.',
        'GDPR audit i implementacija mjera zaštite.',
      ],
    },
  },
  {
    key: 'ip',
    slug: 'intelektualno-vlasnistvo',
    icon: Scale,
    title: 'Intelektualno vlasništvo',
    description: 'Jasna vlasništva nad kodom, brendom i sadržajem',
    items: [
      'Autorska i srodna prava',
      'Ugovori o prenosu prava',
      'Zaštita brenda i žigova',
      'IP due diligence',
    ],
    details: {
      lead: 'Jasna vlasništva nad kodom, brendom i sadržajem – bez sivih zona.',
      bullets: [
        'Ugovori o prenosu imovinskih prava i work-for-hire klauzule.',
        'Registracija žigova i zaštita vizualnog identiteta.',
        'Egzekucija prava (opomene, tužbe, nagodbe).',
        'IP strategija za startupe i tech kompanije.',
      ],
    },
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
