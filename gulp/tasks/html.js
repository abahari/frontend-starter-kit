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
  app.partials(`${src}/${config.assemble.partials}/*.hbs`);
  app.layouts(`${src}/${config.assemble.layouts}/*.hbs`);
  app.data(`${src}/${config.assemble.data}/*.{json,yml}`);
  app.helpers(`${src}/${config.assemble.helpers}/*.js`);
  app.pages(`${src}/${config.assemble.pages}/*.hbs`);

  return function() {
    let srcFiles = getSrcFiles(`${src}/${config.assemble.pages}`, pages, 'page');

    return app.src(srcFiles)
      .on('error', console.log)
      .pipe(app.renderFile())
      .pipe(extname('.html'))
      .pipe(app.dest(dest))
      .pipe(notify({
        title: config.notify.title,
        message: message,
        onLast: true
      }));
  };
}
