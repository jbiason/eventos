import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import configDev from '../../config/webpack/webpack.config-dev';
import configProd from '../../config/webpack/webpack.config-prod';

gulp.task('webpack:dev', function(cb) {
  return webpack(configDev, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    cb();
  });
});

gulp.task('webpack:build', function(cb) {
  return webpack(configProd, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    cb();
  });
});
