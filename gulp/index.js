import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./tasks')

gulp.task('ci', ['test'])
gulp.task('qa', ['lint', 'test'])

gulp.task('build-prod', ['copy', 'webpack:build'])
// gulp.task('build-prod', ['del', 'copy', 'webpack:build']) // use this when we don't commit bundle anymore
gulp.task('pre-commit', ['lint', 'test', 'build-prod'])

gulp.task('build-dev', ['copy', 'webpack:dev'])
// gulp.task('build-dev', ['del', 'copy', 'webpack:dev']) // use this when we don't commit bundle anymore
gulp.task('dev', ['lint', 'test', 'build-dev', 'watch'])
