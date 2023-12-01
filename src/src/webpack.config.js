const path = require('path');

module.exports = {
  // Muut konfiguraatioasetukset...

  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
    },
  },
};
