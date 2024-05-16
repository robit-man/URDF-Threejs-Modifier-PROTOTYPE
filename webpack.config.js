const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      // other rules...
    ]
  },
  entry: './index.js', // Update this path based on your entry point
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
