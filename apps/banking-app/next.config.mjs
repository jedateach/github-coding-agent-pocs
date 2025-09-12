/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  typedRoutes: true,
  transpilePackages: ['@banking-poc/schema'],
}

export default nextConfig