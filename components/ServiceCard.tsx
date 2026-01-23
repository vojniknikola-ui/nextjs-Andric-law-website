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
      className="group relative text-left rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 transition-all duration-200 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="shrink-0 size-12 rounded-xl bg-slate-950 flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-950 mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="h-px bg-slate-200 mb-5" />

      <ul className="space-y-2.5 mb-5">
        {previewItems.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
            <div className="shrink-0 mt-0.5">
              <div className="size-5 rounded-md bg-slate-100 flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-slate-950" />
              </div>
            </div>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
        {remainingCount > 0 && (
          <li className="text-xs text-slate-500">+ {remainingCount} više</li>
        )}
      </ul>

      <div className="flex items-center gap-2 pt-4 border-t border-slate-200 text-sm font-semibold text-slate-950 group-hover:gap-3 transition-all">
        Saznaj više
        <ArrowRight className="size-4" />
      </div>
    </Link>
  );
}
