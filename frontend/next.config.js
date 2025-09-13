/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Skip API routes during build
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**/*',
        '**/api/**/*',
      ],
    },
  },
  // Skip API routes in static generation
  exclude: ['**/api/**/*'],
};

module.exports = nextConfig;
