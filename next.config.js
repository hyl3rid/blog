module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./cache/cache");
    }

    return config;
  },
};
