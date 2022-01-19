module.exports = {
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./cache/cache");
    }

    return config;
  },
};
