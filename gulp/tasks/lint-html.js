'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import w3cjs       from 'gulp-w3cjs';
import htmlhint    from 'gulp-htmlhint';
import ga11y       from 'gulp-a11y';
import getSrcFiles from '../util/getSrcFiles';

export function w3c(src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(w3cjs())
      .pipe(w3cjs.reporter());
  };
}

export function html(src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter());
  };
}

export function ally(src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(ga11y(config.ally.options))
      .pipe(ga11y.reporter());
  };
}
