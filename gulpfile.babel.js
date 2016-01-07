'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

const config = {
  scriptsGlob: ['js/**/*.js', '!js/bundle.js'],
  testsGlob: 'test/**/*.js',
  testFile: 'test/index.js',
};

const env = {
  isPreCommit() {
    return util.env.env === 'pre-commit';
  }
};

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

gulp.task('test', () => {
  return gulp.src(config.testFile, {read: false})
  .pipe(mocha())
  .on('error', (e) => {
    if (env.isPreCommit()) {
      process.exit(1);
    }
  })
  ;
});

gulp.task('watch', () => {
  gulp.watch(config.testsGlob, ['lint:tests']);
  gulp.watch(config.testsGlob, ['test']);
  gulp.watch(config.scriptsGlob, ['lint:scripts']);
  gulp.watch(config.scriptsGlob, ['test']);
});

gulp.task('dev', ['lint', 'test', 'watch']);

gulp.task('pre-commit', ['lint', 'test']);
