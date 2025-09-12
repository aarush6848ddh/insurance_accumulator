/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable static optimization for API routes
  experimental: {
    outputFileTracingExcludes: {
      '*': ['node_modules/**/*'],
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
