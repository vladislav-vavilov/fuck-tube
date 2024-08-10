/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pipedproxy.us.projectsegfau.lt',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
