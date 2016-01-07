import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import configDev from '../../config/webpack/webpack.config-dev';
import configProd from '../../config/webpack/webpack.config-prod';

const webpackStream = (config, cb) => {
  return webpack(config, (err) => {
    if (err) throw new gutil.PluginError('webpack', err);
    cb();
  });
};

gulp.task('webpack:dev', cb => {
  return webpackStream(configDev, cb);
});

gulp.task('webpack:build', cb => {
  return webpackStream(configProd, cb);
});
