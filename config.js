'use strict';

import fs from 'graceful-fs';
import minimist from 'minimist';

export default {
  getConfig: function(dest) {
    return {
      // basic locations
      paths: {
        root: './',
        srcDir: './src/',
        destDir: dest,
      },

      styles: {
        src: './src/scss/**/*.scss',
        dest: `${dest}/css`,
        prodSourcemap: false,
        sassIncludePaths: [],
        autoprefixer: {
          browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3']
        }
      },

      scripts: {
        src: './src/js/**/*.js',
        dest: `${dest}/js`,
        prodSourcemap: false,
        test: './test/**/*.js',
        gulp: './gulp/**/*.js'
      },

      icons: {
        name: 'icons',
        template: './src/icons/templates/_icons.scss',
        css: './src/scss/_icons.scss',
        src: './src/icons/svg/*.svg',
        dest: `${dest}/icons/`,
      },

      svg: {
        src: './src/svg/',
        dest: `${dest}/svg/`
      },

      images: {
        src: './src/images/**/*.{png,jpg,gif,svg}',
        dest: `${dest}/images/`
      },

      favicons: {
        src: './src/favicon.png',
        dest: `${dest}/favicons/`,
        path: '../favicons/',
        developerName: this.author,
        developerURL: null,
        html: `./src/html/partials/favicons.hbs`
      },

      fonts: {
        src: ['./src/fonts/**/*.ttf'],
        dest: `${dest}/fonts/`
      },

      html: {
        src: ['./src/html/'],
        dest: `${dest}/html/`,
      },

      archive: {
        src: `${dest}/**/*`,
        dest: './archives/',
        zip: {}
      },

      serve: {
        browserPort: 3000,
        UIPort: 3001,
        testPort: 3002,
      },

      pagespeed: {
        url: 'http://url-to-your-package'
      },

      test: {},
    };
  },

  init: function() {
    const pkg = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

    this.banner = `/**
* ${pkg.title}
* ${pkg.description}
* Compiled: ${Date()}
* @version v${pkg.version}
* @link ${pkg.homepage}
* @copyright ${pkg.license}
*/
`;

    Object.assign(this, {
      args: minimist(process.argv.slice(2), {
        string: 'env',
        default: {
          env: process.env.NODE_ENV || 'dev'
        }
      }),
      version: pkg.version,
      name: pkg.name,
      title: pkg.title,
      description: pkg.description,
      author: pkg.author,
    });

    if (this.args.env === 'dev') {
      this.dev = true;
    }

    if(typeof this.deploy === 'undefined') {
      this.deploy = false;
    }

    const dest = this.deploy? 'dist': '_build';

    Object.assign(this, this.getConfig(dest));

    return this;
  }

}.init();
