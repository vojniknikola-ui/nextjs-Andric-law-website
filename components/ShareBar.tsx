'use client';

import { Facebook, Linkedin, Link as LinkIcon, MessageCircle } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareBar({ title, url, className }: ShareBarProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="size-4" />,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="size-4" />,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle className="size-4" />,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link kopiran');
    } catch (error) {
      console.warn('Copy failed', error);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-slate-400 ${className ?? ''}`}>
      <span className="text-slate-500">Podijeli:</span>
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-100 hover:bg-white/10 hover:border-white/20 transition"
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-100 hover:bg-white/10 hover:border-white/20 transition"
      >
        <LinkIcon className="size-4" />
        Kopiraj link
      </button>
    </div>
  );
}
