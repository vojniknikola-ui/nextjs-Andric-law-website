import { getAllPosts } from '@/lib/blog';
import SearchFilters from './SearchFilters';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

const MOCK_DATA = {
  zakoni: [
    { id: 1, title: 'Zakon o obligacionim odnosima FBiH', excerpt: 'Osnovni zakon koji reguliše obligacione odnose između fizičkih i pravnih lica. Uređuje ugovore, odgovornost za štetu, naknadu štete i druge obligacione odnose.', slug: 'zor-fbih', articleId: null },
    { id: 2, title: 'Zakon o radu FBiH', excerpt: 'Reguliše radne odnose između poslodavaca i radnika, prava i obaveze iz radnog odnosa, zaštitu radnika, radno vrijeme, odmor i odsustva.', slug: 'zakon-o-radu', articleId: null },
    { id: 3, title: 'Zakon o osiguranju od odgovornosti za motorna vozila', excerpt: 'Uređuje obavezno osiguranje od odgovornosti za štetu pričinjenu trećim licima upotrebom motornih vozila. Definiše prava oštećenih, obaveze osiguravača i postupak naknade štete.', slug: 'zakon-osiguranje-vozila', articleId: null },
    { id: 4, title: 'Zakon o poljoprivrednom zemljištu FBiH', excerpt: 'Reguliše pravni režim poljoprivrednog zemljišta, način korištenja, zaštitu, zakup i prodaju poljoprivrednog zemljišta u Federaciji BiH.', slug: 'zakon-poljoprivredno-zemljiste', articleId: null },
  ],
  'sudska-praksa': [
    { id: 5, title: 'Presuda Vrhovnog suda FBiH - Otkaz ugovora o radu', excerpt: 'Analiza presude o nezakonitom otkazu ugovora o radu. Sud je utvrdio da poslodavac nije poštovao proceduru i donio odluku o poništenju otkaza.', slug: 'presuda-otkaz', articleId: null },
  ]
};

async function searchContent(query: string, filter: Category) {
  const posts = await getAllPosts();
  
  let results: any[] = [];
  
  if (filter === 'all' || filter === 'vijesti-clanci') {
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content?.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(query.toLowerCase())
    );
    results = [...results, ...filtered.map(p => ({ ...p, category: 'vijesti-clanci' }))];
  }
  
  if (filter === 'all' || filter === 'zakoni') {
    const zakoni = MOCK_DATA.zakoni.filter(z =>
      z.title.toLowerCase().includes(query.toLowerCase()) ||
      z.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    results = [...results, ...zakoni.map(z => ({ ...z, category: 'zakoni' }))];
  }
  
  if (filter === 'all' || filter === 'sudska-praksa') {
    const sudska = MOCK_DATA['sudska-praksa'].filter(s =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    results = [...results, ...sudska.map(s => ({ ...s, category: 'sudska-praksa' }))];
  }
  
  return results.slice(0, 10);
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
  if (result.category === 'zakoni') return `/zakoni/${result.slug}`;
  if (result.category === 'sudska-praksa') return `/sudska-praksa/${result.slug}`;
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
