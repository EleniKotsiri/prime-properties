/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    env: {
      // NOTE: Use VERCEL_URL to dynamically set NEXTAUTH_URL for Vercel deployments,
      // falling back to localhost for local development.
      NEXTAUTH_URL: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000',
    },
    remotePatterns: [ // remote domains we want to get images from
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;