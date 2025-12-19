import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db, leads } from '@/db';
import type { Transporter } from 'nodemailer';
import crypto from 'crypto';
import { registerSession } from '@/lib/realtime';

export const runtime = 'nodejs';

type Category = 'radno_pravo' | 'ugovori' | 'it_startup' | 'ostalo';
type ClientType = 'fizicko' | 'firma';
type ContactType = 'email' | 'phone' | 'unknown';

type LeadPayload = {
  name?: string;
  contact: string;
  category: Category;
  message: string;
  clientType?: ClientType;
  pageUrl?: string;
  pageType?: string;
  sessionId?: string;
  consent?: boolean;
};

type DeliveryResult = {
  dbSaved: boolean;
  telegramSent: boolean;
  viberSent: boolean;
  inboxEmailSent: boolean;
  autoReplySent: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const VIBER_BOT_TOKEN = process.env.VIBER_BOT_TOKEN;
const VIBER_RECEIVER_ID = process.env.VIBER_RECEIVER_ID;
const VIBER_SENDER_NAME = process.env.VIBER_SENDER_NAME ?? 'Andrić Law';
const LEADS_INBOX_EMAIL = process.env.LEADS_INBOX_EMAIL ?? 'office@andric.law';
const LEADS_FROM_EMAIL =
  process.env.LEADS_FROM_EMAIL ?? process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER ?? '';

let cachedTransporter: Transporter | null = null;

function sanitizeText(value: unknown, max = 1200) {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (trimmed.length > max) {
    return `${trimmed.slice(0, max)}…`;
  }
  return trimmed;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function detectContactType(value: string): ContactType {
  if (EMAIL_RE.test(value)) return 'email';
  if (PHONE_RE.test(value)) return 'phone';
  return 'unknown';
}

function validatePayload(payload: LeadPayload) {
  const rawName = sanitizeText(payload.name ?? '', 180);
  const contact = sanitizeText(payload.contact, 180);
  const category = payload.category;
  const message = sanitizeText(payload.message, 1600);
  const clientType = payload.clientType ?? null;
  const pageUrl = sanitizeText(payload.pageUrl ?? '', 800);
  const pageType = sanitizeText(payload.pageType ?? '', 200);
  const consent = payload.consent ?? false;
  const name = rawName || contact || 'Lead';
  const sessionId = payload.sessionId || crypto.randomUUID();

  if (!contact || !message) {
    return { ok: false, message: 'Kontakt i poruka su obavezni.' as const };
  }

  const contactType = detectContactType(contact);
  if (contactType === 'unknown') {
    return { ok: false, message: 'Unesite ispravan e-mail ili telefon.' as const };
  }

  if (!['radno_pravo', 'ugovori', 'it_startup', 'ostalo'].includes(category)) {
    return { ok: false, message: 'Odaberite kategoriju pitanja.' as const };
  }

  if (!consent) {
    return { ok: false, message: 'Morate prihvatiti obradu podataka.' as const };
  }

  return {
    ok: true as const,
    data: {
      name,
      contact,
      contactType,
      category: category as Category,
      message,
      clientType,
      pageUrl,
      pageType,
      consent,
      sessionId,
    },
  };
}

function getWorkingHoursContext() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Sarajevo',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });
  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const weekday = (parts.find((p) => p.type === 'weekday')?.value ?? '').toLowerCase();
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const workingDay = ['mon', 'tue', 'wed', 'thu', 'fri'].includes(weekday);
  const inWorkingHours = workingDay && hour >= 9 && hour < 17;

  return {
    inWorkingHours,
    label: `${hour.toString().padStart(2, '0')}:${minute} CET (${weekday || '---'})`,
  };
}

function categoryLabel(category: Category) {
  switch (category) {
    case 'radno_pravo':
      return 'Radno pravo';
    case 'ugovori':
      return 'Ugovori i klauzule';
    case 'it_startup':
      return 'IT firme / startupi';
    default:
      return 'Ostalo';
  }
}

function clientTypeLabel(clientType?: ClientType | null) {
  if (clientType === 'firma') return 'Firma / startup';
  if (clientType === 'fizicko') return 'Fizičko lice';
  return 'N/A';
}

function buildTelegramText(data: {
  name: string;
  contact: string;
  category: Category;
  message: string;
  pageUrl?: string;
  pageType?: string;
  clientType?: ClientType | null;
  outOfHours: boolean;
  workingTimeLabel: string;
  sessionShort: string;
}) {
  const lines = [
    '🆕 Novi lead s andric.law',
    data.outOfHours ? '[OUT_OF_HOURS]' : null,
    `Ime: ${data.name}`,
    `Kontakt: ${data.contact}`,
    `Kategorija: ${categoryLabel(data.category)}`,
    `Klijent: ${clientTypeLabel(data.clientType)}`,
    data.pageUrl ? `Stranica: ${data.pageUrl}${data.pageType ? ` (${data.pageType})` : ''}` : null,
    `Vrijeme: ${data.workingTimeLabel}`,
    `Session: #${data.sessionShort} (odgovori porukom koja počinje sa #${data.sessionShort})`,
    '',
    'Poruka:',
    data.message,
  ];

  return lines.filter(Boolean).join('\n');
}

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

async function sendInboxEmail(payload: {
  subject: string;
  text: string;
  html: string;
}) {
  const transporter = getTransporter();
  if (!transporter || !LEADS_FROM_EMAIL || !LEADS_INBOX_EMAIL) {
    return false;
  }

  try {
    await transporter.sendMail({
      from: LEADS_FROM_EMAIL,
      to: LEADS_INBOX_EMAIL,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });
    return true;
  } catch (error) {
    console.error('[chat] send inbox email failed', error);
    return false;
  }
}

async function sendAutoReply(to: string, outOfHours: boolean) {
  const transporter = getTransporter();
  if (!transporter || !LEADS_FROM_EMAIL || !EMAIL_RE.test(to)) {
    return false;
  }

  const subject = 'Vaša poruka je zaprimljena - Andrić Law';
  const baseBody =
    'Poštovani,\n' +
    'Vaša poruka je zaprimljena u Andrić Law. Pregledat ću je i javiti vam se u što bržem roku.\n\n' +
    'Lijep pozdrav,\n' +
    'Advokat Nikola Andrić';
  const outOfHoursNote = outOfHours
    ? '\n\nNapomena: Poruka je primljena izvan radnog vremena (09-17h); odgovorit ću prvi sljedeći radni dan.'
    : '';

  try {
    await transporter.sendMail({
      from: LEADS_FROM_EMAIL,
      to,
      subject,
      text: `${baseBody}${outOfHoursNote}`,
    });
    return true;
  } catch (error) {
    console.error('[chat] auto-reply failed', error);
    return false;
  }
}

async function sendTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('[chat] telegram send failed', error);
    return false;
  }
}

async function sendViber(text: string) {
  if (!VIBER_BOT_TOKEN || !VIBER_RECEIVER_ID) {
    return false;
  }
  const truncated = text.length > 700 ? `${text.slice(0, 695)}…` : text;

  try {
    const response = await fetch('https://chatapi.viber.com/pa/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Viber-Auth-Token': VIBER_BOT_TOKEN,
      },
      body: JSON.stringify({
        receiver: VIBER_RECEIVER_ID,
        min_api_version: 7,
        type: 'text',
        text: truncated,
        sender: { name: VIBER_SENDER_NAME },
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('[chat] viber send failed', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as LeadPayload | null;
  if (!payload) {
    return NextResponse.json({ message: 'Nevažeći JSON payload.' }, { status: 400 });
  }

  const validation = validatePayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const { data } = validation;
  if (!data) {
    return NextResponse.json({ message: 'Greška u validaciji podataka.' }, { status: 400 });
  }
  
  const workingContext = getWorkingHoursContext();
  const outOfHours = !workingContext.inWorkingHours;
  const sessionShort = registerSession(data.sessionId);

  const results: DeliveryResult = {
    dbSaved: false,
    telegramSent: false,
    viberSent: false,
    inboxEmailSent: false,
    autoReplySent: false,
  };

  if (db) {
    try {
      await db.insert(leads).values({
        name: data.name,
        contact: data.contact,
        contactType: data.contactType,
        category: data.category,
        message: data.message,
        pageUrl: data.pageUrl || null,
        pageType: data.pageType || null,
        clientType: data.clientType || null,
        source: 'chat_widget',
        outOfHours,
        status: 'new',
        sessionId: data.sessionId,
      });
      results.dbSaved = true;
    } catch (error) {
      console.error('[chat] lead insert failed', error);
    }
  }

  const telegramText = buildTelegramText({
    ...data,
    outOfHours,
    workingTimeLabel: workingContext.label,
    sessionShort,
  });
  results.telegramSent = await sendTelegram(telegramText);
  results.viberSent = await sendViber(telegramText);

  const inboxSubject = `Novi lead s andric.law ${outOfHours ? '[OUT_OF_HOURS]' : ''}`;
  const inboxHtml = `
    <p><strong>Novi lead s andric.law</strong> ${outOfHours ? '[OUT_OF_HOURS]' : ''}</p>
    <p><strong>Ime:</strong> ${escapeHtml(data.name)}<br/>
    <strong>Kontakt:</strong> ${escapeHtml(data.contact)}<br/>
    <strong>Kategorija:</strong> ${escapeHtml(categoryLabel(data.category))}<br/>
    <strong>Klijent:</strong> ${escapeHtml(clientTypeLabel(data.clientType))}<br/>
    <strong>Session:</strong> #${escapeHtml(sessionShort)}</p>
    <p><strong>Stranica:</strong> ${escapeHtml(data.pageUrl || '-')} ${data.pageType ? `(${escapeHtml(data.pageType)})` : ''}</p>
    <p><strong>Vrijeme:</strong> ${escapeHtml(workingContext.label)}</p>
    <p><strong>Poruka:</strong><br/>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</p>
  `;

  results.inboxEmailSent = await sendInboxEmail({
    subject: inboxSubject,
    text: telegramText,
    html: inboxHtml,
  });

  if (data.contactType === 'email') {
    results.autoReplySent = await sendAutoReply(data.contact, outOfHours);
  }

  const success = results.dbSaved || results.telegramSent || results.inboxEmailSent;
  if (!success) {
    return NextResponse.json(
      { message: 'Nismo uspjeli zabilježiti lead. Pokušajte ponovo ili javite se direktno.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    outOfHours,
    deliveries: results,
    sessionId: data.sessionId,
    sessionShort,
  });
}
