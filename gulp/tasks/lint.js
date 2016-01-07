import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import config from '../config';
import env from '../env';

gulp.task('lint:build', () => {
  return gulp.src(config.buildGlob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
});

gulp.task('lint:scripts', () => {
  return gulp.src(config.scriptsGlob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
});

gulp.task('lint:tests', () => {
  return gulp.src(config.testsGlob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
});

gulp.task('lint', ['lint:build', 'lint:scripts', 'lint:tests']);
