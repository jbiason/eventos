import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
  gulp.watch(config.testsGlob, ['lint:tests']);
  gulp.watch(config.testsGlob, ['test']);
  gulp.watch(config.scriptsGlob, ['lint:scripts']);
  gulp.watch(config.scriptsGlob, ['test']);
});
