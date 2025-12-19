import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Tag, Share2 } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { promises as fs } from 'fs';
import path from 'path';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const FALLBACK_OG_IMAGE = 'https://andric.law/fallbacks/andric-law.jpg';

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

  const canonicalUrl = post.canonicalUrl || `https://andric.law/blog/${post.slug}`;

  return {
    title: `${post.title} | Andrić Law Blog`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      url: canonicalUrl,
      images: [{ url: FALLBACK_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Andrić Law Blog`,
      description: post.excerpt,
      images: [FALLBACK_OG_IMAGE],
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

  const lawText = await loadLawText(post.lawFile);

  // Get related posts (same tags)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      {/* Hero Image */}
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
          </div>

          {post.isLawDocument && (
            <div className="mt-8 mb-8 rounded-2xl border border-blue-400/40 bg-blue-950/40 p-6 text-sm text-blue-50 shadow-lg">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                    Digitalni zakon
                  </p>
                  <p className="mt-2 text-blue-50">
                    Kompletan tekst objavljen je u nastavku ove stranice, formatiran za pretragu i citiranje.
                  </p>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  {post.lawSlug && (
                    <Link
                      href={`/zakoni/${post.lawSlug}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-300/40 px-4 py-2 text-sm font-semibold text-blue-50 hover:bg-blue-500/10"
                    >
                      Otvori zakon
                    </Link>
                  )}
                  {resolveLawFile(post.lawFile) && (
                    <a
                      href={resolveLawFile(post.lawFile)!}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm text-blue-100 hover:bg-white/10"
                      download
                    >
                      Preuzmi tekst
                    </a>
                  )}
                </div>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-blue-300">Objava</dt>
                  <dd className="mt-1 text-base text-blue-50">
                    {post.lawMeta?.citation ?? 'Neslužbena konsolidacija'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-blue-300">Status</dt>
                  <dd className="mt-1 text-base text-blue-50">
                    {post.lawMeta?.status ?? 'Radna verzija'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-blue-300">Datum</dt>
                  <dd className="mt-1 text-base text-blue-50">
                    {post.lawMeta?.publishedAt
                      ? new Date(post.lawMeta.publishedAt).toLocaleDateString('bs-BA')
                      : new Date(post.date).toLocaleDateString('bs-BA')}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* Content + Disclaimer */}
          <div className="mt-10 space-y-8">
            <div className="prose prose-invert prose-slate max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
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
                  pre: ({ children }) => (
                    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-inner">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <hr className="my-10 border-white/10" />
                  ),
                  details: ({ node, ...props }) => {
                    void node;
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
                    void node;
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Informacije na ovoj stranici služe samo u informativne svrhe i ne predstavljaju pravni savjet. Za zvanično tumačenje obratite se nadležnim izvorima ili kontaktirajte Andrić Law.
            </div>
          </div>

          {lawText && (
            <LawTextSection text={lawText} />
          )}

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

async function loadLawText(lawFile?: string | string[]): Promise<string | null> {
  if (!lawFile) return null;
  const files = Array.isArray(lawFile) ? lawFile : [lawFile];
  try {
    const contents = await Promise.all(
      files.map(async (file) => {
        const relative = file.startsWith('/') ? file.slice(1) : file;
        const filePath = path.join(process.cwd(), 'public', relative);
        return fs.readFile(filePath, 'utf-8');
      }),
    );
    return contents.join('\n\n');
  } catch (error) {
    console.warn('Failed to load law text', error);
    return null;
  }
}

function LawTextSection({ text }: { text: string }) {
  return (
    <section id="tekst-zakona" className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-relaxed text-slate-200 shadow-lg shadow-black/20">
      <h2 className="text-2xl font-semibold text-white">Tekst zakona</h2>
      <div className="mt-4 whitespace-pre-wrap text-slate-100/90">{text}</div>
    </section>
  );
}

function resolveLawFile(lawFile?: string | string[] | null) {
  if (!lawFile) return null;
  return Array.isArray(lawFile) ? lawFile[0] : lawFile;
}
