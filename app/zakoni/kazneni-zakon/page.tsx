import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Kazneni zakon Federacije BiH - Pročišćeni tekst',
  description: 'Neslužbeni pročišćeni tekst Kaznenog zakona Federacije Bosne i Hercegovine sa historijatom izmjena',
};

export default async function KazneniZakonPage() {
  const filePath = path.join(process.cwd(), 'public', 'laws', 'kazneni-zakon-fbih.md');
  const lawContent = await fs.readFile(filePath, 'utf-8');

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            Kazneni zakon Federacije Bosne i Hercegovine
          </h1>
          <p className="text-blue-200">
            Neslužbeni pročišćeni tekst sa historijatom izmjena
          </p>
          <p className="text-sm text-blue-300 mt-2">
            Službene novine FBiH: br. 36/03, 37/03, 21/04, 69/04, 18/05, 42/10, 42/11, 59/14, 76/14, 46/16, 75/17, 31/23, 58/25
          </p>
        </div>
      </div>
      
      <LawViewer lawContent={lawContent} />
      
      <div className="max-w-4xl mx-auto px-6 py-8 text-sm text-gray-600 border-t">
        <p className="font-semibold mb-2">Napomena:</p>
        <p>
          Ovo je neslužbeni pročišćeni tekst koji služi isključivo za informativne svrhe. 
          Za službenu uporabu potrebno je konzultirati originalne tekstove objavljene u 
          "Službenim novinama Federacije BiH".
        </p>
      </div>
    </main>
  );
}
