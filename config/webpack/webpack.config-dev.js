import clone from 'clone';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const config = clone(webpackConfig);

export default config;
