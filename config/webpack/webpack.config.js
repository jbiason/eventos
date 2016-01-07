export default {
  entry: './src/js/entry.js',
  output: {
    filename: './dist/js/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
    ],
  },
  plugins: [],
};
