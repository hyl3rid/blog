module.exports = {
  // swcMinify: true,

  // async headers() {
  //   return [
  //     {
  //       source: "/about",
  //       headers: [
  //         {
  //           key: "X-Frame-Options",
  //           value: "SAMEORIGIN",
  //         },
  //         {
  //           key: "X-DNS-Prefetch-Control",
  //           value: "on",
  //         },
  //       ],
  //     },
  //   ];
  // },

  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./cache/cache");
    }

    return config;
  },
};
