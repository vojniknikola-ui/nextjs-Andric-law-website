import Link from 'next/link';
import Image from 'next/image';
import { Calendar, BookOpen, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative w-full overflow-hidden ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-700/30 via-slate-800 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 text-xs">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-zinc-300">
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>
          <h3 className={`mt-3 font-semibold group-hover:text-zinc-300 transition ${featured ? 'text-2xl' : 'text-lg'}`}>
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-slate-300 line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString('bs-BA')}
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen className="size-3" />
                {post.readMinutes} min
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm text-zinc-300 group-hover:gap-2 transition-all">
              Čitaj <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
