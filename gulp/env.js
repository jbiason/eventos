import util from 'gulp-util';

export default {
  isPreCommit() {
    return util.env.env === 'pre-commit';
  }
};
