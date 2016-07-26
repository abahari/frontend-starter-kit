'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import babel        from 'gulp-babel';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import handleErrors from '../util/handleErrors';
import browser      from 'browser-sync';
import header       from 'gulp-header';
import rename       from 'gulp-rename';
import uglify       from 'gulp-uglify';
import size         from 'gulp-size';
import plumber      from 'gulp-plumber';
import beautify     from '../util/beautify';
import path         from 'path';
import notify      from 'gulp-notify';

export function scripts () {
  const createSourcemap = config.deploy || config.scripts.prodSourcemap;

  return gulp.src(config.scripts.src)
    .on('error', handleErrors)
    .pipe(plumber({errorHandler: handleErrors}))
    .pipe(babel())
    .pipe(header(config.banner))
    .pipe(beautify({
      config: path.join(config.paths.root, '.beautifyrc')
    }))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({
      title: 'scripts',
      showFiles: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(uglify())
    .pipe(header(config.banner))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write(config.deploy ? './' : null))
    )
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({
      title: 'minified scripts',
      showFiles: true
    }))
    .pipe(browser.stream())
    .pipe(notify({
      message: 'Scripts task complete'
    }));
};

gulp.task('scripts', scripts);
