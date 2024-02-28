/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  const commonConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...commonConfig,
      env: {
        mongodb_username: "jiyun",
        mongodb_password: "1VBQWdxngYJTxg1P",
        mongodb_clustername: "cluster0",
        next_public_api_url: `http://localhost:3000`,
      },
    };
  }

  // PROD
  return {
    ...commonConfig,
    env: {
      mongodb_username: "jiyun",
      mongodb_password: "1VBQWdxngYJTxg1P",
      mongodb_clustername: "cluster0",
      next_public_api_url: `http://localhost:3000`,
    },
  };
};

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
//   env: {
//     mongodb_username: "jiyun",
//     mongodb_password: "1VBQWdxngYJTxg1P",
//     mongodb_clustername: "cluster0",
//     next_public_api_url: `http://localhost:3000`,
//   },
// };

// export default nextConfig;

// import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
