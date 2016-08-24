'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import a11y        from 'gulp-a11y';
import getSrcFiles from '../util/getSrcFiles';

export default function (src = config.html.dest, files = '**/*.html') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(a11y(config.ally.options))
      .pipe(a11y.reporter());
  };
}
