'use strict';

import config       from '../config';
import gulp         from 'gulp';
import babel        from 'gulp-babel';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import header       from 'gulp-header';
import rename       from 'gulp-rename';
import uglify       from 'gulp-uglify';
import size         from 'gulp-size';

gulp.task('scripts', () => {
  const createSourcemap = !global.production || config.scripts.prodSourcemap;

  return gulp.src(config.scripts.src)
    .on('error', handleErrors)
    .pipe(babel())
    .pipe(header(config.banner))
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
      sourcemaps.write(global.production ? './' : null))
    )
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({
      title: 'minified scripts',
      showFiles: true
    }))
    .pipe(browserSync.stream());
});
