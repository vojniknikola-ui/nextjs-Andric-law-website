'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function PublishQuizButton() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const publish = async () => {
    setStatus('loading');
    setMessage(null);
    try {
      const response = await fetch('/api/admin/publish-quiz', { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error ?? 'Objava nije uspjela.');
      }
      setStatus('success');
      setMessage('Kviz je objavljen u bazi.');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Objava nije uspjela.';
      setStatus('error');
      setMessage(text);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={publish}
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Sparkles className="size-4" />
        Objavi kviz
      </button>
      {message && (
        <p className={`text-xs ${status === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
