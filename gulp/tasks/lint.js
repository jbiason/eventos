import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import config from '../config';
import env from '../env';
import configSrc from '../../config/eslint/eslint-src';
import configTest from '../../config/eslint/eslint-test';

const linterStream = (glob, config) => {
  return gulp.src(glob, config)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
};

gulp.task('lint:scripts', () => {
  return linterStream(config.scriptsGlob, configSrc);
});

gulp.task('lint:tests', () => {
  return linterStream(config.testsGlob, configTest);
});

gulp.task('lint', ['lint:scripts', 'lint:tests']);
