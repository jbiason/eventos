import clone from 'clone';
import webpackConfig from './webpack.config';

const config = clone(webpackConfig);

export default config;
