'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import csslint     from 'gulp-csslint';
import getSrcFiles from '../util/getSrcFiles';

export default function (src = config.styles.dest, files = ['**/*.css', '!**/*.min.css']) {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(csslint('.csslintrc'))
      .pipe(csslint.formatter());
  };
}
