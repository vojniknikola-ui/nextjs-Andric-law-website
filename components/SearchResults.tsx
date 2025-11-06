import { getAllPosts } from '@/lib/blog';
import SearchFilters from './SearchFilters';

type Category = 'zakoni' | 'sudska-praksa' | 'vijesti-clanci' | 'all';

function calculateRelevance(post: any, query: string) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  
  const title = post.title.toLowerCase();
  const content = (post.content || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  
  // Exact phrase match in title = highest score
  if (title.includes(q)) score += 100;
  
  // Word matches in title
  words.forEach(word => {
    if (title.includes(word)) score += 50;
  });
  
  // Exact phrase in excerpt
  if (excerpt.includes(q)) score += 30;
  
  // Word matches in excerpt
  words.forEach(word => {
    if (excerpt.includes(word)) score += 15;
  });
  
  // Word matches in content
  words.forEach(word => {
    const matches = (content.match(new RegExp(word, 'g')) || []).length;
    score += Math.min(matches * 2, 20); // Max 20 points per word from content
  });
  
  return score;
}

function extractRelevantSnippet(text: string, query: string, maxLength: number = 300) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  const lowerText = text.toLowerCase();
  
  // Try to find exact phrase first
  let bestIndex = lowerText.indexOf(q);
  
  // If not found, find best matching word
  if (bestIndex === -1) {
    for (const word of words) {
      const index = lowerText.indexOf(word);
      if (index !== -1) {
        bestIndex = index;
        break;
      }
    }
  }
  
  if (bestIndex === -1) {
    return text.substring(0, maxLength) + '...';
  }
  
  // Look for paragraph/section markers (##, Član, numbered sections)
  const beforeMatch = text.substring(0, bestIndex);
  const afterMatch = text.substring(bestIndex);
  
  // Find start of current section
  const sectionMarkers = [/\n## /g, /\n### /g, /Član \d+/gi, /\n\*\*\(\d+\)\*\*/g];
  let sectionStart = 0;
  
  for (const marker of sectionMarkers) {
    const matches = [...beforeMatch.matchAll(marker)];
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      sectionStart = Math.max(sectionStart, lastMatch.index || 0);
    }
  }
  
  // Find end of current section (next section or paragraph break)
  let sectionEnd = text.length;
  for (const marker of sectionMarkers) {
    const match = afterMatch.match(marker);
    if (match && match.index !== undefined) {
      sectionEnd = Math.min(sectionEnd, bestIndex + match.index);
    }
  }
  
  // If section is too long, limit it
  if (sectionEnd - sectionStart > maxLength) {
    sectionStart = Math.max(sectionStart, bestIndex - 100);
    sectionEnd = Math.min(sectionEnd, bestIndex + 200);
  }
  
  let snippet = text.substring(sectionStart, sectionEnd).trim();
  
  // Clean up markdown
  snippet = snippet.replace(/^#+\s*/gm, '').replace(/\*\*/g, '');
  
  if (sectionStart > 0) snippet = '...' + snippet;
  if (sectionEnd < text.length) snippet = snippet + '...';
  
  return snippet;
}

async function searchContent(query: string, filter: Category) {
  const posts = await getAllPosts();
  
  const results = posts
    .map(p => {
      const score = calculateRelevance(p, query);
      const matchesFilter = 
        filter === 'all' ||
        (filter === 'zakoni' && p.tags.some(t => t.toLowerCase().includes('zakon'))) ||
        (filter === 'sudska-praksa' && p.tags.some(t => t.toLowerCase().includes('pravosuđe'))) ||
        (filter === 'vijesti-clanci' && !p.tags.some(t => t.toLowerCase().includes('zakon') || t.toLowerCase().includes('pravosuđe')));
      
      return {
        ...p,
        id: p.slug,
        score,
        matchesFilter,
        relevantSnippet: extractRelevantSnippet(p.content || p.excerpt || '', query),
        category: p.tags.some(t => t.toLowerCase().includes('zakon')) ? 'zakoni' : 'vijesti-clanci'
      };
    })
    .filter(p => p.score > 0 && p.matchesFilter)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);
  
  return results;
}

function highlightText(text: string, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let highlighted = text;
  
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 font-semibold">$1</mark>');
  });
  
  return highlighted;
}

export default async function SearchResults({ query, filter }: { query?: string; filter?: string }) {
  if (!query) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Kako pretraživati?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Unesite ključne riječi (npr. "otkaz ugovora", "osnivanje doo")</li>
          <li>• Koristite filtere za preciznije rezultate</li>
          <li>• Pretraga traži kroz naslove, sadržaj i tagove</li>
        </ul>
      </div>
    );
  }

  const activeFilter = (filter || 'all') as Category;
  const results = await searchContent(query, activeFilter);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Pretražujete:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
            "{query}"
          </span>
        </div>
        <SearchFilters currentFilter={activeFilter} query={query} />
      </div>
      
      <div className="mt-8">
        {results.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nema rezultata za "{query}"
            </h3>
            <p className="text-gray-600 mb-4">
              Pokušajte sa drugačijim ključnim riječima ili promijenite filter.
            </p>
            <div className="text-sm text-gray-500">
              <p className="font-medium mb-2">Prijedlozi:</p>
              <ul className="space-y-1">
                <li>• Koristite opštenije termine</li>
                <li>• Provjerite pravopis</li>
                <li>• Pokušajte sa "Sve" filterom</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">Pronađeno {results.length} rezultata</p>
            <div className="space-y-4">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={getCategoryLink(result)}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-blue-500"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getCategoryColor(result.category)}`}>
                      {getCategoryLabel(result.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {result.readMinutes} min čitanja
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition">
                    {result.title}
                  </h2>
                  <div className="bg-gray-50 border-l-2 border-blue-400 p-3 mb-3 rounded">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Pronađeno u tekstu:</p>
                    <p 
                      className="text-gray-800 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(result.relevantSnippet || result.excerpt || '', query) 
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>•</span>
                    <span>{new Date(result.date).toLocaleDateString('bs-BA')}</span>
                    {result.tags && result.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
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
