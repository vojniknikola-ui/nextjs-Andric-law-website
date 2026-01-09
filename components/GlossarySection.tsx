'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import { getGlossaryEntries, getGlossaryCategories, slugifyGlossaryTerm } from '@/lib/glossary';

export function GlossarySection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const HeadingTag = headingLevel;
  const glossaryEntries = getGlossaryEntries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getGlossaryCategories();

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
            <HeadingTag
              className={`${headingLevel === 'h1' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-bold tracking-tight`}
            >
              Pravni glosarij
            </HeadingTag>
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
                <Link
                  href={`/glosarij/${entry.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 hover:text-zinc-200"
                >
                  Otvori detalje <ChevronRight className="size-4" />
                </Link>
                {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2">Povezani pojmovi:</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.relatedTerms.map((term) => (
                        <Link
                          key={term}
                          href={`/glosarij/${slugifyGlossaryTerm(term)}`}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 hover:border-white/30"
                        >
                          {term}
                        </Link>
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
            <Link href="/kontakt" className="text-zinc-300 hover:text-zinc-200 underline">
              Kontaktirajte nas
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
