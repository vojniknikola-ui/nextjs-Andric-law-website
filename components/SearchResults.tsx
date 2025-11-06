import { getAllPosts } from '@/lib/blog';
import SearchFilters from './SearchFilters';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

async function searchContent(query: string, filter: Category) {
  const posts = await getAllPosts();
  
  const filtered = posts.filter(p => {
    const searchText = `${p.title} ${p.content} ${p.excerpt}`.toLowerCase();
    const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const matchesQuery = words.length === 0 ? 
      searchText.includes(query.toLowerCase()) :
      words.some(word => searchText.includes(word));
    
    if (filter === 'all') return matchesQuery;
    
    if (filter === 'zakoni') {
      return matchesQuery && p.tags.some(t => t.toLowerCase().includes('zakon'));
    }
    
    if (filter === 'sudska-praksa') {
      return matchesQuery && p.tags.some(t => t.toLowerCase().includes('pravosuđe') || t.toLowerCase().includes('presuda'));
    }
    
    if (filter === 'vijesti-clanci') {
      return matchesQuery && !p.tags.some(t => t.toLowerCase().includes('zakon') || t.toLowerCase().includes('pravosuđe'));
    }
    
    return matchesQuery;
  });
  
  return filtered.slice(0, 10).map(p => ({
    ...p,
    id: p.slug,
    category: p.tags.some(t => t.toLowerCase().includes('zakon')) ? 'zakoni' : 'vijesti-clanci'
  }));
}

export default async function SearchResults({ query, filter }: { query?: string; filter?: string }) {
  if (!query) {
    return <p className="text-gray-600">Unesite pojam za pretragu</p>;
  }

  const activeFilter = (filter || 'all') as Category;
  const results = await searchContent(query, activeFilter);

  return (
    <>
      <SearchFilters currentFilter={activeFilter} query={query} />
      
      <div className="mt-8">
        {results.length === 0 ? (
          <p className="text-gray-600">Nema rezultata za "{query}"</p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">Pronađeno {results.length} rezultata</p>
            <div className="space-y-4">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={getCategoryLink(result)}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(result.category)}`}>
                      {getCategoryLabel(result.category)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">{result.title}</h2>
                  <p className="text-gray-600 line-clamp-2">
                    {result.excerpt || result.content?.substring(0, 150)}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function getCategoryLink(result: any) {
  return `/blog/${result.slug}`;
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'zakoni': return 'bg-blue-100 text-blue-800';
    case 'sudska-praksa': return 'bg-purple-100 text-purple-800';
    case 'vijesti-clanci': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getCategoryLabel(category: string) {
  switch (category) {
    case 'zakoni': return 'Zakoni i podzakonski akti';
    case 'sudska-praksa': return 'Sudska praksa';
    case 'vijesti-clanci': return 'Vijesti i članci';
    default: return 'Ostalo';
  }
}
