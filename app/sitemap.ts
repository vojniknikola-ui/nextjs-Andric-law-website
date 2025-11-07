import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://andric.law';
  
  const posts = await getAllPosts();

  const blogUrls = posts
    .filter((post) => !(post.isLawDocument && post.lawViewerPath))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const lawUrls = Array.from(
    new Map(
      posts
        .filter((post) => post.isLawDocument && post.lawViewerPath)
        .map((post) => [
          post.lawViewerPath!,
          {
            url: `${baseUrl}${post.lawViewerPath}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]),
    ).values(),
  );

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
    ...blogUrls,
    ...lawUrls,
  ];
}
