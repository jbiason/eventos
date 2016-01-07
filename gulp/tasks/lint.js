import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import config from '../config';
import env from '../env';

const linterStream = (glob) => {
  return gulp.src(glob)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
  ;
};

gulp.task('lint:build', () => linterStream(config.buildGlob));
gulp.task('lint:config', () => linterStream(config.configGlob));
gulp.task('lint:scripts', () => linterStream(config.scriptsGlob));
gulp.task('lint:tests', () => linterStream(config.testsGlob));

gulp.task('lint', ['lint:build', 'lint:config', 'lint:scripts', 'lint:tests']);
