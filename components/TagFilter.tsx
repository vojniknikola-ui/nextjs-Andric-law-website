'use client';

import { Tag } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(null)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
          selectedTag === null
            ? 'bg-zinc-400/90 text-zinc-950 font-semibold'
            : 'border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
        }`}
      >
        Sve
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
            selectedTag === tag
              ? 'bg-zinc-400/90 text-zinc-950 font-semibold'
              : 'border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Tag className="size-3" />
          {tag}
        </button>
      ))}
    </div>
  );
}
