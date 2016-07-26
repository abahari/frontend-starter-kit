'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import sass         from 'gulp-sass';
import sassUnicode  from 'gulp-sass-unicode';
import handleErrors from '../util/handleErrors';
import browser      from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cssnano      from 'gulp-cssnano';
import csscomb      from 'gulp-csscomb';
import rename       from 'gulp-rename';
import header       from 'gulp-header';
import size         from 'gulp-size';
import plumber      from 'gulp-plumber';
import notify       from 'gulp-notify';

export function styles () {
  const createSourcemap = config.deploy || config.styles.prodSourcemap;

  return gulp.src(config.styles.src)
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
    .pipe(gulp.dest(config.styles.dest))
    .pipe(size({
      title: 'styles',
      showFiles: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(cssnano({
      safe: true,
      autoprefixer: false
    }))
    .pipe(header(config.banner))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write(config.deploy ? './' : null))
    )
    .pipe(gulp.dest(config.styles.dest))
    .pipe(size({
      title: 'minified styles',
      showFiles: true
    }))
    .pipe(browser.stream())
    .pipe(notify({
      message: 'Styles task complete'
    }));
}

gulp.task('styles', styles);
