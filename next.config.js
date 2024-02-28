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
      next_public_api_url: `https://chauvet-2.vercel.app`,
    },
  };
};
