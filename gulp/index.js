import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('dev', ['lint', 'test', 'webpack:dev', 'watch']);
gulp.task('build', ['webpack:build'])
gulp.task('pre-commit', ['lint', 'test', 'build']);
gulp.task('ci', ['test']);
