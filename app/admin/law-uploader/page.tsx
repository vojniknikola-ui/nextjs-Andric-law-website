'use client';

import { useCallback, useMemo, useState, useEffect, Suspense, type CSSProperties } from 'react';
import { useSearchParams } from 'next/navigation';
import LawViewer from '@/components/LawViewer';
import { generateSlug } from '@/lib/smartParsers';
import { Space_Grotesk, Newsreader } from 'next/font/google';

const uiFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-ui' });
const readingFont = Newsreader({ subsets: ['latin'], variable: '--font-reading' });

const SAMPLE_TEXT = `# Primjer zakona

## GLAVA I – Opće odredbe

Član 1
Ovim uzorkom demonstriramo kako pregled zakona prikazuje naslove i članke.

Član 2
Svaki član treba biti na zasebnoj liniji.
`;

const INITIAL_BADGE = 'Andrić Law · Novi zakon';
const TODAY = new Date().toISOString().slice(0, 10);
const THEME_VARS = {
  '--canvas': '#f6f4ef',
  '--panel': '#ffffff',
  '--ink': '#0f172a',
  '--muted': '#5b6474',
  '--accent': '#0ea5e9',
  '--accent-strong': '#0369a1',
  '--accent-soft': '#e0f2fe',
  '--border': 'rgba(15, 23, 42, 0.1)',
} as CSSProperties;

function LawUploaderContent() {
  const [lawText, setLawText] = useState<string>(SAMPLE_TEXT);
  const [badge, setBadge] = useState(INITIAL_BADGE);
  const [title, setTitle] = useState('Novi zakon – radna verzija');
  const [slug, setSlug] = useState('novi-zakon');
  const [slugEdited, setSlugEdited] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('/laws/novi-zakon.pdf');
  const [changeNotes, setChangeNotes] = useState('Službeni glasnik – unesite referencu izmjena');
  const [excerpt, setExcerpt] = useState('Kratak podnaslov / opis za blog karticu ili hero.');
  const [tagsInput, setTagsInput] = useState('zakon, digitalni');
  const [contentType, setContentType] = useState<'law' | 'blog'>('law');
  const [blogIsLawDocument, setBlogIsLawDocument] = useState(false);
  const [lawSlug, setLawSlug] = useState('');
  const [lawSlugEdited, setLawSlugEdited] = useState(false);
  const [lawCitation, setLawCitation] = useState('');
  const [lawStatus, setLawStatus] = useState('radna verzija');
  const [lawPublishedAt, setLawPublishedAt] = useState(TODAY);
  const [publishLawCard, setPublishLawCard] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isApplyingInstruction, setIsApplyingInstruction] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [aiInstruction, setAiInstruction] = useState('remove=Ovim se Zakonom');
  const searchParams = useSearchParams();

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setLawText(text);
        const meta = extractMetaFromMarkdown(text, file.name);
        if (meta.slug) setSlug(meta.slug);
        if (meta.title) setTitle(meta.title);
        if (meta.excerpt) setExcerpt(meta.excerpt);
        if (meta.tags && meta.tags.length > 0) setTagsInput(meta.tags.join(', '));
        setStatusMsg(`Učitan fajl: ${file.name}`);
      }
    };
    reader.readAsText(file, 'utf-8');
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        handleFiles(event.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const stats = useMemo(() => {
    if (!lawText) {
      return { articles: 0, heads: 0, words: 0 };
    }
    const articleMatches = lawText.match(/(?:Član(?:ak)?|Clan(?:ak)?|Čl\.|Cl\.)\s+[A-Z0-9.\-]+/gi) ?? [];
    const headMatches = lawText.match(/GLAVA\s+[IVXLC0-9.\-]+/gi) ?? [];
    const words = lawText.trim().split(/\s+/).length;
    return {
      articles: articleMatches.length,
      heads: headMatches.length,
      words,
    };
  }, [lawText]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lawText);
      setStatusMsg('Tekst kopiran u clipboard.');
    } catch {
      setStatusMsg('Neuspjelo kopiranje.');
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([lawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug || 'novi-zakon'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const cleanText = () => {
    const cleaned = lawText
      .replace(/\\\./g, '.') // ukloni \. iz exporta
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    setLawText(cleaned);
    setStatusMsg('Tekst očišćen (uklonjeni višestruki novi redovi i \\.).');
  };

  const autoFormat = async () => {
    if (!lawText.trim()) {
      setStatusMsg('Nema sadržaja za formatiranje.');
      return;
    }
    setIsFormatting(true);
    try {
      const response = await fetch('/api/admin/format-law', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lawText }),
      });
      if (!response.ok) {
        throw new Error('Formatiranje nije uspjelo');
      }
      const data = await response.json();
      setLawText(data.formattedText);
      setStatusMsg(`Automatski poredano po ${data.articleCount} članova.`);
    } catch (error) {
      console.error(error);
      setStatusMsg('AI formatiranje nije uspjelo.');
    } finally {
      setIsFormatting(false);
    }
  };

  const applyInstruction = async (instructionText?: string) => {
    const instructionValue = (instructionText ?? aiInstruction).trim();
    if (!lawText.trim()) {
      setStatusMsg('Nema sadržaja za obradu.');
      return;
    }
    if (!instructionValue) {
      setStatusMsg('Unesite instrukciju (npr. remove=Ovim se Zakonom).');
      return;
    }
    setIsApplyingInstruction(true);
    try {
      const response = await fetch('/api/admin/format-law', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lawText, instruction: instructionValue }),
      });
      if (!response.ok) {
        throw new Error('Instrukcija nije uspjela');
      }
      const data = await response.json();
      setLawText(data.formattedText);
      setStatusMsg('Instrukcija primijenjena.');
    } catch (error) {
      console.error(error);
      setStatusMsg('Neuspjela primjena instrukcije.');
    } finally {
      setIsApplyingInstruction(false);
    }
  };

  const splitTags = (value: string) =>
    value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

  const buildLawMeta = (fallbackCitation?: string) => {
    const citationValue = lawCitation.trim() || fallbackCitation?.trim();
    const statusValue = lawStatus.trim();
    const dateValue = lawPublishedAt.trim();
    if (!citationValue && !statusValue && !dateValue) {
      return null;
    }
    return {
      citation: citationValue || undefined,
      status: statusValue || undefined,
      publishedAt: dateValue || undefined,
    };
  };

  const normalizeDateInput = (value: unknown) => {
    if (typeof value === 'string' && value.trim()) {
      return value.trim().slice(0, 10);
    }
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toISOString().slice(0, 10);
    }
    return TODAY;
  };

  const buildLawCardContent = (actSlug: string) => {
    const trimmedExcerpt = excerpt.trim();
    const trimmedNotes = changeNotes.trim();
    const lines = [`# ${title}`];

    if (trimmedExcerpt) {
      lines.push('', trimmedExcerpt);
    } else {
      lines.push('', 'Digitalni zakon dostupan je u našoj bazi za brzo pretraživanje.');
    }

    if (trimmedNotes) {
      lines.push('', `**Napomena:** ${trimmedNotes}`);
    }

    lines.push('', `[Otvori zakon](/zakoni/${actSlug})`);
    return lines.join('\n');
  };

  const publishLawCardForAct = async (actSlug: string) => {
    const tags = splitTags(tagsInput);
    const lawMeta = buildLawMeta(badge);
    const payload = {
      slug: actSlug,
      title,
      excerpt,
      content: buildLawCardContent(actSlug),
      tags: tags.length > 0 ? tags : ['Zakoni', 'Digitalni zakon'],
      featured: isFeatured,
      isLawDocument: true,
      lawSlug: actSlug,
      lawMeta,
    };

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatusMsg(data.error ?? 'Objava blog kartice nije uspjela.');
      return false;
    }

    return true;
  };

  const publishToBackend = async () => {
    if (!slug.trim() || !title.trim() || !lawText.trim()) {
      setStatusMsg('Popunite slug, naslov i tekst prije objave.');
      return;
    }
    setIsPublishing(true);
    setStatusMsg(null);
    try {
      if (contentType === 'law') {
        const res = await fetch('/api/admin/acts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug,
            title,
            lawText,
            jurisdiction: 'BiH',
            publishedAt: lawPublishedAt || new Date().toISOString().slice(0, 10),
            officialNumber: badge,
            officialUrl: mediaUrl || null,
            summary: changeNotes,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatusMsg(data.error ?? 'Objava nije uspjela.');
          return;
        }
        const actSlug = data.act?.slug ?? slug;
        let message = `Objavljen zakon (članova: ${data.provisionsInserted ?? 0}).`;

        if (publishLawCard) {
          const ok = await publishLawCardForAct(actSlug);
          message = ok ? `${message} Kreirana blog kartica.` : `${message} Kartica nije kreirana.`;
        }

        setStatusMsg(message);
      } else {
        const lawMeta = blogIsLawDocument ? buildLawMeta() : null;
        const linkedLawSlug = blogIsLawDocument ? (lawSlug.trim() || slug) : null;

        const res = await fetch('/api/admin/posts', {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug,
            title,
            excerpt,
            content: lawText,
            tags: splitTags(tagsInput),
            featured: isFeatured,
            isLawDocument: blogIsLawDocument,
            lawSlug: linkedLawSlug,
            lawMeta,
            heroImageUrl: mediaUrl || null,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatusMsg(data.error ?? 'Objava bloga nije uspjela.');
          return;
        }
        setStatusMsg(isEditing ? 'Ažuriran blog članak.' : 'Objavljen blog članak.');
        setIsEditing(true);
      }
    } catch {
      setStatusMsg('Objava nije uspjela.');
    } finally {
      setIsPublishing(false);
    }
  };

  const loadExisting = async (
    overrideSlug?: string,
    mode: 'law' | 'blog' | 'auto' = 'auto',
  ) => {
    const targetSlug = (overrideSlug ?? slug).trim();
    if (!targetSlug) {
      setStatusMsg('Unesi slug koji želiš učitati.');
      return;
    }

    const loadBlog = async (silentNotFound = false) => {
      if (!silentNotFound) {
        setStatusMsg('Učitavanje blog objave…');
      }
      try {
        const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(targetSlug)}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.item) {
          if (!silentNotFound) {
            setStatusMsg(data.error ?? 'Post nije pronađen.');
          }
          return false;
        }
        const post = data.item;
        setTitle(post.title ?? title);
        setSlug(post.slug ?? targetSlug);
        setSlugEdited(true);
        setExcerpt(post.excerpt ?? excerpt);
        setLawText(post.contentMd ?? lawText);
        setTagsInput(Array.isArray(post.tags) ? post.tags.join(', ') : tagsInput);
        setMediaUrl(post.heroImageUrl ?? '');
        setBlogIsLawDocument(Boolean(post.isLawDocument));
        setContentType('blog');
        setLawSlug(post.lawSlug ?? '');
        setLawSlugEdited(Boolean(post.lawSlug));
        setLawCitation(post.lawMeta?.citation ?? '');
        setLawStatus(post.lawMeta?.status ?? 'radna verzija');
        setLawPublishedAt(normalizeDateInput(post.lawMeta?.publishedAt));
        setIsFeatured(Boolean(post.featured));
        setIsEditing(true);
        setStatusMsg('Post učitan. Možeš urediti i sačuvati.');
        return true;
      } catch {
        if (!silentNotFound) {
          setStatusMsg('Neuspjelo učitavanje posta.');
        }
        return false;
      }
    };

    const loadLaw = async (silentNotFound = false) => {
      if (!silentNotFound) {
        setStatusMsg('Učitavanje zakona…');
      }
      try {
        const res = await fetch(`/api/admin/acts?slug=${encodeURIComponent(targetSlug)}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.act) {
          if (!silentNotFound) {
            setStatusMsg(data.error ?? 'Zakon nije pronađen.');
          }
          return false;
        }
        const act = data.act;
        setTitle(act.title ?? title);
        setSlug(act.slug ?? targetSlug);
        setSlugEdited(true);
        setLawText(data.lawText ?? lawText);
        setMediaUrl(act.officialUrl ?? '');
        setBadge(act.officialNumber ?? badge);
        setChangeNotes(act.summary ?? changeNotes);
        setLawPublishedAt(normalizeDateInput(act.publishedAt));
        setContentType('law');
        setIsEditing(false);
        setStatusMsg('Zakon učitan. Možeš nastaviti uređivanje.');
        return true;
      } catch {
        if (!silentNotFound) {
          setStatusMsg('Neuspjelo učitavanje zakona.');
        }
        return false;
      }
    };

    if (mode === 'blog') {
      await loadBlog();
      return;
    }
    if (mode === 'law') {
      await loadLaw();
      return;
    }

    const blogLoaded = await loadBlog(true);
    if (!blogLoaded) {
      await loadLaw();
    }
  };

  useEffect(() => {
    const typeParam = searchParams?.get('type');
    const modeParam = typeParam === 'blog' || typeParam === 'law' ? typeParam : 'auto';
    if (typeParam === 'blog' || typeParam === 'law') {
      setContentType(typeParam);
    }
    const slugParam = searchParams?.get('slug');
    if (slugParam) {
      setSlug(slugParam);
      setSlugEdited(true);
      loadExisting(slugParam, modeParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!slugEdited && title.trim()) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  useEffect(() => {
    if (blogIsLawDocument && !lawSlugEdited && slug.trim()) {
      setLawSlug(slug);
    }
  }, [blogIsLawDocument, lawSlugEdited, slug]);

  const generationSnippet = useMemo(() => {
    if (contentType === 'law') {
      return `# Koraci za objavu zakona
1. Naslov: ${title}
2. Slug: ${slug || 'novi-zakon'}
3. Službeni PDF/URL: ${mediaUrl || 'n/a'}
4. Objavi u bazu klikom na "Objavi u bazu"
5. ${publishLawCard ? 'Blog kartica će biti kreirana automatski.' : 'Blog karticu kreiraj u modu "Objava bloga".'}
`;
    }

    return `# Koraci za objavu bloga
1. Naslov: ${title}
2. Slug: ${slug || 'novi-blog'}
3. Tagovi: ${tagsInput || 'n/a'}
4. Hero URL: ${mediaUrl || 'n/a'}
${blogIsLawDocument ? `5. Poveži zakon: ${lawSlug || slug}` : ''}
`;
  }, [contentType, title, slug, mediaUrl, publishLawCard, tagsInput, blogIsLawDocument, lawSlug]);

  const statusTone = useMemo(() => {
    if (!statusMsg) return 'info';
    const text = statusMsg.toLowerCase();
    if (/(nije|neusp|grešk|gresk|error|fail)/.test(text)) return 'error';
    if (/(objavljen|učitan|kreirana|primijenjena|formatiran|kopiran|ažuriran)/.test(text)) return 'success';
    return 'info';
  }, [statusMsg]);

  const statusStyles =
    statusTone === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-900'
      : statusTone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
        : 'border-slate-200 bg-slate-50 text-slate-800';

  return (
    <div
      style={THEME_VARS}
      className={`${uiFont.variable} ${readingFont.variable} font-[var(--font-ui)] relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--canvas)] px-6 py-10 text-[var(--ink)] shadow-[0_40px_120px_-90px_rgba(15,23,42,0.45)] sm:px-10`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.16),transparent_70%)]" />
      </div>

      <div className="relative space-y-10">
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
            <span className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 font-semibold">
              Andrić Law · Admin alat
            </span>
            <span className="text-[10px]">Workflow za zakon i blog</span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)]">
                Objavi zakon ili blog bez lutanja kroz korake.
              </h1>
              <p className="max-w-2xl text-base text-[var(--muted)]">
                Sve što ti treba je u jednoj radnoj površini: unos teksta, pametno formatiranje, metapodaci i objava u bazu.
              </p>
            </div>
            <div className="grid min-w-[260px] grid-cols-2 gap-3">
              {(['law', 'blog'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    contentType === type
                      ? 'border-sky-300 bg-sky-50 text-sky-900 shadow-sm'
                      : 'border-[var(--border)] bg-white/80 text-[var(--muted)] hover:border-slate-300'
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {type === 'law' ? 'Objava zakona' : 'Objava bloga'}
                  </span>
                  <span className="text-xs">
                    {type === 'law' ? 'Zakon + članci + kartica.' : 'Analiza, vodič ili objava.'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {statusMsg && (
          <p className={`rounded-2xl border px-4 py-3 text-sm ${statusStyles}`}>
            {statusMsg}
          </p>
        )}

        <section className="grid gap-8 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Izvor teksta</p>
                  <h2 className="text-xl font-semibold text-[var(--ink)]">Tekst koji ide u bazu</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                  <span>Članovi: {stats.articles}</span>
                  <span>•</span>
                  <span>Glave: {stats.heads}</span>
                  <span>•</span>
                  <span>Riječi: {stats.words}</span>
                </div>
              </div>

              <label
                onDragOver={(event) => event.preventDefault()}
                onDrop={onDrop}
                className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center transition hover:border-slate-300"
              >
                <input
                  type="file"
                  accept=".txt,.md,.doc,.docx"
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />
                <p className="text-lg font-semibold text-slate-900">Drag & drop ili klikni za upload</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Prihvatamo TXT/MD (najbolje) ili DOCX (pokušaćemo izvući tekst).
                </p>
              </label>

              <textarea
                value={lawText}
                onChange={(event) => setLawText(event.target.value)}
                rows={15}
                className="mt-5 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-sm focus:border-slate-300 focus:outline-none"
                placeholder={contentType === 'law' ? '# Ovdje ide tekst zakona sa GLAVA i Član oznakama' : '# Ovdje ide tekst bloga/analize'}
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Kopiraj tekst
                </button>
                <button
                  type="button"
                  onClick={downloadTxt}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Preuzmi .txt
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Pametni alati</p>
                  <h2 className="text-xl font-semibold text-[var(--ink)]">Formatiranje i čišćenje teksta</h2>
                </div>
                <button
                  type="button"
                  onClick={cleanText}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Očisti tekst
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={autoFormat}
                  disabled={isFormatting}
                  className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-100 disabled:opacity-60"
                >
                  {isFormatting ? 'Formatiranje…' : 'Auto formatiraj (Član)'}
                </button>
                <button
                  type="button"
                  onClick={() => loadExisting(undefined, contentType)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {contentType === 'law' ? 'Učitaj zakon' : 'Učitaj blog'}
                </button>
              </div>

              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  AI instrukcija
                </span>
                <textarea
                  value={aiInstruction}
                  onChange={(event) => setAiInstruction(event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-300 focus:outline-none"
                  placeholder={`Primjeri:
remove=Ovim se Zakonom
replace=oupotreba=>upotreba
uppercase=glava`}
                />
                <span className="mt-2 block text-xs text-[var(--muted)]">
                  Podržana pravila: <code>remove=tekst</code>, <code>replace=staro=&gt;novo</code>,{' '}
                  <code>uppercase=ključna riječ</code>.
                </span>
              </label>
              <button
                type="button"
                onClick={() => applyInstruction(aiInstruction)}
                disabled={isApplyingInstruction}
                className="mt-4 inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
              >
                {isApplyingInstruction ? 'Primjena…' : 'Primijeni instrukciju'}
              </button>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Metapodaci</p>
                <h2 className="text-xl font-semibold text-[var(--ink)]">Detalji objave</h2>
              </div>

              <div className="mt-5 space-y-4">
                <MetadataField label="Naslov" value={title} onChange={setTitle} />
                <MetadataField label="Podnaslov / excerpt" value={excerpt} onChange={setExcerpt} hint="Kratak opis za kartice i hero." />
                <MetadataField
                  label="Slug"
                  value={slug}
                  onChange={(value) => {
                    setSlug(value);
                    setSlugEdited(true);
                  }}
                  hint="npr. zakon-o-nasljedjivanju ili blog-slug"
                />
                <MetadataField label="Tagovi (comma)" value={tagsInput} onChange={setTagsInput} hint="npr. zakon, digitalni, radno pravo" />
                <MetadataField
                  label={contentType === 'law' ? 'Službeni PDF/URL' : 'Hero slika (URL)'}
                  value={mediaUrl}
                  onChange={setMediaUrl}
                  hint={contentType === 'law' ? 'Opcionalno: link na službeni dokument.' : 'Opcionalno: URL slike za hero.'}
                />
              </div>

              {contentType === 'law' && (
                <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Podaci o propisu</p>
                  <MetadataField label="Datum objave" value={lawPublishedAt} onChange={setLawPublishedAt} type="date" />
                  <MetadataField label="Badge (hero traka)" value={badge} onChange={setBadge} />
                  <MetadataField label="Izmjene / Službeni glasnik" value={changeNotes} onChange={setChangeNotes} />
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={publishLawCard} onChange={(e) => setPublishLawCard(e.target.checked)} />
                    Kreiraj blog karticu za zakon
                  </label>
                </div>
              )}
              {contentType === 'law' && publishLawCard && (
                <div className="mt-4 space-y-4">
                  <MetadataField label="Službeni glasnik / citat" value={lawCitation} onChange={setLawCitation} />
                  <MetadataField label="Status propisa" value={lawStatus} onChange={setLawStatus} />
                </div>
              )}
              {contentType === 'blog' && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                    Istakni (featured)
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={blogIsLawDocument} onChange={(e) => setBlogIsLawDocument(e.target.checked)} />
                    Ovo je zakon (Digitalni propis)
                  </label>
                </div>
              )}
              {contentType === 'blog' && blogIsLawDocument && (
                <div className="mt-4 space-y-4">
                  <MetadataField
                    label="Slug zakona (link)"
                    value={lawSlug}
                    onChange={(value) => {
                      setLawSlug(value);
                      setLawSlugEdited(true);
                    }}
                    hint="Poveži na /zakoni/<slug> ako postoji u bazi."
                  />
                  <MetadataField label="Službeni glasnik / citat" value={lawCitation} onChange={setLawCitation} />
                  <MetadataField label="Status propisa" value={lawStatus} onChange={setLawStatus} />
                  <MetadataField label="Datum objave propisa" value={lawPublishedAt} onChange={setLawPublishedAt} type="date" />
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Objava</p>
                <h2 className="text-xl font-semibold text-[var(--ink)]">Pošalji u bazu</h2>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Koristi slug iznad za učitavanje posta ili objavu nove verzije.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => loadExisting(undefined, contentType)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {contentType === 'law' ? 'Učitaj zakon' : 'Učitaj blog'}
                </button>
                <button
                  type="button"
                  onClick={publishToBackend}
                  disabled={isPublishing}
                  className="rounded-2xl border border-sky-200 bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                >
                  {isPublishing ? 'Objavljivanje…' : 'Objavi u bazu'}
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">Checklista</p>
              <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{generationSnippet}</pre>
            </section>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Live preview
            </p>
            <p className="text-sm text-[var(--muted)]">
              Ovako će zakon izgledati u javnom prikazu (koristi trenutni tekst iz editora).
            </p>
          </div>
          <div className={`${readingFont.className} rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-lg`}>
            <LawViewer lawContent={lawText} />
          </div>
        </section>
      </div>
    </div>
  );
}

function MetadataField({
  label,
  value,
  onChange,
  hint,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-300 focus:outline-none"
      />
      {hint && <span className="mt-2 block text-xs text-[var(--muted)]">{hint}</span>}
    </label>
  );
}

function StatLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-semibold text-[var(--ink)]">{value}</span>
    </div>
  );
}

function extractMetaFromMarkdown(markdown: string, filename?: string): {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
} {
  const frontMatter = parseFrontMatter(markdown);
  const firstHeading = markdown.split('\n').find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, '').trim();
  const firstParagraph = markdown
    .split('\n\n')
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#'));

  const derivedSlug = String(frontMatter.slug || (firstHeading ? slugify(firstHeading) : slugifyFilename(filename)));
  const derivedTitle = String(frontMatter.title || firstHeading || filename?.replace(/\.md$/i, '') || '');
  const derivedExcerpt = String(frontMatter.excerpt || frontMatter.description || firstParagraph || '');
  const tags = frontMatter.tags
    ? Array.isArray(frontMatter.tags)
      ? frontMatter.tags
      : `${frontMatter.tags}`.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return { slug: derivedSlug, title: derivedTitle, excerpt: derivedExcerpt, tags };
}

function parseFrontMatter(markdown: string): Record<string, unknown> {
  const trimmed = markdown.trimStart();
  if (!trimmed.startsWith('---')) return {};
  const end = trimmed.indexOf('---', 3);
  if (end === -1) return {};
  const block = trimmed.slice(3, end).trim();
  const lines = block.split('\n');
  const result: Record<string, unknown> = {};
  lines.forEach((line) => {
    const [rawKey, ...rest] = line.split(':');
    if (!rawKey || rest.length === 0) return;
    const key = rawKey.trim();
    const valueRaw = rest.join(':').trim();
    if (key === 'tags') {
      result.tags = valueRaw.split(',').map((t) => t.trim()).filter(Boolean);
    } else {
      result[key] = valueRaw;
    }
  });
  return result;
}

function slugify(value: string) {
  return generateSlug(value);
}

function slugifyFilename(filename?: string) {
  if (!filename) return '';
  return generateSlug(filename.replace(/\.[^.]+$/, ''));
}

export default function LawUploaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><p>Učitavanje...</p></div>}>
      <LawUploaderContent />
    </Suspense>
  );
}
