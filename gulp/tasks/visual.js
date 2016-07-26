'use strict';

import config from '../../config';
import gulp from 'gulp';
import phantomcss from 'gulp-phantomcss';
import del    from 'del';

gulp.task('visual:desktop', () => {
  return gulp.src(config.visual.desktop.src)
    .pipe(phantomcss({
      screenshots: config.visual.desktop.screenshots,
      comparisonResultRoot: config.visual.desktop.comparisonResultRoot,
      failedComparisonsRoot: config.visual.desktop.failedComparisonsRoot,
      viewportSize: config.visual.desktop.viewportSize
    }));
});

gulp.task('visual:mobile', () => {
  return gulp.src(config.visual.mobile.src)
    .pipe(phantomcss({
      screenshots: config.visual.mobile.screenshots,
      comparisonResultRoot: config.visual.mobile.comparisonResultRoot,
      failedComparisonsRoot: config.visual.mobile.failedComparisonsRoot,
      viewportSize: config.visual.mobile.viewportSize
    }));
});

gulp.task('visual', gulp.series('visual:desktop', 'visual:mobile'));

gulp.task('visual:restart', (done) => {
  del.sync([config.visual.dest]);

  done();
});
