'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Clock4, Loader2, Mail, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';

type LeadCategory = 'radno_pravo' | 'ugovori' | 'it_startup' | 'ostalo';
type ClientType = 'fizicko' | 'firma';

type FormState = {
  contact: string;
  message: string;
  consent: boolean;
};

type SubmitState = 'idle' | 'loading';
type ChatMessage = { id: string; from: 'you' | 'lawyer' | 'system'; text: string; ts: number };

const defaultCategory: LeadCategory = 'radno_pravo';
const defaultClientType: ClientType = 'fizicko';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

function validateContact(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Unesite e-mail ili telefon.';
  if (EMAIL_RE.test(trimmed)) return null;
  if (PHONE_RE.test(trimmed)) return null;
  return 'Upišite ispravan e-mail ili broj telefona.';
}

function LeadChatWidgetContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionShort, setSessionShort] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pageUrl, setPageUrl] = useState('');
  const [pageType, setPageType] = useState('');
  const [form, setForm] = useState<FormState>({
    contact: '',
    message: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const deriveShort = (id: string) => id.replace(/-/g, '').slice(0, 8);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = 'andric_chat_session';
    const keyShort = 'andric_chat_session_short';
    const existing = window.localStorage.getItem(key);
    const existingShort = window.localStorage.getItem(keyShort);

    if (existing && existingShort) {
      setSessionId(existing);
      setSessionShort(existingShort);
      return;
    }

    const generated =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 10);
    const short = deriveShort(generated);
    window.localStorage.setItem(key, generated);
    window.localStorage.setItem(keyShort, short);
    setSessionId(generated);
    setSessionShort(short);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPageUrl(window.location.href);
    setPageType(pathname || window.location.pathname);
  }, [pathname, search]);

  useEffect(() => {
    if (!sessionShort) return;
    const source = new EventSource(`/api/chat/stream?sessionId=${sessionShort}`);

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.payload?.text) {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${prev.length}`,
              from: data.payload.from === 'lawyer' ? 'lawyer' : 'you',
              text: data.payload.text as string,
              ts: typeof data.payload.ts === 'number' ? data.payload.ts : Date.now(),
            },
          ]);
        }
      } catch {
        // ignore parse errors
      }
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [sessionId]);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);



  const isDisabled =
    status === 'loading' ||
    !sessionId ||
    !sessionShort ||
    !form.message.trim() ||
    (!isSubmitted && (!form.consent || Boolean(validateContact(form.contact))));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const contactError = validateContact(form.contact);
    if (contactError) {
      setError(contactError);
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sessionId,
          sessionShort,
          category: defaultCategory,
          clientType: defaultClientType,
          pageUrl,
          pageType,
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message ?? payload?.error ?? 'Neuspjelo slanje poruke.');
      }

      const userMessage: ChatMessage = { id: `${Date.now()}-you`, from: 'you', text: form.message, ts: Date.now() };
      const autoReply: ChatMessage = {
        id: `${Date.now()}-auto`,
        from: 'lawyer',
        text: 'Poštovani,\n\nVaša poruka je zaprimljena u Andrić Law. Pregledat ću je i javiti vam se.\n\nLijep pozdrav,\nAdvokat Nikola Andrić',
        ts: Date.now() + 100,
      };
      
      setMessages((prev) => [
        ...prev,
        userMessage,
        ...(prev.length === 0 ? [autoReply] : []),
      ]);
      if (payload?.sessionShort) {
        const key = 'andric_chat_session_short';
        window.localStorage.setItem(key, payload.sessionShort);
        setSessionShort(payload.sessionShort);
      }
      setIsSubmitted(true);
      setForm((prev) => ({ ...prev, message: '' }));
      setStatus('idle');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Neuspjelo slanje. Pokušajte ponovo.';
      setError(message);
      setStatus('idle');
    }
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-[80] w-full sm:w-auto">
      {isOpen ? (
        <div className="w-full sm:w-[360px] h-[100dvh] sm:h-auto sm:max-h-[600px] sm:rounded-2xl border-t sm:border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/30 backdrop-blur flex flex-col">
          <div className="flex items-start justify-between px-4 py-3 sm:py-3 border-b border-white/10 shrink-0">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-slate-400">Andrić Law</p>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-50">Brzi odgovor odvjetnika</h3>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-200 text-[10px] px-2 py-1 border border-emerald-500/30">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  Povezano
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Clock4 className="size-3" />
                Brzi odgovor · Direktno u Telegram/e-mail
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition"
              aria-label="Zatvori chat prozor"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  Samo e-mail ili telefon + kratko pitanje. Brzi odgovor.
                </div>

                {messages.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-100 max-h-[30vh] sm:max-h-44 overflow-y-auto space-y-2" ref={messagesRef}>
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>
                            {msg.from === 'lawyer' ? 'Odvjetnik' : msg.from === 'system' ? 'Info' : 'Vi'}
                          </span>
                          <span>{new Date(msg.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div
                          className={`whitespace-pre-wrap rounded-md px-3 py-2 ${
                            msg.from === 'lawyer'
                              ? 'bg-white/5 border border-white/10'
                              : msg.from === 'system'
                                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-100'
                                : 'bg-cyan-500/10 border border-cyan-500/30'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!isSubmitted && (
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300">E-mail ili telefon *</label>
                    <div className="relative">
                      <input
                        value={form.contact}
                        onChange={(e) => setForm((prev) => ({ ...prev, contact: e.target.value }))}
                        required
                        placeholder="marko@example.com / +387..."
                        className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/60"
                      />
                      <Mail className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs text-slate-300">{isSubmitted ? 'Nastavite razgovor' : 'Vaše pitanje (kratko, obavezno)'}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    required
                    rows={isSubmitted ? 2 : 3}
                    placeholder={isSubmitted ? 'Napišite poruku...' : 'U kratkim crtama opišite situaciju...'}
                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm sm:text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/60 resize-none"
                  />
                </div>

                {!isSubmitted && (
                  <label className="flex items-start gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
                      className="mt-0.5 size-4 rounded border-white/20 bg-slate-950/70 text-cyan-500 focus:ring-0"
                    />
                    <span>
                      Saglasan sam s obradom podataka u svrhu povratnog kontakta.{' '}
                      <a
                        href="/politika-privatnosti"
                        className="underline text-slate-200 hover:text-white"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Politika privatnosti
                      </a>
                    </span>
                  </label>
                )}

                {error && (
                  <div className="text-xs text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition active:scale-95 hover:from-cyan-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Slanje...
                    </>
                  ) : isSubmitted ? (
                    <>
                      Pošalji poruku <Send className="size-4" />
                    </>
                  ) : (
                    <>
                      Pošalji · brzi odgovor <Send className="size-4" />
                    </>
                  )}
                </button>

                {!isSubmitted && (
                  <>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="size-4 text-emerald-400" />
                      Lead ide direktno u Telegram + e-mail. Bez spama, samo ozbiljni upiti.
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="text-slate-400">Ili brzi ping:</span>
                      <a
                        href="https://wa.me/38761000000?text=Pozdrav%2C%20trebam%20brzi%20savjet."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[#128C7E] text-white text-xs font-semibold shadow-md active:scale-95 transition"
                      >
                        <MessageCircle className="size-3" /> WhatsApp
                      </a>
                    </div>
                  </>
                )}

              </form>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-end gap-2 sm:gap-3 p-4 sm:p-0">
          <a
            href="https://wa.me/38761000000?text=Pozdrav%2C%20trebam%20brzi%20savjet."
            target="_blank"
            rel="noreferrer"
            className="group flex h-12 sm:h-12 items-center gap-2 rounded-full bg-[#128C7E] px-3 sm:px-4 text-white text-sm font-semibold shadow-lg shadow-[#128C7E]/40 border border-white/10 active:scale-95 transition"
            aria-label="Pošalji WhatsApp poruku"
          >
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex h-14 w-14 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/40 border border-white/20 active:scale-95 transition"
            aria-label="Otvori chat sa odvjetnikom"
          >
            <MessageCircle className="size-6 transition" />
          </button>
        </div>
      )}
    </div>
  );
}

export function LeadChatWidget() {
  return (
    <Suspense fallback={null}>
      <LeadChatWidgetContent />
    </Suspense>
  );
}
