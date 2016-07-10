'use strict';

import config       from '../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import rename       from 'gulp-rename';
import svgSprite    from 'gulp-svg-sprite';
import merge        from 'merge-stream';
import getFolders   from '../util/getFolders';
import path         from 'path';
import plumber      from 'gulp-plumber';

gulp.task('svg', () => {
  const folders = getFolders(config.svg.src);
  const tasks = folders.map((folder) => {
    return gulp.src(path.join(config.svg.src, folder, '/*.svg'))
      .pipe(plumber({errorHandler: handleErrors}))
      .pipe(svgSprite({
        dest: './',
        mode: { symbol: { dest: './' } }
      }))
      .pipe(rename({
        basename: 'symbol',
        dirname: './',
        prefix: `sprite-${folder}.`
      }))
      .pipe(gulp.dest(config.svg.dest));
  });

  return merge(tasks);
});
