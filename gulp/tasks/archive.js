'use strict';

import config from '../../config';
import gulp   from 'gulp';
import zip    from 'gulp-zip';
import notify from 'gulp-notify';

gulp.task('archive', () => {
  return gulp.src(config.archive.src)
    .pipe(zip(`${config.version}.zip`))
    .pipe(gulp.dest(config.archive.dest))
    .pipe(notify({
      message: 'Archive task complete'
    }));
});
