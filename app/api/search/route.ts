import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export const runtime = 'edge';

const MOCK_LAWS = [
  { id: 1, title: 'Zakon o obligacionim odnosima FBiH', excerpt: 'Osnovni zakon koji reguliše obligacione odnose između fizičkih i pravnih lica. Uređuje ugovore, odgovornost za štetu, naknadu štete i druge obligacione odnose.', slug: 'zor-fbih', category: 'zakoni' },
  { id: 2, title: 'Zakon o radu FBiH', excerpt: 'Reguliše radne odnose između poslodavaca i radnika, prava i obaveze iz radnog odnosa, zaštitu radnika, radno vrijeme, odmor i odsustva.', slug: 'zakon-o-radu', category: 'zakoni' },
  { id: 3, title: 'Zakon o osiguranju od odgovornosti za motorna vozila', excerpt: 'Uređuje obavezno osiguranje od odgovornosti za štetu pričinjenu trećim licima upotrebom motornih vozila. Definiše prava oštećenih, obaveze osiguravača i postupak naknade štete.', slug: 'zakon-osiguranje-vozila', category: 'zakoni' },
  { id: 4, title: 'Zakon o poljoprivrednom zemljištu FBiH', excerpt: 'Reguliše pravni režim poljoprivrednog zemljišta, način korištenja, zaštitu, zakup i prodaju poljoprivrednog zemljišta u Federaciji BiH.', slug: 'zakon-poljoprivredno-zemljiste', category: 'zakoni' },
];

const MOCK_CASES = [
  { id: 5, title: 'Presuda Vrhovnog suda FBiH - Otkaz ugovora o radu', excerpt: 'Analiza presude o nezakonitom otkazu ugovora o radu. Sud je utvrdio da poslodavac nije poštovao proceduru i donio odluku o poništenju otkaza.', slug: 'presuda-otkaz', category: 'sudska-praksa' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const filter = searchParams.get('filter') || 'all';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  let results: any[] = [];

  try {
    if (filter === 'all' || filter === 'vijesti-clanci') {
      const posts = getBlogPosts();
      const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q)
      );
      results = [...results, ...filtered.map(p => ({ ...p, category: 'vijesti-clanci' }))];
    }

    if (filter === 'all' || filter === 'zakoni') {
      const zakoni = MOCK_LAWS.filter(z =>
        z.title.toLowerCase().includes(q) || z.excerpt.toLowerCase().includes(q)
      );
      results = [...results, ...zakoni];
    }

    if (filter === 'all' || filter === 'sudska-praksa') {
      const sudska = MOCK_CASES.filter(s =>
        s.title.toLowerCase().includes(q) || s.excerpt.toLowerCase().includes(q)
      );
      results = [...results, ...sudska];
    }

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
