'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import pngquant    from 'imagemin-pngquant';
import browser     from 'browser-sync';
import plumber     from 'gulp-plumber';

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(plumber())
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulpif(config.deploy, imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    }))) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(browser.stream());
});
