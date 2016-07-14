'use strict';

import config       from '../../config';
import changed      from 'gulp-changed';
import handleErrors from '../util/handleErrors';
import gulp         from 'gulp';
import browser      from 'browser-sync';
import plumber      from 'gulp-plumber';
import fontmin      from 'gulp-fontmin';
import notify       from 'gulp-notify';

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(plumber({errorHandler: handleErrors}))
    .pipe(changed(config.fonts.dest)) // Ignore unchanged files
    .pipe(fontmin())
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browser.stream())
    .pipe(notify({
      message: 'Fonts task complete'
    }));
});
