'use strict';

import config from '../config';
import gulp   from 'gulp';
import eslint from 'gulp-eslint';
import jscs   from 'gulp-jscs';

gulp.task('lint:es', () => {
  return gulp.src([config.scripts.src, config.scripts.test, config.scripts.gulp])
    .pipe(eslint({
      useEslintrc: true,
      configFile: '.eslintrc.yml'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:jscs', () => {
  return gulp.src([config.scripts.src, config.scripts.test, config.scripts.gulp])
    .pipe(jscs({
      configPath: '.jscsrc'
    }))
    .pipe(jscs.reporter());
});
