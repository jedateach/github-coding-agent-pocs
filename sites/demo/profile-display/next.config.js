/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/profile-display' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/profile-display' : '',
  images: {
    unoptimized: true
  },
  // Enable experimental features for better microfrontend support
  experimental: {
    esmExternals: true,
  }
};

export default nextConfig;