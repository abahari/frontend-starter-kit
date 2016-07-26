'use strict';

import fs          from 'graceful-fs';
import gulp        from 'gulp';
import config      from './config';
import browser     from 'browser-sync';
import onlyScripts from './gulp/util/scriptFilter';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach((task) => {
  require('./gulp/tasks/' + task);
});

// Build the files
gulp.task('build', gulp.series('clean', 'styles', 'scripts', 'images', 'fonts'));

// Generates compiled CSS and JS files and puts them in the dist/ folder
gulp.task('deploy:dist', gulp.series('styles', 'scripts', 'images', 'fonts'));
gulp.task('deploy:prepare', gulp.series('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist'));
gulp.task('deploy', gulp.series('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist', 'deploy:commit'));

// Starts a BrowerSync instance
gulp.task('serve', () => {
  browser.init({
    server: {
      baseDir: config.paths.destDir,
    },
    startPath: "html/index.html",
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
  gulp.watch(config.scripts.src, gulp.series('scripts', browser.reload));
  gulp.watch(config.styles.src,  gulp.series('styles', browser.reload));
  gulp.watch(config.images.src,  gulp.series('images', browser.reload));
  gulp.watch(config.fonts.src,   gulp.series('fonts', browser.reload));
  gulp.watch(config.svg.src,     gulp.series('svg', browser.reload));
});

// Register default task
gulp.task('default', gulp.series('serve'));
