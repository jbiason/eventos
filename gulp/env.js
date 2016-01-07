import gutil from 'gulp-util';

export default {
  isPreCommit() {
    return gutil.env.env === 'pre-commit';
  }
};
