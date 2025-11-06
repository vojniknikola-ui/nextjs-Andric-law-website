'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {sections.map(section => (
        <article key={section.id} className="mb-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black">
              <ReactMarkdown>
                {section.content}
              </ReactMarkdown>
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
              <div className="prose prose-sm max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black">
                <ReactMarkdown>
                  {section.history}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
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
