'use strict';

import config from '../../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('clean', (done) => {
  del.sync([config.paths.destDir]);

  done();
});

gulp.task('clean:styles', (done) => {
  del.sync([config.styles.dest]);

  done();
});

gulp.task('clean:scripts', (done) => {
  del.sync([config.scripts.dest]);

  done();
});

gulp.task('clean:svg', (done) => {
  del.sync([config.svg.dest]);

  done();
});

gulp.task('clean:images', (done) => {
  del.sync([config.images.dest]);

  done();
});

gulp.task('clean:fonts', (done) => {
  del.sync([config.fonts.dest]);

  done();
});

gulp.task('clean:html', (done) => {
  del.sync([config.html.dest]);

  done();
});
