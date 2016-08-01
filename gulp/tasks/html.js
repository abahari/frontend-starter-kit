'use strict';
import assemble     from 'assemble';
import config       from '../../config';
import extname      from 'gulp-extname';
import getSrcFiles  from '../util/getSrcFiles';
import notify       from 'gulp-notify';

let app = assemble();

/**
 * Tasks for loading and rendering our templates
 */
export default function (src = config.html.src, dest = config.html.dest, pages = '*.hbs', message = 'Html task complete') {
  app.option('layout', 'default');

  app.src(`${src}/**/*.hbs`);
  app.partials(`${src}/partials/*.hbs`);
  app.layouts(`${src}/layouts/*.hbs`);
  app.data(`${src}/data/*.{json,yml}`);
  app.helpers(`${src}/helpers/*.js`);
  app.pages(`${src}/pages/*.hbs`);

  return function() {
    let srcFiles = getSrcFiles(`${src}/pages`, pages, 'page');

    return app.src(srcFiles)
      .on('error', console.log)
      .pipe(app.renderFile())
      .pipe(extname('.html'))
      .pipe(app.dest(dest))
      .pipe(notify({
        message: message,
        onLast: true
      }));
  };
}
