'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import pngquant    from 'imagemin-pngquant';
import browserSync from 'browser-sync';
import plumber     from 'gulp-plumber';

gulp.task('images', () => {

  return gulp.src(config.images.src)
    .pipe(plumber())
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulpif(global.production, imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    }))) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.stream());

});
