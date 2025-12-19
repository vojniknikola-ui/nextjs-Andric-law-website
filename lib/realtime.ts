type Listener = (payload: unknown) => void;

const sessions = new Map<string, Set<Listener>>();
const shortToFull = new Map<string, string>();

export function registerSession(sessionId: string) {
  const short = sessionId.replace(/-/g, '').slice(0, 8);
  shortToFull.set(short, sessionId);
  return short;
}

export function resolveSession(codeOrId: string) {
  if (sessions.has(codeOrId)) return codeOrId;
  const full = shortToFull.get(codeOrId);
  return full ?? null;
}

export function addListener(sessionId: string, listener: Listener) {
  const group = sessions.get(sessionId) ?? new Set<Listener>();
  group.add(listener);
  sessions.set(sessionId, group);
}

export function removeListener(sessionId: string, listener: Listener) {
  const group = sessions.get(sessionId);
  if (!group) return;
  group.delete(listener);
  if (group.size === 0) {
    sessions.delete(sessionId);
  } else {
    sessions.set(sessionId, group);
  }
}

export function broadcastToSession(sessionId: string, payload: unknown) {
  const group = sessions.get(sessionId);
  if (!group) return;
  for (const listener of group) {
    try {
      listener(payload);
    } catch (error) {
      console.error('[realtime] listener error', error);
    }
  }
}
