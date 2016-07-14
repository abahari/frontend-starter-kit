'use strict';

import config from '../../config';
import gulp  from 'gulp';
import w3cjs from 'gulp-w3cjs';
import htmllint from 'gulp-htmllint';

gulp.task('lint:w3c', () => {
  return gulp.src(config.html.dest)
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
});

gulp.task('lint:html', () => {
  return gulp.src(config.html.dest)
  .pipe(htmllint({config: '.htmllintrc'}));
});
