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

export default nextConfig;
