'use strict';
import assemble from 'assemble';
import config   from '../../config';
import path     from 'path';
import gulp     from 'gulp';
import extname  from 'gulp-extname';

let app = assemble();

/**
 * Tasks for loading and rendering our templates
 */
gulp.task('html:load', (cb) => {
  app.option('layout', 'default');

  app.src(`${config.html.src}**/*.hbs`);

  app.partials(`${config.html.src}partials/*.hbs`);
  app.layouts(`${config.html.src}layouts/*.hbs`);
  app.data(`${config.html.src}data/*.{json,yml}`);
  app.helpers(`${config.html.src}helpers/*.js`);
  app.pages(`${config.html.src}pages/*.hbs`);

  cb();
});

gulp.task('html', ['html:load'], () => {
  return app.toStream('pages')
    .on('error', console.log)
    .pipe(app.renderFile())
    .pipe(extname('.html'))
    .pipe(app.dest(config.html.dest));
});
