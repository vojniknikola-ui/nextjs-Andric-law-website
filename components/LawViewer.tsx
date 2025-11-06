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
    <div className="max-w-4xl mx-auto p-6">
      {sections.map(section => (
        <div key={section.id} className="mb-8 border-b pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 prose prose-sm max-w-none">
              <ReactMarkdown>
                {section.content}
              </ReactMarkdown>
            </div>
            {section.history && (
              <button
                onClick={() => toggleHistory(section.id)}
                className="flex-shrink-0 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
              >
                📜 Historijat
              </button>
            )}
          </div>
          
          {section.history && expandedHistory.has(section.id) && (
            <div className="mt-4 p-4 bg-gray-50 rounded border-l-4 border-blue-500 prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown>
                {section.history}
              </ReactMarkdown>
            </div>
          )}
        </div>
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
