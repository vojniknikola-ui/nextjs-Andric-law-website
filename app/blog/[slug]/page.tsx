import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calendar, BookOpen, Tag, Share2 } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// SSG - Generate static pages for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Članak nije pronađen',
    };
  }

  return {
    title: `${post.title} | Andrić Law Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export const revalidate = 0; // Always fetch fresh data
export const dynamicParams = true; // Allow dynamic params

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same tags)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border-b border-white/10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          fetchPriority="high"
          quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                <Tag className="size-3" /> {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-zinc-400/10 border border-zinc-300/20 flex items-center justify-center text-zinc-300 font-semibold">
                AL
              </div>
              <div>
                <p className="text-slate-200 font-medium">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              {new Date(post.date).toLocaleDateString('bs-BA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4" />
              {post.readMinutes} min čitanja
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none mt-10">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-100">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-zinc-300">
                    {children}
                  </code>
                ),
                hr: () => (
                  <hr className="my-10 border-white/10" />
                ),
                details: ({ node, ...props }) => {
                  const {
                    className = '',
                    children,
                    ...rest
                  } = props as DetailedHTMLProps<HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>;
                  return (
                    <details
                      {...rest}
                      className={`group rounded-2xl border border-blue-200/60 bg-blue-50/70 p-4 text-blue-900 shadow-sm transition-all [&[open]]:border-blue-400/80 [&[open]]:bg-blue-50/90 ${className}`}
                    >
                      {children}
                    </details>
                  );
                },
                summary: ({ node, ...props }) => {
                  const {
                    className = '',
                    children,
                    ...rest
                  } = props as DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
                  return (
                    <summary
                      {...rest}
                      className={`flex cursor-pointer select-none items-center justify-between gap-3 text-sm font-semibold text-blue-800 [&::-webkit-details-marker]:hidden ${className}`}
                    >
                      {children}
                    </summary>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Podijelite članak:</p>
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 hover:bg-white/5 transition text-sm">
                <Share2 className="size-4" />
                Podijeli
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-white/10 bg-slate-950/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Povezani članci
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Imate pravno pitanje?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Kontaktirajte nas za stručnu pravnu pomoć. Prvi poziv je besplatan.
            </p>
            <div className="mt-6">
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 transition"
              >
                Zakaži konsultacije
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
