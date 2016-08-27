'use strict';
import gulpif       from 'gulp-if';
import lazypipe     from 'lazypipe';
import sourcemaps   from 'gulp-sourcemaps';
import rename       from 'gulp-rename';
import uglify       from 'gulp-uglify';

export default function(options) {
  options = Object.assign({
    rename: true,
    sourcemaps: true
  }, options);

  return lazypipe()
    .pipe(function() {
      return gulpif(options.rename, rename({
        suffix: '.min'
      }));
    })
    .pipe(function() {
      return gulpif(options.sourcemaps, sourcemaps.init());
    })
    .pipe(function() {
      return uglify({
        compress: true,
        preserveComments: 'license'
      });
    })
    .pipe(function() {
      return gulpif(
        options.sourcemaps,
        sourcemaps.write()
      );
    })();
}
