/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js configuration here
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
  },
  experimental: {
    // Add experimental features if needed
  },
};

export default nextConfig;
