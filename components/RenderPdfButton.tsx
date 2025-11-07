'use client';

import { useState } from 'react';

interface RenderPdfButtonProps {
  label: string;
  className?: string;
}

export function RenderPdfButton({ label, className }: RenderPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = () => {
    if (typeof window === 'undefined') {
      return;
    }
    setIsGenerating(true);
    const currentUrl = window.location.href;
    const target = `/api/render-pdf?url=${encodeURIComponent(currentUrl)}`;
    window.location.href = target;
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className ?? ''} ${isGenerating ? 'opacity-80' : ''}`}
      disabled={isGenerating}
    >
      {isGenerating ? 'Generisanje…' : label}
    </button>
  );
}
