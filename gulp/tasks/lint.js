import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import config from '../config';
import env from '../env';

const linterStream = (glob, config) => {
  return gulp.src(glob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
};

gulp.task('lint:build', () => {
  return linterStream(config.buildGlob);
});

gulp.task('lint:scripts', () => {
  return linterStream(config.scriptsGlob);
});

gulp.task('lint:tests', () => {
  return linterStream(config.testsGlob);
});

gulp.task('lint', ['lint:build', 'lint:scripts', 'lint:tests']);
