/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'piped-proxy.ducks.party',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
