import { MetadataRoute } from 'next';
import { journalData } from '@/data/journal';
// Giả sử quý cô có file dữ liệu sản phẩm tương tự
// import { products } from '@/data/products'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://serena-pink.vercel.app';

  // 1. Các trang tĩnh (Static Routes)
  const staticRoutes = [
    '',
    '/blog',
    '/booking',
    '/contact',
    '/cart',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Các trang bài viết Journal động (Dynamic Blog Routes)
  const journalRoutes = journalData.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. Các trang sản phẩm động (Dynamic Product Routes)
  // Nếu quý cô đã có dữ liệu sản phẩm, hãy bỏ comment phần này:
  /*
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  */

  return [...staticRoutes, ...journalRoutes];
}