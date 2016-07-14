'use strict';

import config      from '../../config';
import changed     from 'gulp-changed';
import handleErrors from '../util/handleErrors';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import pngquant    from 'imagemin-pngquant';
import browser     from 'browser-sync';
import plumber     from 'gulp-plumber';
import notify      from 'gulp-notify';

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(plumber({errorHandler: handleErrors}))
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulpif(config.deploy, imagemin({
      optimizationLevel: 4,
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    }))) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(browser.stream())
    .pipe(notify({
      message: 'Images task complete'
    }));
});
