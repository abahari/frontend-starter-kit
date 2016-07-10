'use strict';

import config from '../config';
import gulp   from 'gulp';
import eslint from 'gulp-eslint';
import jshint from 'gulp-jshint';

gulp.task('lint:es', () => {
  return gulp.src([config.scripts.src, config.scripts.dest, config.scripts.test, config.scripts.gulp])
    .pipe(eslint({
      useEslintrc: true,
      configFile: '.eslintrc.yml',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:js', () => {
  return gulp.src([config.scripts.src, config.scripts.test, config.scripts.gulp])
    .pipe(jshint({
      lookup: true
    }))
    .pipe(jshint.reporter('default'));
});
