/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "originotesdev.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "originotesprod.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.swell.store",
      },
    ],
  },
};
export default nextConfig;
