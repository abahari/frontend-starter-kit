'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import scsslint    from 'gulp-scss-lint';
import getSrcFiles from '../util/getSrcFiles';

export default function (src = config.styles.src, files = '**/*.scss') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(scsslint({
        config: '.scss-lint.yml'
      }));
  };
}
