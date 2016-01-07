import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('dev', ['lint', 'test', 'watch']);
gulp.task('pre-commit', ['lint', 'test']);
