import { NextRequest, NextResponse } from 'next/server';
import { broadcastToSession, resolveSession } from '@/lib/realtime';

export const runtime = 'nodejs';

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function extractSessionId(text: string | undefined | null) {
  if (!text) return null;
  const match = text.match(/#([a-zA-Z0-9]{6,})/);
  return match?.[1] ?? null;
}

function cleanReply(text: string, code: string) {
  return text.replace(new RegExp(`#${code}\\s*`, 'i'), '').trim();
}

export async function POST(request: NextRequest) {
  const update = await request.json().catch(() => null);
  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = message?.text as string | undefined;

  if (!TELEGRAM_CHAT_ID || !message || !text) {
    return NextResponse.json({ ok: true });
  }

  if (String(chatId) !== String(TELEGRAM_CHAT_ID)) {
    return NextResponse.json({ ok: true });
  }

  const code = extractSessionId(text);
  if (!code) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const sessionId = resolveSession(code) ?? code;
  const short = sessionId.replace(/-/g, '').slice(0, 8);
  const cleaned = cleanReply(text, code);

  if (!cleaned) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payload = {
    from: 'lawyer',
    text: cleaned,
    ts: Date.now(),
  };

  broadcastToSession(sessionId, payload);
  broadcastToSession(code, payload);
  if (short !== code) {
    broadcastToSession(short, payload);
  }

  return NextResponse.json({ ok: true, delivered: true });
}
