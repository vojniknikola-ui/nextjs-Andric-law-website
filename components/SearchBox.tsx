'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchBoxProps = {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'hero';
};

export default function SearchBox({
  initialQuery = '',
  placeholder = 'Pretražite zakone, sudsku praksu, članke...',
  className,
  variant = 'default',
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
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

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
        <button
          type="submit"
          className={buttonClasses}
        >
          Traži
        </button>
      </div>
    </form>
  );
}
