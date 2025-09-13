/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Remove exportPathMap as it's not compatible with App Router
  // Remove rewrites as they don't work with static exports
  // The API routes will be handled by Netlify redirects
};

module.exports = nextConfig;
