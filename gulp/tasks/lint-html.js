'use strict';

import config from '../../config';
import gulp  from 'gulp';
import w3cjs from 'gulp-w3cjs';
import htmlhint from 'gulp-htmlhint';
import a11y from 'gulp-a11y';
import gutil from 'gulp-util';

gulp.task('lint:w3c', () => {
  return gulp.src(config.html.dest + '**/*.html')
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
});

gulp.task('lint:html', () => {
  return gulp.src(config.html.dest + '**/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
});

gulp.task('lint:ally', () => {
  return gulp.src(config.html.dest + '**/*.html')
  .pipe(a11y(config.ally.options))
  .pipe(a11y.reporter());
});
