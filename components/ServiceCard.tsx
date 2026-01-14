'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  items: string[];
  description: string;
  featured?: boolean;
}

export function ServiceCard({ href, icon, title, items, description, featured }: ServiceCardProps) {
  const previewItems = items.slice(0, 3);
  const remainingCount = items.length - previewItems.length;

  return (
    <Link
      href={href}
      aria-label={`Saznaj više o ${title}`}
      className={`group relative text-left rounded-2xl border transition-colors duration-200 ${
        featured ? 'border-white/20 bg-white/10 hover:border-white/30' : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <div className="relative p-6 sm:p-7">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 size-12 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-slate-200">
            <div className="scale-125">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-slate-50 mb-2 group-hover:text-zinc-200 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-4" />

        {/* Items list */}
        <ul className="space-y-2.5 mb-4">
          {previewItems.map((item, index) => (
            <li 
              key={item} 
              className="flex items-start gap-3 text-sm text-slate-300 group/item"
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="shrink-0 mt-0.5">
                <div className="size-5 rounded-md border border-white/15 flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-zinc-300" />
                </div>
              </div>
              <span className="leading-relaxed group-hover/item:text-slate-200 transition-colors">
                {item}
              </span>
            </li>
          ))}
          {remainingCount > 0 && (
            <li className="text-xs text-slate-400">+ {remainingCount} više</li>
          )}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
          Saznaj više
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}
