#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { put } from '@vercel/blob';

const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
if (!blobToken) {
  console.error('Missing BLOB_READ_WRITE_TOKEN or VERCEL_BLOB_READ_WRITE_TOKEN in env.');
  process.exit(1);
}

const downloadsDir = process.env.DOWNLOADS_DIR ?? path.join(os.homedir(), 'Downloads');
const outputFolder = 'site';
const keepTmp = process.env.KEEP_TMP === '1';

const images = [
  { input: 'lawyer office.avif', slug: 'hero-lawyer-office', maxSize: 2200, use: 'home-hero' },
  { input: 'Andric Law.avif', slug: 'andric-law-office', maxSize: 2000, use: 'home-gallery-1' },
  { input: 'Andric Law .avif', slug: 'andric-law-office-alt', maxSize: 2000, use: 'home-gallery-2' },
  { input: 'Nikola Andric Andric Law.avif', slug: 'nikola-andric-portrait', maxSize: 1800, use: 'about-portrait' },
];

function runSips(args) {
  execFileSync('sips', args, { stdio: 'inherit' });
}

function optimizeImage(inputPath, outputPath, maxSize) {
  runSips([
    '-Z',
    String(maxSize),
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    '82',
    inputPath,
    '--out',
    outputPath,
  ]);
}

async function uploadImage(outputPath, slug) {
  const fileBuffer = fs.readFileSync(outputPath);
  const blob = await put(`${outputFolder}/${slug}.jpg`, fileBuffer, {
    access: 'public',
    token: blobToken,
    addRandomSuffix: true,
    cacheControlMaxAge: 31536000,
    contentType: 'image/jpeg',
  });
  return blob.url;
}

async function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'andric-law-blob-'));
  const results = [];

  for (const image of images) {
    const inputPath = path.join(downloadsDir, image.input);
    if (!fs.existsSync(inputPath)) {
      console.error(`Missing file: ${inputPath}`);
      continue;
    }

    const outputPath = path.join(tmpDir, `${image.slug}.jpg`);
    console.log(`Optimizing ${image.input} -> ${image.slug}.jpg`);
    optimizeImage(inputPath, outputPath, image.maxSize);

    console.log(`Uploading ${image.slug}.jpg`);
    const url = await uploadImage(outputPath, image.slug);
    results.push({ ...image, url });
    console.log(`Uploaded: ${url}`);

    if (!keepTmp) {
      fs.unlinkSync(outputPath);
    }
  }

  if (!keepTmp) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log('\nUpdate URLs:');
  results.forEach((entry) => {
    console.log(`- ${entry.use}: ${entry.url}`);
  });

  console.log('\nJSON map:');
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
