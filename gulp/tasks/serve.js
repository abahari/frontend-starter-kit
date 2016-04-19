'use strict';

import config      from '../config';
import browserSync from 'browser-sync';
import gulp        from 'gulp';

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: config.paths.destDir
    },
    port: config.serve.browserPort,
    ui: {
      port: config.serve.UIPort
    },
    ghostMode: {
      links: false
    }
  });
});
