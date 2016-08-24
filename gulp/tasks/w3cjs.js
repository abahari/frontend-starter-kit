'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import w3cjs       from 'gulp-w3cjs';
import getSrcFiles from '../util/getSrcFiles';

export default function (src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(w3cjs())
      .pipe(w3cjs.reporter());
  };
}
