import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export const metadata = {
  title: 'Pretraga | Andrić Law',
  description: 'Pretražite zakone, sudsku praksu, vijesti i članke',
  robots: 'noindex,follow'
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string }> }) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Pretraga</h1>
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults query={params.q} filter={params.filter} />
        </Suspense>
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div style={{ minHeight: '400px' }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow mb-4 animate-pulse" style={{ height: '120px' }}>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
