import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, type, date, time, message } = body;

    // Validacija
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Nedostaju obavezna polja' },
        { status: 400 }
      );
    }

    // Email sadržaj
    const emailContent = `
Novi zahtev za konsultacije:

Ime: ${name}
Email: ${email}
Telefon: ${phone || 'Nije navedeno'}
Tip: ${type === 'online' ? 'Online konsultacije' : 'U kancelariji'}
Datum: ${date}
Vreme: ${time}

Poruka:
${message || 'Nije navedena'}

---
Poslato sa andric.law booking forme
    `.trim();

    // Pošalji email (koristi postojeći SMTP setup)
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.LEADS_INBOX_EMAIL || 'office@andric.law',
        subject: `Novi zahtev za konsultacije - ${name}`,
        text: emailContent,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Greška pri slanju zahteva' },
      { status: 500 }
    );
  }
}
