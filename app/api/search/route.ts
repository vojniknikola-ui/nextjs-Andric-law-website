import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export const runtime = 'edge';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const filter = searchParams.get('filter') || 'all';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  let results: any[] = [];

  try {
    const posts = await getAllPosts();
    
    results = posts.filter(p => {
      const searchText = `${p.title} ${p.content} ${p.excerpt}`.toLowerCase();
      const words = q.split(/\s+/).filter(w => w.length > 2);
      const matchesQuery = words.length === 0 ? 
        searchText.includes(q) :
        words.some(word => searchText.includes(word));
      
      if (filter === 'all') return matchesQuery;
      
      if (filter === 'zakoni') {
        return matchesQuery && p.tags.some(t => t.toLowerCase().includes('zakon'));
      }
      
      if (filter === 'sudska-praksa') {
        return matchesQuery && p.tags.some(t => t.toLowerCase().includes('pravosuđe'));
      }
      
      if (filter === 'vijesti-clanci') {
        return matchesQuery && !p.tags.some(t => t.toLowerCase().includes('zakon') || t.toLowerCase().includes('pravosuđe'));
      }
      
      return matchesQuery;
    }).map(p => ({
      ...p,
      category: p.tags.some(t => t.toLowerCase().includes('zakon')) ? 'zakoni' : 'vijesti-clanci'
    }))

    return NextResponse.json(
      { results: results.slice(0, 10) },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
