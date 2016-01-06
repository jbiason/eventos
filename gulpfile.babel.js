'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

let config = {
  scriptsDir: ['js/**/*.js', '!js/bundle.js'],
  lintFile: '.eslintrc.js'
}

gulp.task('lint', () => {
  gulp.src(config.scriptsDir)
    .pipe(eslint({
      configFile: config.lintFile
    }))
    .pipe(eslint.format())
  ;
});

gulp.task('dev', ['lint'], () => {
  gulp.watch(config.scriptsDir, ['lint']);
});
