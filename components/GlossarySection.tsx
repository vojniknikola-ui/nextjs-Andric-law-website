'use client';

import { useState } from 'react';
import { Search, ChevronRight, BookOpen } from 'lucide-react';

interface GlossaryEntry {
  term: string;
  def: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryEntries: GlossaryEntry[] = [
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

export function GlossarySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(glossaryEntries.map(e => e.category))).sort();

  const filteredEntries = glossaryEntries.filter((entry) => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.def.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="glosarij" className="py-16 md:py-24 bg-slate-950/40 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pravni glosarij</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Brza objašnjenja ključnih pravnih termina – razumljivo i bez viška žargona.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <BookOpen className="size-4" />
            <span>{glossaryEntries.length} termina</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedCategory === null
                  ? 'bg-zinc-400/90 text-zinc-950 font-semibold'
                  : 'border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Sve kategorije
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedCategory === category
                    ? 'bg-zinc-400/90 text-zinc-950 font-semibold'
                    : 'border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 focus-within:ring-2 focus-within:ring-zinc-400/60">
          <Search className="size-5 text-slate-400 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži pojmove (npr. 'otkaz', 'NDA', 'zastara')"
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
            aria-label="Pretraži glosarij"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-slate-400 hover:text-slate-300 text-sm"
            >
              Očisti
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-slate-400">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'rezultat' : 'rezultata'}
          {selectedCategory && ` u kategoriji "${selectedCategory}"`}
          {searchQuery && ` za "${searchQuery}"`}
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map((entry) => (
            <details
              key={entry.term}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10 transition hover:border-white/20"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-50">{entry.term}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-400/10 text-zinc-300 border border-zinc-300/20">
                        {entry.category}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 transition group-open:rotate-90 text-zinc-300 mt-1" />
                </div>
              </summary>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-slate-300 leading-relaxed">{entry.def}</p>
                {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2">Povezani pojmovi:</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.relatedTerms.map((term) => (
                        <span
                          key={term}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-4">
              Nema rezultata za &quot;{searchQuery}&quot;
              {selectedCategory && <> u kategoriji &quot;{selectedCategory}&quot;</>}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-zinc-300 hover:text-zinc-200 underline"
            >
              Prikaži sve termine
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            Ne možete pronaći pojam koji tražite?{' '}
            <a href="#kontakt" className="text-zinc-300 hover:text-zinc-200 underline">
              Kontaktirajte nas
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
