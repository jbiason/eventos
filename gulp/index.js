import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('qa', ['lint', 'test']);
gulp.task('ci', ['test']);
gulp.task('build', ['del', 'copy', 'webpack:build']);
gulp.task('pre-commit', ['lint', 'test', 'build']);
gulp.task('dev', ['lint', 'test', 'del', 'copy', 'webpack:dev', 'watch']);
