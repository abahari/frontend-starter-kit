'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], (cb) => {

  global.production = false;

  runSequence(['styles', 'images', 'fonts'], 'watch', cb);

});
