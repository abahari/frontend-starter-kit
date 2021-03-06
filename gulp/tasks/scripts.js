'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import babel        from 'gulp-babel';
import minify       from '../util/minifyScripts';
import handleErrors from '../util/handleErrors';
import getSrcFiles  from '../util/getSrcFiles';
import browser      from 'browser-sync';
import header       from 'gulp-header';
import rename       from 'gulp-rename';
import rollup       from 'gulp-rollup';
import size         from 'gulp-size';
import plumber      from 'gulp-plumber';
import path         from 'path';
import notify       from 'gulp-notify';

export default function scripts(src = config.scripts.src, dest = config.scripts.dest, entry = config.scripts.entry, files = config.scripts.files, message = 'Scripts task complete') {
  const createSourcemap = config.deploy || config.scripts.prodSourcemap;

  return function () {
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .on('error', handleErrors)
      .pipe(plumber({errorHandler: handleErrors}))
      .pipe(rollup({
        entry: `${src}/${entry}`
      }))
      .pipe(header(config.banner))
      .pipe(rename({
        suffix: '.es'
      }))
      .pipe(gulp.dest(dest))
      .pipe(babel({
        "plugins": [
          ["transform-es2015-modules-umd", {
            "globals": {
              "jquery": "jQuery"
            }
          }]
        ]
      }))
      .pipe(header(config.banner))
      .pipe(rename(function(path) {
        path.basename = path.basename.replace('.es', '');
      }))
      .pipe(gulp.dest(dest))
      .pipe(size({
        title: 'scripts',
        showFiles: true
      }))
      .pipe(minify({
        sourcemaps: config.deploy || config.scripts.prodSourcemap
      }))
      .pipe(gulp.dest(dest))
      .pipe(size({
        title: 'minified scripts',
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
