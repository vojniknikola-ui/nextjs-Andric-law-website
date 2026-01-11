'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  items: string[];
  description: string;
  featured?: boolean;
}

export function ServiceCard({ href, icon, title, items, description, featured }: ServiceCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Saznaj više o ${title}`}
      className={`group relative text-left rounded-3xl border transition-all duration-400 overflow-hidden ${
        featured
          ? 'border-zinc-300/30 bg-gradient-to-br from-zinc-400/10 via-white/4 to-transparent hover:border-zinc-300/50 hover:shadow-xl hover:shadow-zinc-300/10'
          : 'border-white/8 bg-gradient-to-br from-white/4 to-transparent hover:border-white/16 hover:shadow-lg hover:shadow-black/20'
      } hover:-translate-y-0.5 hover:scale-[1.01]`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-300/0 via-zinc-400/5 to-zinc-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-400/20 backdrop-blur-sm border border-zinc-400/30 px-3 py-1 text-xs font-semibold text-zinc-300">
            <Sparkles className="size-3" />
            Popularno
          </div>
        </div>
      )}

      <div className="relative p-7 sm:p-8">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 size-14 rounded-2xl bg-gradient-to-br from-zinc-400/15 to-zinc-500/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-400">
            <div className="scale-125">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-slate-50 mb-2 group-hover:text-zinc-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

        {/* Items list */}
        <ul className="space-y-2.5 mb-5">
          {items.map((item, index) => (
            <li 
              key={item} 
              className="flex items-start gap-3 text-sm text-slate-300 group/item"
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="shrink-0 mt-0.5">
                <div className="size-5 rounded-md bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover/item:bg-zinc-400/15 transition-colors">
                  <div className="size-1.5 rounded-full bg-zinc-300" />
                </div>
              </div>
              <span className="leading-relaxed group-hover/item:text-slate-200 transition-colors">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/7">
          <span className="text-sm font-medium text-slate-300 group-hover:text-zinc-200 transition-colors">
            Saznaj više
          </span>
          <div className="size-10 rounded-xl bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center group-hover:bg-zinc-400/20 group-hover:border-zinc-400/30 transition-all">
            <ArrowRight className="size-4 text-zinc-200 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-400/5 via-transparent to-transparent" />
      </div>
    </Link>
  );
}
