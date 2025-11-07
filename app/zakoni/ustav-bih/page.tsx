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
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Ustav Bosne i Hercegovine
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Aneks 4. Općeg okvirnog sporazuma za mir u Bosni i Hercegovini
          </p>
          <div className="inline-block bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-200">
              Sa amandmanima objavljenim u Službenom glasniku BiH
            </p>
          </div>
        </div>
      </div>
      
      <LawViewer lawContent={lawContent} amendmentContent={amendmentContent} />
    </main>
  );
}
