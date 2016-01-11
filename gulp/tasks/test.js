import gulp from 'gulp'
import mocha from 'gulp-mocha'
import config from '../config'
import env from '../env'

gulp.task('test', () => {
  return gulp.src(config.testFile, {read: false})
  .pipe(mocha({reporter: 'nyan'}))
  .on('error', () => {
    if (env.isPreCommit()) {
      process.exit(1)
    }
  })
})
