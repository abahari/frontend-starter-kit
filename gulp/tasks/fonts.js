'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browser     from 'browser-sync';
import plumber     from 'gulp-plumber';
import fontmin     from 'gulp-fontmin';

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(plumber())
    .pipe(changed(config.fonts.dest)) // Ignore unchanged files
    .pipe(fontmin())
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browser.stream());

});
