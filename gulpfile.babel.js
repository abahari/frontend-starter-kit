'use strict';

import fs          from 'graceful-fs';
import gulp        from 'gulp';
import runSequence from 'run-sequence';
import config      from './gulp/config';
import browser     from 'browser-sync';
import onlyScripts from './gulp/util/scriptFilter';
import help        from 'gulp-help';

help(gulp);

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

// Ensure process ends after all Gulp tasks are finished
// gulp.on('stop', () => {
//   if (!global.isWatching) {
//     process.nextTick(() => {
//       process.exit(0);
//     });
//   }
// });

tasks.forEach((task) => {
  require('./gulp/tasks/' + task);
});

// Build the files
gulp.task('build', ['clean'], done => {
  runSequence(['styles', 'scripts', 'images', 'fonts'], done);
});


// Starts a BrowerSync instance
gulp.task('serve', () => {
  browser.init({
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

// Reload browser
gulp.task('reload', function () {
  browser.reload();
});

// Watch files for changes
gulp.task('watch', () => {
  gulp.watch(config.scripts.src, ['scripts', browser.reload]);
  gulp.watch(config.styles.src,  ['styles', browser.reload]);
  gulp.watch(config.images.src,  ['images', browser.reload]);
  gulp.watch(config.fonts.src,   ['fonts', browser.reload]);
  gulp.watch(config.svg.src,     ['svg', browser.reload]);
});


// Register default task
gulp.task('default', [], done => {
  gulp.start('serve');

  if (global.dev) {
    gulp.start('watch');
  }
  done();
});


