import clone from 'clone'
import webpackConfig from './webpack.config'

const config = clone(webpackConfig)

config.devtool = 'cheap-module-source-map'

export default config
