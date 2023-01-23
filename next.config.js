/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
  PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY_ID,
  PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY
    }
}

module.exports = nextConfig
