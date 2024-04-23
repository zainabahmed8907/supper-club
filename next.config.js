/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
