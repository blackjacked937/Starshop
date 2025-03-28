// webpack.config.js

module.exports = {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        constants: require.resolve('constants-browserify'),
      },
    },
  };
  