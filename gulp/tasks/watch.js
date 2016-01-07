import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
  // test
  gulp.watch(config.testsGlob, ['test']);
  gulp.watch(config.scriptsGlob, ['test']);
  // lint
  gulp.watch(config.testsGlob, ['lint:tests']);
  gulp.watch(config.scriptsGlob, ['lint:scripts']);
  // bundle
  gulp.watch(config.scriptsGlob, ['webpack:dev']);
});
