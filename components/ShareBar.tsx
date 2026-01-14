'use client';

import { Facebook, Linkedin, Link as LinkIcon, MessageCircle, Share2 } from 'lucide-react';
import { useMemo } from 'react';

interface ShareBarProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareBar({ title, url, className }: ShareBarProps) {
  const { encodedUrl, encodedTitle, currentUrl } = useMemo(() => {
    const href = typeof window !== 'undefined' ? window.location.href : url;
    return {
      currentUrl: href,
      encodedUrl: encodeURIComponent(href),
      encodedTitle: encodeURIComponent(title),
    };
  }, [title, url]);

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
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback na prompt ako clipboard API nije dostupno (lokalni dev/http)
        window.prompt('Kopirajte link', currentUrl);
      }
      alert('Link kopiran');
    } catch (error) {
      console.warn('Copy failed', error);
    }
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: currentUrl });
      } else {
        copyLink();
      }
    } catch (error) {
      console.warn('Native share cancelled or failed', error);
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
      <button
        type="button"
        onClick={nativeShare}
        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-100 hover:bg-white/10 hover:border-white/20 transition"
      >
        <Share2 className="size-4" />
        Native
      </button>
    </div>
  );
}
