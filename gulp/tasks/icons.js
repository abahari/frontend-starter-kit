'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import iconfont     from 'gulp-iconfont';
import iconfontCss  from 'gulp-iconfont-css';
import plumber      from 'gulp-plumber';
import path         from 'path';
import notify       from 'gulp-notify';

export default function (src = config.icons.src, dest = config.icons.dest, message = 'Icons task complete') {
  return function () {
    return gulp.src(src)
      .pipe(plumber({errorHandler: handleErrors}))
      .pipe(iconfontCss({
        fontName: config.icons.name,
        path: config.icons.template,
        targetPath: path.relative(dest, config.icons.css), // relative path to dest
        fontPath: '../icons/' // relatvie path to scss
      }))
      .pipe(iconfont({
        fontName: config.icons.name,
        prependUnicode: true,
        formats: ['woff2', 'svg', 'ttf', 'eot', 'woff'],
        normalize: false,
        timestamp: 0 // see https://github.com/fontello/svg2ttf/issues/33
      }))
      .pipe(gulp.dest(dest))
      .pipe(notify({
        message: message,
        onLast: true
      }));
  };
}
