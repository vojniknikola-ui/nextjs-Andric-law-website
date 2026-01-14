import type { LucideIcon } from 'lucide-react';
import {
  Banknote,
  Briefcase,
  Building2,
  Cpu,
  Handshake,
  Landmark,
  ScrollText,
  Users,
  Zap,
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
    description: 'Kompletan ciklus radnih odnosa od ugovaranja do prestanka rada u Sarajevu i cijeloj BiH (FBiH/RS/BD).',
    items: [
      'Ugovori o radu i aneksi',
      'Pravilnici i interne politike',
      'Otkazi i disciplinski postupci',
      'Radni sporovi i kolektivni ugovori',
    ],
    details: {
      lead: 'Radno-pravni savjet za BiH sa fokusom na zakonit otkaz, disciplinske mjere i urednu dokumentaciju. Odgovor u 24h, pisano mišljenje u 72h.',
      bullets: [
        'Draft i review ugovora o radu, aneksa, rješenja i obračuna.',
        'Pravilnici i interni akti (rad, zaštita na radu, WFH, DLP) usklađeni sa FBiH/RS.',
        'Vođenje otkaza i disciplinskih postupaka uz provjeru rokova i dokaznih standarda.',
        'Zastupanje u radnim sporovima i pregovorima oko kolektivnih ugovora u Sarajevu i drugim gradovima.',
      ],
    },
    featured: true,
  },
  {
    key: 'porodica',
    slug: 'porodicno-pravo',
    icon: Users,
    title: 'Porodično pravo',
    description: 'Razvodi, alimentacija, starateljstvo i zaštita porodičnih interesa u BiH (Sarajevo, FBiH/RS).',
    items: [
      'Razvodi i sporazumi o razdvajanju',
      'Alimentacija i izdržavanje',
      'Staranje, skrbništvo i posjete',
      'Predbračni i bračni ugovori',
    ],
    details: {
      lead: 'Diskretna podrška u razvodima, starateljstvu i alimentaciji uz jasno vođenje kroz sudske i vansudske opcije u BiH.',
      bullets: [
        'Priprema i pregovaranje sporazuma o razvodu i podjeli imovine.',
        'Zastupanje u starateljstvu, kontaktima i planovima posjeta pred sudovima u FBiH/RS.',
        'Ugovori o alimentaciji i naplata za djecu ili bračnog druga.',
        'Sastavljanje predbračnih/bračnih ugovora i izmjena režima imovine.',
      ],
    },
  },
  {
    key: 'imovina',
    slug: 'imovinsko-pravo',
    icon: Building2,
    title: 'Imovinsko i nekretnine',
    description: 'Promet nekretnina, katastar, etažiranje i sporovi o vlasništvu u Sarajevu i cijeloj BiH.',
    items: [
      'Kupoprodaja i due diligence nekretnina',
      'Upis i prijenos vlasništva u katastru',
      'Etažiranje i suvlasnički odnosi',
      'Hipoteke, zalozi i imovinski sporovi',
    ],
    details: {
      lead: 'Siguran promet nekretnina u BiH i čista vlasnička linija: ugovori, provjere tereta, upisi i sporovi.',
      bullets: [
        'Draft/pregled kupoprodajnih i ugovora o zakupu sa provjerom tereta.',
        'Prijava i upis prava vlasništva, hipoteka i služnosti u zemljišne knjige u FBiH/RS/BD.',
        'Etažiranje, suvlasnički odnosi i regulacija zajedničkih dijelova.',
        'Zastupanje u imovinsko-pravnim sporovima i postupcima eksproprijacije.',
      ],
    },
  },
  {
    key: 'nasljedje',
    slug: 'nasljedno-pravo',
    icon: ScrollText,
    title: 'Nasljedno pravo',
    description: 'Oporuke, ostavinski postupci i nasljedni sporovi u BiH.',
    items: [
      'Izrada i analiza oporuka',
      'Ostavinski postupci',
      'Dogovori o podjeli imovine',
      'Zastupanje u nasljednim sporovima',
    ],
    details: {
      lead: 'Planiranje i provođenje nasljeđivanja u BiH uz zaštitu nasljednih prava i sprečavanje sporova.',
      bullets: [
        'Priprema i verifikacija oporuka, legata i punomoći.',
        'Vođenje ostavinskih postupaka i pregovora među nasljednicima pred sudovima u FBiH/RS.',
        'Savjetovanje o bračnoj stečevini i zaštiti legitimnih dijelova.',
        'Sporovi oko poništavanja oporuka, nužnog dijela i podjele imovine.',
      ],
    },
  },
  {
    key: 'privreda',
    slug: 'privredno-pravo',
    icon: Handshake,
    title: 'Privredno pravo',
    description: 'Korporativno i komercijalno pravo: osnivanja, M&A i ugovori u Sarajevu i BiH.',
    items: [
      'Osnivanje i statusne promjene društava',
      'M&A i due diligence',
      'Komercijalni ugovori i distribucija',
      'Korporativno upravljanje i skupštine',
    ],
    details: {
      lead: 'Pravna infrastruktura za biznis u BiH: od registracije do prodaje društva, uz čvrste ugovore i governance.',
      bullets: [
        'Osnivanje i registracija d.o.o./a.d. sa statutima i osnivačkim aktima.',
        'Priprema i review dioničarskih/članskih ugovora, tag/drag along, vesting.',
        'M&A due diligence, SPA/APA ugovori i post-closing obaveze u BiH.',
        'Komercijalni ugovori (distribucija, franšiza, agencija, SaaS licenciranje) za domaće i cross-border poslove.',
      ],
    },
    featured: true,
  },
  {
    key: 'porezi',
    slug: 'porezno-pravo',
    icon: Banknote,
    title: 'Porezno pravo',
    description: 'Poresko planiranje, PDV i zastupanje pred Poreznom upravom u BiH.',
    items: [
      'PDV, porez na dobit i dohodak',
      'Poreska optimizacija i planiranje',
      'Porezne kontrole i žalbe',
      'Carinsko i akcizno pravo',
    ],
    details: {
      lead: 'Porezni savjet za kompanije i osnivače u BiH: planiranje, kontrole i sporovi uz minimiziranje rizika kazni.',
      bullets: [
        'Pregled poreskih obaveza (PDV, dobit, dohodak) i planiranje novčanih tokova u BiH.',
        'Priprema poreskih prijava i pratećih objašnjenja.',
        'Zastupanje u poreskim kontrolama, revizijama i žalbenim postupcima.',
        'Savjeti o carinskim i administrativnim davanjima za uvoz/izvoz.',
      ],
    },
  },
  {
    key: 'bankarstvo',
    slug: 'bankarsko-pravo',
    icon: Landmark,
    title: 'Bankarsko i finansijsko pravo',
    description: 'Krediti, garancije, finansiranja i regulativa finansijskog sektora u BiH.',
    items: [
      'Kreditni i garancijski ugovori',
      'Projektna i asset finansiranja',
      'Regulatorna usklađenost',
      'Sporovi banka-klijent',
    ],
    details: {
      lead: 'Struktura i sigurnost finansiranja u BiH: kreditni aranžmani, obezbjeđenja i usklađenost sa bankarskim propisima.',
      bullets: [
        'Draft i pregled kreditnih, depozitnih i garancijskih ugovora (hipoteka, zalog) u FBiH/RS.',
        'Projektna i asset finansiranja, mezzanine/bridge aranžmani za lokalne i regionalne projekte.',
        'Licenciranje i compliance sa propisima o finansijskim uslugama (Agencija za bankarstvo, CBBiH).',
        'Rješavanje sporova između banaka i klijenata, uključujući stečajne postupke i izvršenja.',
      ],
    },
  },
  {
    key: 'it-telekom',
    slug: 'it-i-telekom-pravo',
    icon: Cpu,
    title: 'IT i telekom pravo',
    description: 'Softverski ugovori, licence, GDPR i TMT regulativa u BiH i za cross-border timove.',
    items: [
      'MSA/SOW i development ugovori',
      'Licenciranje i IP u digitalu',
      'GDPR i cyber sigurnost',
      'Telekom i TMT dozvole',
      'Kripto i digitalna imovina',
      'AI modeli i podaci',
    ],
    details: {
      lead: 'Digital-first savjet iz Sarajeva za BiH i EU: softverski ugovori, zaštita IP-a, AI/ML i kripto compliance.',
      bullets: [
        'MSA/SOW/NDA setovi za razvoj i održavanje softvera.',
        'Licencni modeli, SaaS ugovori i zaštita autorskih prava u digitalu (BiH/EU).',
        'GDPR, DPA i sigurnosne politike (incident response, DPIA) prilagođene lokalnim timovima.',
        'Regulatorni savjeti za telekom usluge i elektronske komunikacije (RAK BiH, TMT propisi).',
        'Kripto i digitalna imovina: token modeli, whitepaper review, AML/KYC politike, smart contract audit SLA.',
        'AI modeli i podaci: ugovori o treniranju, licenciranje datasetova, odgovornost za output i IP vlasništvo.',
      ],
    },
    featured: true,
  },
  {
    key: 'energetika',
    slug: 'energetsko-pravo',
    icon: Zap,
    title: 'Energetsko i infrastrukturno pravo',
    description: 'Koncesije, EPC ugovori, dozvole i sporovi u energetici i gradnji u BiH.',
    items: [
      'Projektno finansiranje i koncesije',
      'EPC i FIDIC ugovori',
      'Dozvole i okolišne saglasnosti',
      'PPP i sporovi u izgradnji',
    ],
    details: {
      lead: 'Veliki projekti u energiji i infrastrukturi u BiH: koncesije, dozvole, ugovori o građenju i rješavanje sporova.',
      bullets: [
        'Pregovori i izrada koncesionih i EPC/FIDIC ugovora za projekte u BiH (energija, saobraćaj, industrija).',
        'Pribavljanje urbanističkih, građevinskih i okolišnih dozvola (lokacijska, okolišna, upotrebna).',
        'Strukturiranje PPP projekata i upravljanje rizicima isporuke u saradnji sa javnim sektorom.',
        'Sporovi u izgradnji i eksploataciji (kašnjenja, penali, naknada štete) pred domaćim sudovima i arbitražama.',
      ],
    },
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
