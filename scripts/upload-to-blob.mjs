#!/usr/bin/env node

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { put } from '@vercel/blob';

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found');
  console.error('Add to .env.local: BLOB_READ_WRITE_TOKEN=your_token');
  process.exit(1);
}

const images = [
  { name: 'otkaz-ugovora-fbih', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop&q=85' },
  { name: 'nda-it-projekti', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop&q=85' },
  { name: 'osnivanje-doo-bih', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=85' },
  { name: 'otkaz-vodic-2025', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop&q=85' },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpDir = path.join(__dirname, '../tmp');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(filename, () => {}); reject(err); });
  });
}

async function uploadToBlob(filename, name) {
  const fileBuffer = fs.readFileSync(filename);
  const blob = await put(`blog/${name}.jpg`, fileBuffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: true,
    cacheControlMaxAge: 31536000,
  });
  return blob.url;
}

async function main() {
  console.log('🚀 Migrating images to Vercel Blob...\n');
  const results = [];
  
  for (const img of images) {
    try {
      console.log(`📥 ${img.name}...`);
      const tmpFile = path.join(tmpDir, `${img.name}.jpg`);
      await downloadImage(img.url, tmpFile);
      
      console.log(`📤 Uploading...`);
      const blobUrl = await uploadToBlob(tmpFile, img.name);
      results.push({ name: img.name, url: blobUrl });
      console.log(`✅ ${blobUrl}\n`);
      fs.unlinkSync(tmpFile);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ ${img.name}: ${message}`);
    }
  }
  
  console.log('\n📋 Update lib/blog.ts:\n');
  results.forEach(({ name, url }) => console.log(`  '${name}': '${url}',`));
  
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
}

main().catch(console.error);
