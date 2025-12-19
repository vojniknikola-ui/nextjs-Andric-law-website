'use client';

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseSmartLaw } from '@/lib/smartParsers';

export default function LawViewer({ lawContent }: { lawContent: string }) {
  const sections = useMemo(() => parseSmartLaw(lawContent), [lawContent]);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  const fontClass = fontSize === 'sm' ? 'text-[13px] leading-6' : fontSize === 'lg' ? 'text-base leading-8' : 'text-[14.5px] leading-7';

  return (
    <div className="space-y-4 text-slate-900">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
        <span className="uppercase tracking-[0.2em] text-slate-500">Prilagodi čitanje</span>
        <div className="ml-auto inline-flex overflow-hidden rounded-lg border border-slate-200">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-3 py-1 transition ${fontSize === size ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              {size === 'sm' ? 'A-' : size === 'md' ? 'A' : 'A+'}
            </button>
          ))}
        </div>
      </div>

      {sections.map((section) => (
        <article key={`${section.id}_${section.orderIndex}`} className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
          section.level === 0 ? 'p-6' : 'p-4'
        }`}>
          <header className="flex items-start justify-between gap-3">
            <h3 className={`font-semibold text-slate-950 ${
              section.level === 0 ? 'text-xl' : 'text-lg'
            }`}>{section.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              section.type === 'chapter' ? 'bg-blue-100 text-blue-700' :
              section.type === 'section' ? 'bg-green-100 text-green-700' :
              section.type === 'preamble' ? 'bg-purple-100 text-purple-700' :
              section.type === 'intro' ? 'bg-slate-100 text-slate-600' :
              'bg-amber-100 text-amber-700'
            }`}>
              {section.type === 'chapter' ? 'Glava' :
               section.type === 'section' ? 'Odjel' :
               section.type === 'preamble' ? 'Preambula' :
               section.type === 'intro' ? 'Uvod' : 'Član'}
            </span>
	          </header>
	          <div className={`prose prose-slate mt-2 max-w-none ${fontClass}`}>
	            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
	              {section.content}
	            </ReactMarkdown>
	          </div>
	        </article>
	      ))}
      {sections.length === 0 && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Nema prepoznatih sekcija. Provjeri format teksta - trebaju postojati članovi, glave ili odjeli.
        </p>
      )}
    </div>
	);
}

const markdownComponents: Components = {
  table: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table {...rest} className={`${className ?? ''} w-full border-collapse text-sm text-slate-800`}>
          {children}
        </table>
      </div>
    );
  },
  thead: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <thead {...rest} className={`${className ?? ''} bg-slate-100`}>
        {children}
      </thead>
    );
  },
  tbody: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <tbody {...rest} className={className}>
        {children}
      </tbody>
    );
  },
  tr: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <tr {...rest} className={`${className ?? ''} border-b border-slate-200 last:border-none`}>
        {children}
      </tr>
    );
  },
  th: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <th
        {...rest}
        className={`${className ?? ''} px-3 py-2 text-left text-xs uppercase tracking-[0.12em] text-slate-600`}
      >
        {children}
      </th>
    );
  },
  td: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <td {...rest} className={`${className ?? ''} px-3 py-2 align-top text-slate-800`}>
        {children}
      </td>
    );
  },
  code: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <code {...rest} className={`${className ?? ''} rounded bg-slate-100 px-1.5 py-0.5 text-[12px] text-slate-800`}>
        {children}
      </code>
    );
  },
  pre: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <pre
        {...rest}
        className={`${className ?? ''} overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-slate-900 shadow-inner`}
      >
        {children}
      </pre>
    );
  },
  blockquote: (props) => {
    const { node, className, children, ...rest } = props;
    void node;
    return (
      <blockquote {...rest} className={`${className ?? ''} rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700`}>
        {children}
      </blockquote>
    );
  },
};
