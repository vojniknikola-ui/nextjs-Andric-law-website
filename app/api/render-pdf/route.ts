import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing url', { status: 400 });
  }

  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: chromium.args,
    headless: chromium.headless,
    executablePath,
    defaultViewport: { width: 1280, height: 1800, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '14mm', left: '10mm' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:8px; width:100%; text-align:center;"></div>`,
    footerTemplate: `<div style="font-size:8px; width:100%; text-align:center;">
        <span class="pageNumber"></span>/<span class="totalPages"></span>
      </div>`,
  });

  await browser.close();

  return new Response(Buffer.from(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="andric-law.pdf"',
    },
  });
}
