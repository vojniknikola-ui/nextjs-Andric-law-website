'use client';

import { useState } from 'react';

interface LawSection {
  id: string;
  title: string;
  content: string;
  history?: string;
}

export default function LawViewer({ lawContent, amendmentContent }: { lawContent: string; amendmentContent?: string }) {
  const [expandedHistory, setExpandedHistory] = useState<Set<string>>(new Set());
  const [showAmendment, setShowAmendment] = useState(false);

  const sections = parseLawContent(lawContent);

  const toggleHistory = (id: string) => {
    setExpandedHistory(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            {/* Logo placeholder */}
            <span className="text-2xl">⚖️</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Andrić Law</h1>
            <p className="text-gray-600">Advokatska kancelarija</p>
          </div>
        </div>
      </div>

      {amendmentContent && (
        <div className="mb-6">
          <button
            onClick={() => setShowAmendment(!showAmendment)}
            className={`w-full px-5 py-4 text-base font-semibold rounded-lg transition-all ${
              showAmendment
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            }`}
          >
            ⚖️ {showAmendment ? 'Sakrij Amandmane' : 'Prikaži Amandmane'}
          </button>
          
          {showAmendment && (
            <div className="mt-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-8">
              <div className="text-black leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: formatLawContent(amendmentContent) }} />
            </div>
          )}
        </div>
      )}
      
      {sections.map(section => (
        <article key={section.id} className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-black leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: formatLawContent(section.content) }} />
          
          {section.history && (
            <div className="mt-6">
              <button
                onClick={() => toggleHistory(section.id)}
                className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  expandedHistory.has(section.id)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📋 Izmjene Zakona
              </button>
              
              {expandedHistory.has(section.id) && (
                <div className="mt-4 p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-gray-800 text-sm leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: formatLawContent(section.history) }} />
                </div>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function formatLawContent(content: string): string {
  return content
    .replace(/\\/g, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-lg">$1</strong>')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^(Član [IVX\d]+.*?)$/gm, '<p class="mb-3 font-bold text-xl text-blue-900">$1</p>')
    .replace(/^(Članak \d+.*?)$/gm, '<p class="mb-3 font-bold text-xl text-blue-900">$1</p>')
    .replace(/^(PREAMBULA|DIO [IVX]+.*?|GLAVA [IVX]+.*?)$/gm, '<p class="mb-4 mt-6 font-bold text-2xl text-blue-900">$1</p>')
    .replace(/^(PSBiH.*?|Sarajevo|\d{1,2}\. [a-z]+ \d{4}\. godine)$/gm, '<p class="mb-2 text-right font-semibold text-gray-700 italic">$1</p>')
    .replace(/^(.+)$/gm, '<p class="mb-3">$1</p>')
    .replace(/<p class="mb-3"><\/p>/g, '')
    .replace(/<p class="mb-3"><strong/g, '<p class="mb-5 mt-3"><strong');
}

function parseLawContent(content: string): LawSection[] {
  const sections: LawSection[] = [];
  const lines = content.split('\n');
  
  let currentSection: Partial<LawSection> | null = null;
  let currentContent: string[] = [];
  let inHistory = false;
  let historyContent: string[] = [];
  let pendingGlava: string | null = null;
  let preambleContent: string[] = [];
  let inPreamble = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^PREAMBULA/i)) {
      inPreamble = true;
      preambleContent.push(line);
      continue;
    }

    if (line.match(/^\\?\*\\?\*Članak \d+/) || line.match(/^Član [IVX\d]+/i)) {
      if (inPreamble && preambleContent.length > 0) {
        sections.push({
          id: 'preamble',
          title: 'PREAMBULA',
          content: preambleContent.join('\n').trim()
        });
        preambleContent = [];
        inPreamble = false;
      }

      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        if (historyContent.length > 0) {
          currentSection.history = historyContent.join('\n').trim();
        }
        sections.push(currentSection as LawSection);
      }

      const articleMatch = line.match(/Članak (\d+[a-z]*)/i) || line.match(/Član ([IVX\d]+)/i);
      currentSection = {
        id: articleMatch ? `article-${articleMatch[1]}` : `section-${i}`,
        title: line,
        content: '',
      };
      currentContent = pendingGlava ? [pendingGlava, line] : [line];
      pendingGlava = null;
      historyContent = [];
      inHistory = false;
      continue;
    }

    if (line.includes('Historijat izmjena')) {
      inHistory = true;
      continue;
    }

    if (line.match(/^\\?\*\\?\*GLAVA/i) || line.match(/^GLAVA/i) || line.match(/^DIO [IVX]+/i)) {
      pendingGlava = line;
      continue;
    }

    if (inPreamble) {
      preambleContent.push(line);
    } else if (inHistory) {
      historyContent.push(line);
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    if (historyContent.length > 0) {
      currentSection.history = historyContent.join('\n').trim();
    }
    sections.push(currentSection as LawSection);
  }

  return sections;
}
