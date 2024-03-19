/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   cards: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//   },
// };
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src/");
    return config;
  },
};

export default nextConfig;
