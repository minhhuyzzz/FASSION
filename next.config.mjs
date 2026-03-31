/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      { 
        protocol: 'https', 
        hostname: 'images.unsplash.com' 
      },
      { 
        protocol: 'https', 
        hostname: '**.supabase.co' 
      },
    ],
  },
  // THÊM PHẦN NÀY ĐỂ SỬA LỖI TRUY CẬP QUA IP
  experimental: {
    allowedDevOrigins: ['26.185.116.4'],
  },
};

export default nextConfig;