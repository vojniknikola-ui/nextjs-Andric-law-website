import { notFound } from "next/navigation";
import { getLawById } from "@/lib/blob";
import LawViewerTop from "@/components/LawViewerTop";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LawPage({ params }: { params: { id: string } }) {
  const law = await getLawById(params.id);
  if (!law) return notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <LawViewerTop law={law} />
    </main>
  );
}
