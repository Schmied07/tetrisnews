import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/_next/*',
          '/admin/*',
          '/auth/*',
          '/reset-password',
          '/profil-*',
          '/dashboard',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/_next/*', 
          '/admin/*',
          '/auth/*',
          '/reset-password',
          '/profil-*',
          '/dashboard',
        ],
      },
    ],
    sitemap: 'https://tetrisnews.com/sitemap.xml',
    host: 'https://tetrisnews.com',
  };
}