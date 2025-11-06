import { Metadata } from 'next';

export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  date: string,
  image: string
): Metadata {
  const url = `https://andric.law/blog/${slug}`;
  
  return {
    title: `${title} | Andrić Law`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Andrić Law',
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'bs_BA',
      type: 'article',
      publishedTime: new Date(date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export function generateBlogJsonLd(title: string, description: string, date: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'Andrić Law' },
    publisher: {
      '@type': 'Organization',
      name: 'Andrić Law',
      logo: { '@type': 'ImageObject', url: 'https://andric.law/logo.png' },
    },
    datePublished: date,
    image,
  };
}
