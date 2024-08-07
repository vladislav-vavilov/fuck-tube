/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pipedproxy.leptons.xyz',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
