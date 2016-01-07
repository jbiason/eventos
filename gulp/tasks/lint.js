import gulp from 'gulp';
import util from 'gulp-util';
import eslint from 'gulp-eslint';
import config from '../config';
import env from '../env';

gulp.task('lint:scripts', () => {
  return gulp.src(config.scriptsGlob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : util.noop())
  ;
});

gulp.task('lint:tests', () => {
  return gulp.src(config.testsGlob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : util.noop())
  ;
});

gulp.task('lint', ['lint:scripts', 'lint:tests']);
