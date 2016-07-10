'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import iconfont    from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import browser     from 'browser-sync';
import plumber     from 'gulp-plumber';
import path        from 'path';

gulp.task('icons', () => {
  return gulp.src(config.icons.src)
    .pipe(plumber())
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
    .pipe(gulp.dest(config.icons.dest));
});
