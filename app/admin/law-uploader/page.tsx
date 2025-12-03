'use client';

import { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LawViewer from '@/components/LawViewer';

const SAMPLE_TEXT = `# Primjer zakona

## GLAVA I – Opće odredbe

Član 1
Ovim uzorkom demonstriramo kako pregled zakona prikazuje naslove i članke.

Član 2
Svaki član treba biti na zasebnoj liniji.
`;

const INITIAL_BADGE = 'Andrić Law · Novi zakon';

export default function LawUploaderPage() {
  const [lawText, setLawText] = useState<string>(SAMPLE_TEXT);
  const [badge, setBadge] = useState(INITIAL_BADGE);
  const [title, setTitle] = useState('Novi zakon – radna verzija');
  const [slug, setSlug] = useState('novi-zakon');
  const [slugEdited, setSlugEdited] = useState(false);
  const [pdfSource, setPdfSource] = useState('/laws/novi-zakon.pdf');
  const [changeNotes, setChangeNotes] = useState('Službeni glasnik – unesite referencu izmjena');
  const [excerpt, setExcerpt] = useState('Kratak podnaslov / opis za blog karticu ili hero.');
  const [tagsInput, setTagsInput] = useState('zakon, digitalni');
  const [contentType, setContentType] = useState<'law' | 'blog'>('law');
  const [blogIsLawDocument, setBlogIsLawDocument] = useState(false);
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
    const articleMatches = lawText.match(/Član(?:ak)?\s+[A-Z0-9.\-]+/gi) ?? [];
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
    } catch (error) {
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
            publishedAt: new Date().toISOString().slice(0, 10),
            officialNumber: badge,
            summary: changeNotes,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatusMsg(data.error ?? 'Objava nije uspjela.');
          return;
        }
        setStatusMsg(`Objavljen zakon (članova: ${data.provisionsInserted ?? 0}).`);
      } else {
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
            lawSlug: blogIsLawDocument ? slug : null,
            heroImageUrl: pdfSource || null,
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
    } catch (error) {
      setStatusMsg('Objava nije uspjela.');
    } finally {
      setIsPublishing(false);
    }
  };

  const splitTags = (value: string) =>
    value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

  const loadExisting = async () => {
    if (!slug.trim()) {
      setStatusMsg('Unesi slug koji želiš učitati.');
      return;
    }
    setStatusMsg('Učitavanje…');
    try {
      const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.item) {
        setStatusMsg(data.error ?? 'Post nije pronađen.');
        return;
      }
      const post = data.item;
      setTitle(post.title ?? title);
      setExcerpt(post.excerpt ?? excerpt);
      setLawText(post.contentMd ?? lawText);
      setTagsInput(Array.isArray(post.tags) ? post.tags.join(', ') : tagsInput);
      setBlogIsLawDocument(Boolean(post.isLawDocument));
      setContentType(post.isLawDocument ? 'law' : 'blog');
      setIsFeatured(Boolean(post.featured));
      setIsEditing(true);
      setStatusMsg('Post učitan. Možeš urediti i sačuvati.');
    } catch (error) {
      setStatusMsg('Neuspjelo učitavanje posta.');
    }
  };

  useEffect(() => {
    const slugParam = searchParams.get('slug');
    if (slugParam) {
      setSlug(slugParam);
      // auto-load but avoid infinite loop
      loadExisting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!slugEdited && title.trim()) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  const generationSnippet = useMemo(
    () => `# Koraci za objavu
1. Sačuvaj tekst u public/laws/${slug || 'novi-zakon'}.txt
2. Kreiraj stranicu: app/zakoni/${slug || 'novi-zakon'}/page.tsx
3. Badge: ${badge}
4. Hero naslov: ${title}
5. PDF: ${pdfSource}
6. Napomena o izmjenama: ${changeNotes}
7. Dodaj blog unos i ažuriraj lib/blog.ts
`,
    [slug, badge, title, pdfSource, changeNotes],
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <header className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Andrić Law · Admin alat
          </span>
          <h1 className="text-4xl font-bold text-slate-950">Objava zakona ili bloga</h1>
          <p className="text-base text-slate-600">
            Unesi tekst, naslov i podnaslov; izaberi da li objavljuješ zakon (sa člancima) ili blog karticu. Jednim klikom ide u bazu.
          </p>
        </header>
        <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 text-sm font-semibold text-slate-700 shadow-sm">
          {(['law', 'blog'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              className={`rounded-xl px-4 py-2 transition ${contentType === type ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100'}`}
            >
              {type === 'law' ? 'Objava zakona' : 'Objava bloga'}
            </button>
          ))}
        </div>

        {statusMsg && (
          <p className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-900">
            {statusMsg}
          </p>
        )}

        <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          <div className="space-y-5">
            <label
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-blue-300"
            >
              <input
                type="file"
                accept=".txt,.md,.doc,.docx"
                className="hidden"
                onChange={(event) => handleFiles(event.target.files)}
              />
              <p className="text-lg font-semibold text-slate-900">Drag & drop ili klikni za upload</p>
              <p className="text-sm text-slate-500 mt-2">
                Prihvatamo TXT/MD (najbolje) ili DOCX (pokušaćemo izvući tekst).
              </p>
            </label>

            <textarea
              value={lawText}
              onChange={(event) => setLawText(event.target.value)}
              rows={14}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none"
              placeholder={contentType === 'law' ? '# Ovdje ide tekst zakona sa GLAVA i Član oznakama' : '# Ovdje ide tekst bloga/analize'}
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyToClipboard}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Kopiraj tekst
              </button>
              <button
                type="button"
                onClick={downloadTxt}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Preuzmi .txt
              </button>
              <button
                type="button"
                onClick={loadExisting}
                className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
              >
                Učitaj iz baze
              </button>
              <button
                type="button"
                onClick={autoFormat}
                disabled={isFormatting}
                className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100 disabled:opacity-60"
              >
                {isFormatting ? 'Formatiranje…' : 'Auto formatiraj (Član)'}
              </button>
              <button
                type="button"
                onClick={() => applyInstruction(aiInstruction)}
                disabled={isApplyingInstruction}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
              >
                {isApplyingInstruction ? 'Primjena…' : 'Primijeni instrukciju'}
              </button>
              <button
                type="button"
                onClick={publishToBackend}
                disabled={isPublishing}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
              >
                {isPublishing ? 'Objavljivanje…' : 'Objavi u bazu'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
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
            {contentType === 'law' && (
              <>
                <MetadataField label="Badge (hero traka)" value={badge} onChange={setBadge} />
                <MetadataField label="PDF ili hero URL" value={pdfSource} onChange={setPdfSource} />
                <MetadataField label="Izmjene / Službeni glasnik" value={changeNotes} onChange={setChangeNotes} />
              </>
            )}
            {contentType === 'blog' && (
              <div className="flex flex-wrap gap-3">
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

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                AI instrukcija
              </span>
              <textarea
                value={aiInstruction}
                onChange={(event) => setAiInstruction(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none"
                placeholder={`Primjeri:
remove=Ovim se Zakonom
replace=oupotreba=>upotreba
uppercase=glava`}
              />
              <span className="mt-1 block text-xs text-slate-400">
                Podržana pravila: <code>remove=tekst</code>, <code>replace=staro=&gt;novo</code>,{' '}
                <code>uppercase=ključna riječ</code>.
              </span>
            </label>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Brza statistika
              </p>
              <dl className="mt-3 space-y-2 text-sm text-slate-700">
                <StatLine label="Članovi" value={stats.articles} />
                <StatLine label="GLAVA sekcije" value={stats.heads} />
                <StatLine label="Broj riječi" value={stats.words} />
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Checklista za objavu
              </p>
              <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{generationSnippet}</pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Live preview
            </p>
            <p className="text-sm text-slate-500">
              Ovako će zakon izgledati u javnom prikazu (koristi trenutni tekst iz editora).
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-6">
            <LawViewer lawContent={lawText} mode="minimal" />
          </div>
        </section>
      </div>
    </main>
  );
}

function MetadataField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none"
      />
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function StatLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
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
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function slugifyFilename(filename?: string) {
  if (!filename) return '';
  return slugify(filename.replace(/\.[^.]+$/, ''));
}
