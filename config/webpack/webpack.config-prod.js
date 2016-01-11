import clone from 'clone'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const config = clone(webpackConfig)

config.plugins = config.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
)

export default config
