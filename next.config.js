/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['episyche-lms.s3.ap-south-1.amazonaws.com', 'lh3.googleusercontent.com' , 'images.unsplash.com' , 'jsonstudio-assets.s3.us-east-1.amazonaws.com'],
  },
}

module.exports = nextConfig
