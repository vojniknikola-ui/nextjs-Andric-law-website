import { NextRequest } from "next/server";
import { getLawById } from "@/lib/blob";
import { renderToBuffer } from "@react-pdf/renderer";
import { LawPdf } from "@/pdf/LawPdf";

export const dynamic = "force-dynamic"; // PDF se generiše on-demand
export const runtime = 'nodejs';

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const law = await getLawById(id);
  if (!law) {
    return new Response("Not found", { status: 404 });
  }

  const buf = await renderToBuffer(
    <LawPdf law={law} brand={{ name: "Andrić Law", logo: "/brand/andric-law-logo.png", color: "#0f172a" }} />,
  );

  return new Response(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${sanitizeFilename(law.title)}.pdf"`,
      "Cache-Control": "public, max-age=60",
    },
  });
}

function sanitizeFilename(s: string) {
  return s.replace(/[^a-z0-9\-_]+/gi, "_").slice(0, 80);
}
