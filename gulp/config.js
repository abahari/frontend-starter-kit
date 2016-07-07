'use strict';

import fs from 'graceful-fs';
import minimist from 'minimist';
import path from 'path';

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
        dest: dest+'/css',
        prodSourcemap: false,
        sassIncludePaths: [],
        autoprefixer: {
          browsers: ['last 2 versions']
        }
      },

      scripts: {
        src: './src/js/**/*.js',
        dest: dest+'/js',
        prodSourcemap: false,
        test: './test/**/*.js',
        gulp: './gulp/**/*.js'
      },

      svg: {
        src: './src/svg/',
        dest: dest+'/svg'
      },

      images: {
        src: './src/images/**/*.{png,jpg,gif,svg}',
        dest: dest+'/images'
      },

      fonts: {
        src: ['./src/fonts/**/*.ttf'],
        dest: dest+'/fonts'
      },

      html: {
        src: ['./src/html/**/*'],
        dest: dest+'/html'
      },

      package: {
        src: dest+'/**/*.{html,xml,json,css,js,js.map,css.map}',
        dest: './package/',
        gzip: {}
      },

      serve: {
        browserPort: 3000,
        UIPort: 3001,
        testPort: 3002,
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
