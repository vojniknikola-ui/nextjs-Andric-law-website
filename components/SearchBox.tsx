'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchBoxProps = {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'hero';
};

type SearchSuggestion = {
  id: string;
  label: string;
  subtitle?: string;
  href?: string;
  type: 'law' | 'blog';
};

export default function SearchBox({
  initialQuery = '',
  placeholder = 'Pretražite zakone, sudsku praksu, članke...',
  className,
  variant = 'default',
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsId = useId();
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    const handle = setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/search/suggest?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
        setIsOpen(true);
        setActiveIndex(-1);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setSuggestions([]);
          setIsOpen(false);
        }
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => {
      clearTimeout(handle);
      controller.abort();
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const baseInputClass = 'w-full rounded-xl border bg-white/90 text-base text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const inputClasses = `${baseInputClass} ${
    variant === 'hero'
      ? 'border-white/20 px-5 py-4 pr-24 placeholder:text-slate-400 backdrop-blur'
      : 'border-gray-300 px-4 py-3 pr-12 placeholder:text-gray-400'
  }`;

  const baseButtonClass = 'font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';
  const buttonClasses = `${baseButtonClass} ${
    variant === 'hero'
      ? 'absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30'
      : 'absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
  }`;

  const formClassName = ['w-full', className].filter(Boolean).join(' ');

  const dropdownClasses = useMemo(() => {
    if (!isOpen && !isLoading) {
      return 'hidden';
    }
    return [
      'absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl',
      variant === 'hero' ? 'backdrop-blur' : '',
    ].join(' ');
  }, [isOpen, isLoading, variant]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    setQuery(suggestion.label);
    if (suggestion.href) {
      router.push(suggestion.href);
      return;
    }
    router.push(`/search?q=${encodeURIComponent(suggestion.label)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      const suggestion = suggestions[activeIndex];
      if (suggestion) {
        handleSuggestionClick(suggestion);
      }
    }
  };

  const activeOptionId = activeIndex >= 0 ? `${suggestionsId}-item-${activeIndex}` : undefined;

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 150);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClasses}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={suggestionsId}
          aria-haspopup="listbox"
          aria-activedescendant={activeOptionId}
        />
        <button
          type="submit"
          className={buttonClasses}
        >
          Traži
        </button>

        <div id={suggestionsId} role="listbox" className={dropdownClasses}>
          <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span>Prijedlozi</span>
            {isLoading && <span className="text-slate-500">Učitavanje…</span>}
          </div>
          {suggestions.length === 0 && !isLoading ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              Nema prijedloga za ovaj upit.
            </div>
          ) : (
            <ul className="max-h-72 overflow-auto pb-2">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.id}>
                  <button
                    id={`${suggestionsId}-item-${index}`}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition ${
                      index === activeIndex
                        ? 'bg-blue-50 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <span className={`mt-1 h-2 w-2 rounded-full ${suggestion.type === 'law' ? 'bg-blue-600' : 'bg-emerald-500'}`} />
                    <span className="flex-1">
                      <span className="block font-semibold">{suggestion.label}</span>
                      {suggestion.subtitle && (
                        <span className="mt-1 block text-xs text-slate-500">{suggestion.subtitle}</span>
                      )}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {suggestion.type === 'law' ? 'Zakon' : 'Članak'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}
