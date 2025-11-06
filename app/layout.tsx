import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://andric.law'),
  title: {
    default: 'Andrić Law | Advokatski ured - Radno pravo, IT ugovori, Privredno pravo',
    template: '%s | Andrić Law'
  },
  description: 'Specijalizirani advokatski ured za radno pravo, IT ugovore i privredno pravo u BiH. Stručna pravna pomoć za kompanije i osnivače. Odgovor u 24h.',
  keywords: [
    'advokat Sarajevo',
    'advokatski ured BiH',
    'radno pravo BiH',
    'IT ugovori',
    'privredno pravo',
    'NDA ugovor',
    'osnivanje d.o.o.',
    'GDPR compliance',
    'ugovor o radu',
    'otkaz ugovora',
    'pravni savjet BiH',
    'advokat za IT',
    'startup advokat',
  ],
  authors: [{ name: 'Andrić Law' }],
  creator: 'Andrić Law',
  publisher: 'Andrić Law',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bs_BA',
    url: 'https://andric.law',
    siteName: 'Andrić Law',
    title: 'Andrić Law | Advokatski ured - Radno pravo, IT ugovori, Privredno pravo',
    description: 'Specijalizirani advokatski ured za radno pravo, IT ugovore i privredno pravo u BiH.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andrić Law - Advokatski ured',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrić Law | Advokatski ured',
    description: 'Specijalizirani za radno pravo, IT ugovore i privredno pravo u BiH.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://andric.law',
    languages: {
      'bs-BA': 'https://andric.law',
    },
  },
  category: 'Legal Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
