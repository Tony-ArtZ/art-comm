/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
       protocol: 'https',
       hostname: 'images.unsplash.com',
       port: '',
       pathname: '/**',
      },
      {
       protocol: 'https',
       hostname: 'ui-avatars.com',
       port: '',
       pathname: '/api/**',
      },
      {
       protocol: 'https',
       hostname: 'wybevfopeppmmtlbjqtt.supabase.co',
       port: '',
       pathname: '/storage/v1/object/public/**',
      }
    ],
  },
}

module.exports = nextConfig
