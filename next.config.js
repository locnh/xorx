/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [],
  },
}

module.exports = nextConfig
