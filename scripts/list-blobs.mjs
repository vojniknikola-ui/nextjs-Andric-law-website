#!/usr/bin/env node

import { list } from '@vercel/blob';

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found');
  process.exit(1);
}

list({ token: process.env.BLOB_READ_WRITE_TOKEN })
  .then(({ blobs }) => {
    console.log('\n📋 Uploaded blobs:\n');
    blobs.forEach((blob) => {
      console.log(`${blob.pathname}`);
      console.log(`  URL: ${blob.url}\n`);
    });
  })
  .catch(console.error);
