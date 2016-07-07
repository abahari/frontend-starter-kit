'use strict';

import config from '../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('clean', () => {
  return del([config.paths.destDir]);
});

gulp.task('clean:styles', () => {
  return del([config.styles.dest]);
});

gulp.task('clean:scripts', () => {
  return del([config.scripts.dest]);
});

gulp.task('clean:svg', () => {
  return del([config.svg.dest]);
});

gulp.task('clean:images', () => {
  return del([config.images.dest]);
});

gulp.task('clean:fonts', () => {
  return del([config.fonts.dest]);
});

gulp.task('clean:html', () => {
  return del([config.html.dest]);
});
