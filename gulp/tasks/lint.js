import gulp from 'gulp'
import gutil from 'gulp-util'
import eslint from 'gulp-eslint'
import config from '../config'
import env from '../env'
import buildConfig from '../../config/eslint/eslint-build'
import srcConfig from '../../config/eslint/eslint-src'
import testConfig from '../../config/eslint/eslint-test'

const linterStream = (glob, lintConfig) => {
  return gulp.src(glob)
  .pipe(eslint(lintConfig))
  .pipe(eslint.format())
  .pipe(env.isPreCommit() ? eslint.failAfterError() : gutil.noop())
}

gulp.task('lint:build', () => linterStream(config.buildGlob, buildConfig))
gulp.task('lint:config', () => linterStream(config.configGlob, buildConfig))
gulp.task('lint:scripts', () => linterStream(config.scriptsGlob, srcConfig))
gulp.task('lint:tests', () => linterStream(config.testsGlob, testConfig))

gulp.task('lint', ['lint:build', 'lint:config', 'lint:scripts', 'lint:tests'])
