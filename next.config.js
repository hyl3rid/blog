/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Needed if your cache script is asynchronous
    config.experiments = {
      topLevelAwait: true,
    };
    if (isServer) {
      return {
        ...config,
        // This is what allows us to add a node script via NextJS's server
        entry() {
          return config.entry().then((entry) => {
            return Object.assign({}, entry, {
              cache: "./cache/cache.js",
            });
          });
        },
      };
    }
    return config;
  },
};
