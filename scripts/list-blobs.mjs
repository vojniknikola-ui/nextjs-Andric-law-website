#!/usr/bin/env node

import { list } from '@vercel/blob';

const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

if (!blobToken) {
  console.error('❌ BLOB_READ_WRITE_TOKEN or VERCEL_BLOB_READ_WRITE_TOKEN not found');
  process.exit(1);
}

list({ token: blobToken })
  .then(({ blobs }) => {
    console.log('\n📋 Uploaded blobs:\n');
    blobs.forEach((blob) => {
      console.log(`${blob.pathname}`);
      console.log(`  URL: ${blob.url}\n`);
    });
  })
  .catch(console.error);
