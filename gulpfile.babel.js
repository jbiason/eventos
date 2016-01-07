'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

let config = {
  scriptsGlob: ['js/**/*.js', '!js/bundle.js'],
  lintFile: '.eslintrc.js'
};

gulp.task('lint', () => {
  gulp.src(config.scriptsGlob)
    .pipe(eslint({
      configFile: config.lintFile
    }))
    .pipe(eslint.format())
  ;
});

gulp.task('dev', ['lint'], () => {
  gulp.watch(config.scriptsGlob, ['lint']);
});
