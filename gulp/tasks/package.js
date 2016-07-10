'use strict';

import config from '../config';
import gulp   from 'gulp';
import zip    from 'gulp-zip';
import notify from 'gulp-notify';

gulp.task('package', () => {
  return gulp.src(config.package.src)
    .pipe(zip(`${config.version}.zip`))
    .pipe(gulp.dest(config.package.dest))
    .pipe(notify({
      message: 'Package task complete'
    }));
});
