import gulp from 'gulp';
import config from '../config';

gulp.task('copy:img', () => {
  gulp.src(config.imgGlob)
  .pipe(gulp.dest(config.imgDest))
  ;
});

gulp.task('copy', ['copy:img']);
