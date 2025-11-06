'use client';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

const FILTERS: { value: Category; label: string }[] = [
  { value: 'all', label: 'Sve' },
  { value: 'zakoni', label: 'Zakoni i podzakonski akti' },
  { value: 'sudska-praksa', label: 'Sudska praksa' },
  { value: 'vijesti-clanci', label: 'Vijesti i članci' },
];

export default function SearchFilters({ currentFilter, query }: { currentFilter: Category; query: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <a
          key={filter.value}
          href={`/search?q=${encodeURIComponent(query)}&filter=${filter.value}`}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {filter.label}
        </a>
      ))}
    </div>
  );
}
