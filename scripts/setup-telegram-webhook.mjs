#!/usr/bin/env node

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.argv[2];

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN nije postavljen u environment varijablama');
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error('❌ Upotreba: node scripts/setup-telegram-webhook.mjs https://your-domain.com/api/chat/telegram-webhook');
  process.exit(1);
}

async function setWebhook() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: WEBHOOK_URL }),
      }
    );

    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Telegram webhook uspješno postavljen!');
      console.log(`📍 URL: ${WEBHOOK_URL}`);
    } else {
      console.error('❌ Greška:', data.description);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Neuspjelo postavljanje webhook-a:', error.message);
    process.exit(1);
  }
}

async function getWebhookInfo() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );
    const data = await response.json();
    
    if (data.ok) {
      console.log('\n📊 Trenutni webhook info:');
      console.log('URL:', data.result.url || '(nije postavljen)');
      console.log('Pending updates:', data.result.pending_update_count);
      if (data.result.last_error_message) {
        console.log('⚠️  Posljednja greška:', data.result.last_error_message);
      }
    }
  } catch (error) {
    console.error('Greška pri dohvaćanju info:', error.message);
  }
}

console.log('🤖 Postavljanje Telegram webhook-a...\n');
await setWebhook();
await getWebhookInfo();
