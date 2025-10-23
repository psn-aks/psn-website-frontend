/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      // add your production domain here too, for deployment
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
