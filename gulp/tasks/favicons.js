'use strict';
import fs        from 'fs';
import config    from '../../config';
import favicons  from 'favicons';
import mkdirp    from 'mkdirp';
import path      from 'path';
import notifier  from 'node-notifier';

export default function (src = config.favicons.src, dest = config.favicons.dest) {
  return function(done) {
    return favicons(src, {
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

      const faviconFolder = dest;

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

      notifier.notify({
        title: 'Gulp notification',
        message: 'Favicons task complete'
      });

      done();
    });
  };
}
