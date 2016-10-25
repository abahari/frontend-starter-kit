'use strict';

import fs from 'graceful-fs';
import minimist from 'minimist';

export default {
  getConfig: function(pkg, src, dest) {
    return {
      version: pkg.version,
      name: pkg.name,
      title: pkg.title,
      description: pkg.description,
      author: pkg.author,
      banner: `/**
* ${pkg.title} v${pkg.version}
* ${pkg.homepage}
*
* Copyright (c) ${pkg.author.name}
* Released under the ${pkg.license} license
*/
`,
      // basic locations
      paths: {
        root: './',
        srcDir: `${src}/`,
        destDir: `${dest}/`,
      },

      assets: {
        dest: `${dest}`,
        dests: {
          images: "images",
          fonts: "fonts",
          js: "js",
          css: "css",
        },
        'dest:coffee': `${src}/coffee`,
        'dest:es6': `${src}/es6`,
        'dest:stylus': `${src}/stylus`,
        'dest:less': `${src}/less`,
        'dest:sass': `${src}/sass`,
        'dest:scss': `${src}/scss`
      },

      styles: {
        files: '**/*.scss',
        src: `${src}/scss`,

        dest: `${dest}/css`,
        prodSourcemap: false,
        sassIncludePaths: [],
        autoprefixer: {
          browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3']
        }
      },

      scripts: {
        entry: 'index.js',
        files: '**/*.js',
        src: `${src}/js`,
        dest: `${dest}/js`,
        prodSourcemap: false,
        test: './test',
        gulp: './gulp'
      },

      icons: {
        name: 'icons',
        template: `${src}/icons/templates/_icons.scss`,
        css: `${src}/scss/_icons.scss`,
        src: `${src}/icons/svg/*.svg`,
        dest: `${dest}/icons/`,
      },

      svgs: {
        src: `${src}/svgs/`,
        dest: `${dest}/svgs/`
      },

      images: {
        files: '**/*.{png,jpg,gif,svg}',
        src: `${src}/images`,
        dest: `${dest}/images`
      },

      favicons: {
        src: `${src}/favicon.png`,
        dest: `${dest}/favicons`,
        path: '../favicons/',
        developerName: this.author,
        developerURL: null,
        html: `${src}/html/partials/favicons.hbs`
      },

      fonts: {
        files: '**/*.ttf',
        src: `${src}/fonts`,
        dest: `${dest}/fonts`
      },

      html: {
        src: `${src}/html`,
        dest: `${dest}/html`,
      },

      assemble: {
        partials: 'partials',
        layouts: 'layouts',
        data:  'data',
        helpers: 'helpers',
        pages: 'pages'
      },

      archive: {
        src: `${dest}/**/*`,
        dest: './archives/',
        zip: {}
      },

      browser: {
        baseDir: `${dest}`,
        startPath: "html/index.html",
        browserPort: 3000,
        UIPort: 3001,
        testPort: 3002,
      },

      a11y: {
        options: {
          delay: 1,
          viewportSize: "1200x900"
        }
      },

      pagespeed: {
        url: 'http://url-to-your-package'
      },

      visual: {
        dest: './screenshots',
        results: 'results',
        failures: 'failures',
        src: './test/visual',
        desktop: {
          files: '**/*.{desktop,all}.js',
          viewportSize: [1280, 800],
        },
        mobile: {
          files: '**/*.{mobile,all}.js',
          viewportSize: [320, 480],
        }
      },
      notify: {
        title: pkg.title
      },

      test: {},
    };
  },

  init: function() {
    const pkg = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

    Object.assign(this, {
      args: minimist(process.argv.slice(2), {
        string: 'env',
        default: {
          env: process.env.NODE_ENV || 'dev'
        }
      })
    });

    if (this.args.env === 'dev') {
      this.dev = true;
    }

    if(typeof this.deploy === 'undefined') {
      this.deploy = false;
    }

    let src = 'src';
    let dest = this.deploy? 'dist': '_build';

    Object.assign(this, this.getConfig(pkg, src, dest));

    return this;
  }

}.init();
