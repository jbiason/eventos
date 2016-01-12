export default {
  entry: './src/js/entry.js',
  output: {
    filename: './dist/js/bundle.js',
    sourceMapFilename: './dist/js/bundle.map.js',
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
}
