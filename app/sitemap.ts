import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { services } from '@/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://andric.law';
  const posts = await getAllPosts();

  const lawPosts = posts.filter((p) => p.isLawDocument);
  const blogPosts = posts.filter((p) => !p.isLawDocument);

  const lawUrls = lawPosts.map((post) => ({
    url: `${baseUrl}/zakoni/${post.lawSlug ?? post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/usluge/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zakoni`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    ...serviceUrls,
    ...blogUrls,
    ...lawUrls,
  ];
}
