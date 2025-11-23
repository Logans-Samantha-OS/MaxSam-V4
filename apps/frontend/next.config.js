/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig