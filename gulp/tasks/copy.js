import gulp from 'gulp'
import config from '../config'

gulp.task('copy:img', () => {
  return gulp.src(config.imgGlob)
  .pipe(gulp.dest(config.imgDestDir))
})

gulp.task('copy', ['copy:img'])
