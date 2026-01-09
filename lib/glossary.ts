import { generateSlug } from '@/lib/smartParsers';

export interface GlossaryEntry {
  term: string;
  def: string;
  category: string;
  relatedTerms?: string[];
}

export interface GlossaryEntryWithSlug extends GlossaryEntry {
  slug: string;
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Aneks ugovora",
    def: "Pismeni dodatak kojim se mijenjaju ili dopunjuju odredbe postojećeg ugovora. Aneks mora biti potpisan od svih ugovornih strana i postaje sastavni dio osnovnog ugovora.",
    category: "Ugovori",
    relatedTerms: ["Ugovor", "Izmjena ugovora"]
  },
  {
    term: "Arbitraža",
    def: "Vansudsko rješavanje sporova pred arbitražnim tijelom na osnovu arbitražnog sporazuma. Brža i fleksibilnija alternativa redovnom sudskom postupku.",
    category: "Sporovi",
    relatedTerms: ["Medijacija", "Mirenje"]
  },
  {
    term: "Disciplinski postupak",
    def: "Interna procedura utvrđivanja povrede radne obaveze i izricanja disciplinskih mjera. Mora poštovati načela saslušanja i prava na odbranu radnika.",
    category: "Radno pravo",
    relatedTerms: ["Otkaz", "Radna obaveza"]
  },
  {
    term: "DPA (Data Processing Agreement)",
    def: "Ugovor o obradi podataka između kontrolora i procesora ličnih podataka. Obavezan prema GDPR-u kada treća strana obrađuje lične podatke u vaše ime.",
    category: "GDPR",
    relatedTerms: ["GDPR", "Lični podaci"]
  },
  {
    term: "GDPR",
    def: "Opća uredba o zaštiti podataka EU (General Data Protection Regulation) koja reguliše obradu ličnih podataka. Primjenjuje se i na BiH kompanije koje posluju sa EU.",
    category: "GDPR",
    relatedTerms: ["DPA", "Lični podaci", "Saglasnost"]
  },
  {
    term: "IP (Intellectual Property)",
    def: "Intelektualno vlasništvo - prava na nematerijalna dobra kao što su autorska djela, patenti, žigovi i know-how. Zaštićeno zakonom i ugovorima.",
    category: "IP",
    relatedTerms: ["Autorsko pravo", "Patent", "Žig"]
  },
  {
    term: "JIB (Jedinstveni identifikacioni broj)",
    def: "Jedinstveni identifikacioni broj pravnog lica u BiH. Dodjeljuje se pri registraciji i koristi za sve službene evidencije i komunikaciju sa institucijama.",
    category: "Privredno pravo",
    relatedTerms: ["Registracija", "d.o.o."]
  },
  {
    term: "MSA (Master Service Agreement)",
    def: "Okvirni ugovor o pružanju usluga koji definiše opće uslove saradnje. Pojedinačni projekti se regulišu kroz SOW (Statement of Work) dokumente.",
    category: "Ugovori",
    relatedTerms: ["SOW", "NDA"]
  },
  {
    term: "NDA (Non-Disclosure Agreement)",
    def: "Ugovor o povjerljivosti kojim se definiše povjerljiva informacija, obaveze čuvanja tajnosti i posljedice povrede. Ključan za zaštitu poslovnih tajni.",
    category: "Ugovori",
    relatedTerms: ["Poslovna tajna", "Povjerljivost"]
  },
  {
    term: "Ništavost ugovora",
    def: "Posljedica suprotnosti ugovora prinudnim propisima, moralu ili javnom poretku. Ništav ugovor ne proizvodi pravno dejstvo od samog početka.",
    category: "Ugovori",
    relatedTerms: ["Rušljivost", "Valjanost ugovora"]
  },
  {
    term: "Otkaz ugovora o radu",
    def: "Jednostrani raskid radnog odnosa uz poštivanje zakonskih procedura i rokova. Može biti redovan (sa otkaznim rokom) ili vanredan (bez otkaznog roka).",
    category: "Radno pravo",
    relatedTerms: ["Otkazni rok", "Disciplinski postupak"]
  },
  {
    term: "PDV (Porez na dodatu vrijednost)",
    def: "Indirektni porez na promet dobara i usluga. Obavezna registracija za pravna lica sa prometom preko 50.000 KM godišnje u FBiH.",
    category: "Porezi",
    relatedTerms: ["Porez", "Faktura"]
  },
  {
    term: "Pravna sredstva",
    def: "Žalba, prigovor, revizija i druga sredstva za osporavanje odluka u upravnim i sudskim postupcima. Moraju se koristiti u zakonskim rokovima.",
    category: "Sporovi",
    relatedTerms: ["Žalba", "Rok"]
  },
  {
    term: "Res judicata",
    def: "Pravomoćno presuđena stvar – pravni princip po kojem se o istom zahtjevu između istih strana ne može ponovo suditi. Osigurava pravnu sigurnost.",
    category: "Sporovi",
    relatedTerms: ["Pravomoćnost", "Presuda"]
  },
  {
    term: "Rok zastare",
    def: "Vremenski period nakon kojeg se pravo ne može prinudno ostvariti putem suda. Opšti rok je 3 godine, ali postoje i posebni rokovi za određene zahtjeve.",
    category: "Opšte",
    relatedTerms: ["Prekluzija", "Rok"]
  },
  {
    term: "SaaS (Software as a Service)",
    def: "Model licenciranja softvera gdje se aplikacija koristi preko interneta uz pretplatu. Zahtijeva posebne ugovorne klauzule o dostupnosti i podacima.",
    category: "IT",
    relatedTerms: ["Licenca", "Cloud"]
  },
  {
    term: "SOW (Statement of Work)",
    def: "Dokument koji detaljno opisuje opseg rada, deliverables, rokove i cijenu za konkretan projekat. Nadovezuje se na MSA.",
    category: "Ugovori",
    relatedTerms: ["MSA", "Deliverables"]
  },
  {
    term: "Ugovorna kazna",
    def: "Novčani iznos unaprijed dogovoren kao posljedica povrede ugovorne obaveze (npr. kašnjenje). Može se naplatiti bez dokazivanja štete.",
    category: "Ugovori",
    relatedTerms: ["Naknada štete", "Povreda ugovora"]
  },
  {
    term: "Work for hire",
    def: "Princip po kojem poslodavac automatski postaje vlasnik autorskih prava na djela koja radnik kreira u okviru radnog odnosa. Mora biti ugovoreno.",
    category: "IP",
    relatedTerms: ["Autorsko pravo", "Radni odnos"]
  },
  {
    term: "Zastupanje",
    def: "Radnje punomoćnika u ime i za račun stranke u pravnim poslovima ili sudskim postupcima. Zahtijeva punomoć ili zakonsko ovlaštenje.",
    category: "Opšte",
    relatedTerms: ["Punomoć", "Advokat"]
  },
  {
    term: "Žig (Trademark)",
    def: "Zaštićen znak koji razlikuje proizvode ili usluge jednog privrednog subjekta od drugih. Registruje se kod Instituta za intelektualno vlasništvo.",
    category: "IP",
    relatedTerms: ["Brend", "Registracija"]
  }
];

export function slugifyGlossaryTerm(term: string) {
  return generateSlug(term);
}

export function getGlossaryEntries(): GlossaryEntryWithSlug[] {
  return glossaryEntries.map((entry) => ({
    ...entry,
    slug: slugifyGlossaryTerm(entry.term),
  }));
}

export function getGlossaryEntryBySlug(slug: string): GlossaryEntryWithSlug | undefined {
  return getGlossaryEntries().find((entry) => entry.slug === slug);
}

export function getGlossaryCategories() {
  return Array.from(new Set(glossaryEntries.map((entry) => entry.category))).sort();
}
