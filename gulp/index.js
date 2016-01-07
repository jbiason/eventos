import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('qa', ['lint', 'test']);
gulp.task('ci', ['test']);
gulp.task('dev', ['lint', 'test', 'webpack:dev', 'watch']);
gulp.task('build', ['webpack:build'])
gulp.task('pre-commit', ['lint', 'test', 'build']);
