'use strict';
import fs           from 'fs';
import config       from '../../config';
import favicons     from 'favicons';
import handleErrors from '../util/handleErrors';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import mkdirp       from 'mkdirp';
import browser      from 'browser-sync';
import plumber      from 'gulp-plumber';
import notify       from 'gulp-notify';
import path         from 'path';

gulp.task('favicons', (done) => {
  return favicons(config.favicons.src, {
    appName: config.title,
    appDescription: config.description,
    developerName: config.favicons.developerName,
    developerURL: config.favicons.developerURL,
    background: 'transparent',
    path: config.favicons.path,
    display: 'standalone',
    orientation: 'portrait',
    version: config.version,
    logging: false,
    online: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: true,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      windows: true,
      yandex: true
    }
  }, (error, response) => {
    if (error) {
      console.log(error.status);
      console.log(error.name);
      console.log(error.message);
    }

    const faviconFolder = config.favicons.dest;

    if (response.images) {
      mkdirp.sync(faviconFolder);
      response.images.forEach((image) =>
        fs.writeFileSync(path.join(faviconFolder, image.name), image.contents)
      );
    }

    if (response.files) {
      mkdirp.sync(faviconFolder);
      response.files.forEach((file) =>
        fs.writeFileSync(path.join(faviconFolder, file.name), file.contents)
      );
    }

    if (response.html) {
      fs.writeFileSync(config.favicons.html, response.html.join('\n'));
    }

    done();
  });
});
