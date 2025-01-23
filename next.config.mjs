/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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