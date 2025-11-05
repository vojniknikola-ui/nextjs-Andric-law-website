'use client';

import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { BlogCard } from '@/components/BlogCard';
import { TagFilter } from '@/components/TagFilter';

interface BlogClientWrapperProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogClientWrapper({ posts, tags }: BlogClientWrapperProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const featuredPost = filteredPosts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || p !== featuredPost);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tag Filter */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Filtriraj po kategoriji
          </h2>
          <TagFilter
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-slate-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'članak' : 'članaka'}
            {selectedTag && ` u kategoriji "${selectedTag}"`}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Post */}
          {featuredPost && (
            <BlogCard post={featuredPost} featured />
          )}

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">
              Nema članaka u ovoj kategoriji.
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-zinc-300 hover:text-zinc-200 underline"
            >
              Prikaži sve članke
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
