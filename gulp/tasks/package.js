'use strict';

import config from '../config';
import gulp   from 'gulp';
import gzip   from 'gulp-gzip';
import notify from 'gulp-notify';

gulp.task('package', () => {
  return gulp.src(config.package.src)
    .pipe(gzip(config.package.gzip))
    .pipe(gulp.dest(config.package.dest))
    .pipe(notify({
      message: 'Package task complete'
    }));

});
