'use strict';

import config       from '../../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import rename       from 'gulp-rename';
import svgSprite    from 'gulp-svg-sprite';
import merge        from 'merge-stream';
import getFolders   from '../util/getFolders';
import path         from 'path';
import plumber      from 'gulp-plumber';
import argv         from 'argv';

export default function (src = config.svgs.src, dest = config.svgs.dest) {
  return function() {
    let folders = getFolders(src);
    let args = argv.option([
      {
        name: 'folder',
        type: 'string'
      }
    ]).run();

    if(args.options.folder && folders.includes(args.options.folder)) {
      folders = [args.options.folder];
    }

    let tasks = folders.map((folder) => {
      return gulp.src(path.join(src, folder, '/*.svg'))
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(svgSprite({
          dest: './',
          mode: { symbol: { dest: './' } }
        }))
        .pipe(rename({
          basename: folder,
          dirname: './',
          prefix: 'sprite-'
        }))
        .pipe(gulp.dest(dest));
    });

    return merge(tasks);
  };
}
