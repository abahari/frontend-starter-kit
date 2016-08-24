'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import jshint      from 'gulp-jshint';
import getSrcFiles from '../util/getSrcFiles';

export default function(src = config.scripts.src, files = ['**/*.js', '!**/*.min.js']) {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(jshint({
        lookup: true
      }))
      .pipe(jshint.reporter('default'));
  };
}
