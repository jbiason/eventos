import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import config from '../config';
import env from '../env';

gulp.task('test', () => {
  return gulp.src(config.testFile, {read: false})
  .pipe(mocha())
  .on('error', (e) => {
    if (env.isPreCommit()) {
      console.error('### test.js process.exit(1);');
      process.exit(1);
    }
  })
  ;
});
