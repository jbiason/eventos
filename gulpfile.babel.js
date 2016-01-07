'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

const config = {
  scriptsGlob: ['js/**/*.js', '!js/bundle.js'],
  lintFile: '.eslintrc.js',
  testFile: 'test/index.js',
};

const env = {
  isPreCommit() {
    return util.env.env === 'pre-commit';
  }
};

gulp.task('lint', () => {
  return gulp.src(config.scriptsGlob)
  .pipe(eslint({configFile: config.lintFile}))
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : util.noop())
  ;
});

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
  gulp.watch(config.scriptsGlob, ['lint']);
  gulp.watch(config.scriptsGlob, ['test']);
});

gulp.task('dev', ['lint', 'test', 'watch']);

gulp.task('pre-commit', ['lint', 'test']);
