import { getLawIndex } from "@/lib/blob";
import LawSearch from "@/components/LawSearch";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LawViewerIndexPage() {
  const index = await getLawIndex();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">AL</div>
          <div>
            <h1 className="text-2xl font-semibold">Andrić Law — LawViewer</h1>
            <p className="text-sm text-neutral-600">Brza pretraga naslova zakona i otvaranje pregleda.</p>
          </div>
        </div>
      </header>

      <LawSearch items={index.items} />

      <section className="mt-8 space-y-2">
        <h2 className="text-lg font-medium">Svi zakoni</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {index.items.map((it) => (
            <li key={it.id} className="border rounded-lg p-3">
              <div className="text-sm text-neutral-500">{it.entity}</div>
              <a className="font-medium hover:underline" href={`/zakoni/${it.id}`}>
                {it.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
