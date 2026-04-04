import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Chặn các trang quý cô không muốn Google thấy
    },
    sitemap: 'https://serena-pink.vercel.app/sitemap.xml',
  };
}