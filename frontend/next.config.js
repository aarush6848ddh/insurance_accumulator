/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Skip API routes in static generation
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      // Add other static pages here
    };
  },
  // Disable static optimization for API routes
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**/*',
        '**/api/**/*',
      ],
    },
  },
  // Handle API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://insurance-accumulator-latest.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
