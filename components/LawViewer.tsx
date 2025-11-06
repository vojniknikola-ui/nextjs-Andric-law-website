'use client';

import { useState } from 'react';

interface LawSection {
  id: string;
  title: string;
  content: string;
  history?: string;
}

export default function LawViewer({ lawContent }: { lawContent: string }) {
  const [expandedHistory, setExpandedHistory] = useState<Set<string>>(new Set());

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
    <div className="max-w-5xl mx-auto px-4 py-8 font-serif">
      {sections.map(section => (
        <article key={section.id} className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="text-black leading-relaxed" dangerouslySetInnerHTML={{ __html: formatLawContent(section.content) }} />
            </div>
            {section.history && (
              <button
                onClick={() => toggleHistory(section.id)}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                📜 Historijat
              </button>
            )}
          </div>
          
          {section.history && expandedHistory.has(section.id) && (
            <div className="mt-6 p-5 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h4 className="text-sm font-semibold text-black mb-3">Historijat izmjena</h4>
              <div className="text-black text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatLawContent(section.history) }} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function formatLawContent(content: string): string {
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-lg">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
    .replace(/<p class="mb-4"><\/p>/g, '')
    .replace(/<p class="mb-4"><strong/g, '<p class="mb-6 mt-4"><strong');
}

function parseLawContent(content: string): LawSection[] {
  const sections: LawSection[] = [];
  const lines = content.split('\n');
  
  let currentSection: Partial<LawSection> | null = null;
  let currentContent: string[] = [];
  let inHistory = false;
  let historyContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^\\?\*\\?\*Članak \d+/)) {
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        if (historyContent.length > 0) {
          currentSection.history = historyContent.join('\n').trim();
        }
        sections.push(currentSection as LawSection);
      }

      const articleMatch = line.match(/Članak (\d+[a-z]*)/i);
      currentSection = {
        id: articleMatch ? `article-${articleMatch[1]}` : `section-${i}`,
        title: line,
        content: '',
      };
      currentContent = [line];
      historyContent = [];
      inHistory = false;
      continue;
    }

    if (line.includes('Historijat izmjena')) {
      inHistory = true;
      continue;
    }

    if (inHistory) {
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
