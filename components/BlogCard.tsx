import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const formattedDate = formatDate(post.date);

  return (
    <article className={`group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}>
      <Link href={href} className="block">
        <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(148,163,184,0.12),transparent_35%)]" />
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
          {post.isLawDocument && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-900/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-100">
              <span>Digitalni zakon</span>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {formattedDate}
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

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy}.`;
}
