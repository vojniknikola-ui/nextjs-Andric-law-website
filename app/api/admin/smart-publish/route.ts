import { NextResponse } from 'next/server';
import { getDb, cmsPosts } from '@/db';
import { parseSmartBlog, generateSlug, autoFormatContent } from '@/lib/smartParsers';

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL nije postavljen.' }, { status: 503 });
  }

  try {
    const { content, title: providedTitle, type = 'blog' } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Sadržaj je obavezan.' }, { status: 400 });
    }

    const formattedContent = autoFormatContent(content);
    
    if (type === 'blog') {
      const parsed = parseSmartBlog(formattedContent);
      const title = providedTitle || parsed.title;
      const slug = generateSlug(title);
      
      const db = getDb();
      const now = new Date();
      
      // Check if slug exists and make unique
      const uniqueSlug = await ensureUniqueSlug(db, slug);
      
      const [post] = await db.insert(cmsPosts).values({
        slug: uniqueSlug,
        title,
        contentMd: parsed.content,
        excerpt: parsed.excerpt,
        tags: parsed.tags,
        readMinutes: parsed.readMinutes,
        authorName: 'Andrić Law',
        authorRole: 'Advokatski ured',
        featured: parsed.metadata.complexity === 'complex',
        publishedAt: now.toISOString().slice(0, 10),
        createdAt: now,
      }).returning();

      return NextResponse.json({
        success: true,
        post,
        analysis: {
          ...parsed.metadata,
          autoTags: parsed.tags,
          readTime: parsed.readMinutes,
          excerptGenerated: !providedTitle,
        }
      });
    }

    return NextResponse.json({ error: 'Nepodržan tip sadržaja.' }, { status: 400 });
    
  } catch (error: any) {
    console.error('[smart-publish] error:', error);
    return NextResponse.json({ 
      error: error?.message || 'Greška pri objavi.' 
    }, { status: 500 });
  }
}

async function ensureUniqueSlug(db: ReturnType<typeof getDb>, baseSlug: string): Promise<string> {
  let candidate = baseSlug;
  let suffix = 2;
  
  while (true) {
    const existing = await db.query.cmsPosts.findFirst({
      where: (posts, { eq }) => eq(posts.slug, candidate)
    });
    
    if (!existing) return candidate;
    
    candidate = `${baseSlug}-${suffix}`;
    suffix++;
  }
}