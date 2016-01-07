import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('qa', ['lint', 'test']);
gulp.task('ci', ['test']);
gulp.task('dev', ['lint', 'test', 'copy', 'webpack:dev', 'watch']);
gulp.task('build', ['copy', 'webpack:build']);
gulp.task('pre-commit', ['lint', 'test', 'build']);
