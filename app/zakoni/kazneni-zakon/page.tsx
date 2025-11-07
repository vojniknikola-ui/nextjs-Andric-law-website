import { promises as fs } from 'fs';
import path from 'path';
import LawViewer from '@/components/LawViewer';

export const metadata = {
  title: 'Kazneni zakon Federacije BiH - Pročišćeni tekst',
  description: 'Neslužbeni pročišćeni tekst Kaznenog zakona Federacije Bosne i Hercegovine sa historijatom izmjena',
  alternates: {
    canonical: 'https://andric.law/zakoni/kazneni-zakon',
  },
  openGraph: {
    title: 'Kazneni zakon Federacije BiH - Pročišćeni tekst',
    description: 'Neslužbeni pročišćeni tekst Kaznenog zakona Federacije Bosne i Hercegovine sa historijatom izmjena',
    url: 'https://andric.law/zakoni/kazneni-zakon',
  },
};

export default async function KazneniZakonPage() {
  const filePath = path.join(process.cwd(), 'public', 'laws', 'kazneni-zakon-fbih.md');
  const lawContent = await fs.readFile(filePath, 'utf-8');

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Kazneni zakon Federacije Bosne i Hercegovine
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Neslužbeni pročišćeni tekst sa historijatom izmjena
          </p>
          <div className="inline-block bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-200">
              Službene novine FBiH: br. 36/03, 37/03, 21/04, 69/04, 18/05, 42/10, 42/11, 59/14, 76/14, 46/16, 75/17, 31/23, 58/25
            </p>
          </div>
        </div>
      </div>
      
      <LawViewer lawContent={lawContent} />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Napomena</h3>
              <p className="text-yellow-800 leading-relaxed">
                Ovo je neslužbeni pročišćeni tekst koji služi isključivo za informativne svrhe. 
                Za službenu uporabu potrebno je konzultirati originalne tekstove objavljene u 
                <strong> "Službenim novinama Federacije BiH"</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
