'use strict';

import config       from '../../config';
import changed      from 'gulp-changed';
import handleErrors from '../util/handleErrors';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import imagemin     from 'gulp-imagemin';
import pngquant     from 'imagemin-pngquant';
import browser      from 'browser-sync';
import plumber      from 'gulp-plumber';
import notify       from 'gulp-notify';
import getSrcFiles  from '../util/getSrcFiles';

export default function (src = config.images.src, dest = config.images.dest, files = config.images.files, message = 'Images task complete') {
  return function () {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(plumber({errorHandler: handleErrors}))
      .pipe(changed(dest)) // Ignore unchanged files
      .pipe(gulpif(config.deploy, imagemin({
        optimizationLevel: 4,
        progressive: true,
        interlaced: true,
        use: [pngquant()]
      }))) // Optimize
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
      .pipe(notify({
        message: message,
        onLast: true
      }));
  };
}
