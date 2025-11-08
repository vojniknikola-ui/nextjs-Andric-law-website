import Typesense from 'typesense';

const TYPESENSE_HOST = process.env.TYPESENSE_HOST;
const TYPESENSE_PROTOCOL = process.env.TYPESENSE_PROTOCOL || 'https';
const TYPESENSE_PORT = process.env.TYPESENSE_PORT || '443';
const TYPESENSE_API_KEY = process.env.TYPESENSE_API_KEY;

if (!TYPESENSE_HOST || !TYPESENSE_API_KEY) {
  console.warn('[typesense] Missing TYPESENSE_HOST or TYPESENSE_API_KEY environment variables.');
}

export const typesenseClient = TYPESENSE_HOST && TYPESENSE_API_KEY
  ? new Typesense.Client({
      nodes: [
        {
          host: TYPESENSE_HOST,
          port: Number(TYPESENSE_PORT),
          protocol: TYPESENSE_PROTOCOL,
        },
      ],
      apiKey: TYPESENSE_API_KEY,
      connectionTimeoutSeconds: 5,
    })
  : null;
