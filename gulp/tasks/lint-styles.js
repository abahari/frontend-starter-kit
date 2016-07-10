'use strict';

import config from '../config';
import gulp   from 'gulp';
import csslint from 'gulp-csslint';
import scsslint from 'gulp-scss-lint';
import stylelint from 'gulp-stylelint';

gulp.task('lint:css', () => {
  return gulp.src([config.styles.dest])
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter())
    .pipe(csslint.reporter('fail'));
});

gulp.task('lint:scss', () => {
  return gulp.src([config.styles.src])
    .pipe(scsslint({
      config: '.scss-lint.yml'
    }))
    .pipe(scsslint.failReporter());
});

gulp.task('lint:style', () => {
  return gulp.src([config.styles.dest])
    .pipe(stylelint({
      config: '.stylelintrc',
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});
