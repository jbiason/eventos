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
  .on('error', () => {
    if (env.isPreCommit()) {
      process.exit(1);
    }
  })
  ;
};

gulp.task('lint:scripts', () => {
  return linterStream(config.scriptsGlob);
});

gulp.task('lint:tests', () => {
  return linterStream(config.testsGlob);
});

gulp.task('lint', ['lint:scripts', 'lint:tests']);
