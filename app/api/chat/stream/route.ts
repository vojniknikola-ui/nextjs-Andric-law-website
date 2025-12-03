import { NextRequest } from 'next/server';
import { addListener, removeListener, registerSession } from '@/lib/realtime';

export const runtime = 'nodejs';

const encoder = new TextEncoder();

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');
  if (!sessionId) {
    return new Response('sessionId required', { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      registerSession(sessionId);
      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const listener = (payload: unknown) => {
        send({ type: 'message', payload });
      };

      addListener(sessionId, listener);
      send({ type: 'connected' });

      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(`: keep-alive\n\n`));
      }, 20000);

      controller.enqueue(encoder.encode(`retry: 5000\n\n`));

      return () => {
        clearInterval(interval);
        removeListener(sessionId, listener);
      };
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
