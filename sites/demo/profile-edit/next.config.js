/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/profile-edit' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/profile-edit' : '',
  images: {
    unoptimized: true
  },
  // Enable experimental features for better microfrontend support
  experimental: {
    esmExternals: true,
  }
};

export default nextConfig;