import { MetadataRoute } from 'next';
import { vehicles, blogPosts } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://karyakreatif.co.id';

  const staticRoutes = [
    '',
    '/fleet',
    '/about',
    '/contact',
    '/faq',
    '/partnership',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const vehicleRoutes = vehicles.map((vehicle) => ({
    url: `${baseUrl}/fleet/${vehicle.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes];
}
