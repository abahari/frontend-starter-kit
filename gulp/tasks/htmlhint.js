'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import htmlhint    from 'gulp-htmlhint';
import getSrcFiles from '../util/getSrcFiles';

export default function (src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter());
  };
}
