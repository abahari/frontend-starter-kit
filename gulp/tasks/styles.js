'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sass         from 'gulp-sass';
import sassUnicode  from 'gulp-sass-unicode';
import minify       from '../util/minifyStyles';
import handleErrors from '../util/handleErrors';
import browser      from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import csscomb      from 'gulp-csscomb';
import header       from 'gulp-header';
import size         from 'gulp-size';
import plumber      from 'gulp-plumber';
import notify       from 'gulp-notify';
import getSrcFiles  from '../util/getSrcFiles';

export default function (src = config.styles.src, dest = config.styles.dest, files = config.styles.files, message = 'Styles task complete') {
  return function() {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .on('error', handleErrors)
      .pipe(plumber({errorHandler: handleErrors}))
      .pipe(sass({
        outputStyle: 'nested',
        includePaths: config.styles.sassIncludePaths
      }))
      .pipe(sassUnicode())
      .pipe(csscomb('.csscomb.json'))
      .pipe(autoprefixer(config.styles.autoprefixer))
      .pipe(header(config.banner))
      .pipe(gulp.dest(dest))
      .pipe(size({
        title: 'styles',
        showFiles: true
      }))
      .pipe(minify({
        sourcemaps: config.deploy || config.styles.prodSourcemap
      }))
      .pipe(gulp.dest(dest))
      .pipe(size({
        title: 'minified styles',
        showFiles: true
      }))
      .pipe(browser.stream())
      .pipe(notify({
        title: config.notify.title,
        message: message,
        onLast: true
      }));
  };
}
