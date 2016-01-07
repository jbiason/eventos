import gulp from 'gulp';
import config from '../config';
import del from 'del';

gulp.task('del', () => {
  del.sync(config.destDir);
});
