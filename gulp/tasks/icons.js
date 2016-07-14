'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import iconfont     from 'gulp-iconfont';
import iconfontCss  from 'gulp-iconfont-css';
import plumber      from 'gulp-plumber';
import path         from 'path';
import notify       from 'gulp-notify';

gulp.task('icons', () => {
  return gulp.src(config.icons.src)
    .pipe(plumber({errorHandler: handleErrors}))
    .pipe(iconfontCss({
      fontName: config.icons.name,
      path: config.icons.template,
      targetPath: path.relative(config.icons.dest, config.icons.css), // relative path to dest
      fontPath: '../icons/' // relatvie path to scss
    }))
    .pipe(iconfont({
      fontName: config.icons.name,
      prependUnicode: true,
      formats: ['woff2', 'svg', 'ttf', 'eot', 'woff'],
      normalize: false,
      timestamp: 0 // see https://github.com/fontello/svg2ttf/issues/33
    }))
    .pipe(gulp.dest(config.icons.dest))
    .pipe(notify({
      message: 'Icons task complete'
    }));
});
