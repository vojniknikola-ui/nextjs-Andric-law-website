import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Ustav Bosne i Hercegovine | Andrić Law',
  description: 'Ustav Bosne i Hercegovine - kompletan tekst sa amandmanima',
};

export default async function UstavBiHPage() {
  const lawPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih.txt');
  const amendmentPath = path.join(process.cwd(), 'public', 'laws', 'ustav-bih-amandman.txt');
  
  const lawContent = await fs.readFile(lawPath, 'utf-8');
  const amendmentContent = await fs.readFile(amendmentPath, 'utf-8');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ustav Bosne i Hercegovine</h1>
        <p className="text-gray-600">Aneks 4. Općeg okvirnog sporazuma za mir u Bosni i Hercegovini</p>
      </div>
      <LawViewer lawContent={lawContent} amendmentContent={amendmentContent} />
    </div>
  );
}
