'use strict';

import config from '../config';
import gulp   from 'gulp';
import gzip   from 'gulp-gzip';

gulp.task('package', () => {

  return gulp.src(config.package.src)
    .pipe(gzip(config.package.gzip))
    .pipe(gulp.dest(config.package.dest));

});
