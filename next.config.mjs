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
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const path = require("path");

module.exports = {
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src/");
    return config;
  },
};

export default nextConfig;
