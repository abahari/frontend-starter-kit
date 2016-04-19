'use strict';

import * as fs from 'fs';
import minimist from 'minimist';

export default {

  // basic locations
  paths: {
    root: './',
    srcDir: './src/',
    destDir: './dist/',
  },

  styles: {
    src: './src/scss/**/*.scss',
    dest: './dist/css',
    prodSourcemap: false,
    sassIncludePaths: [],
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  },

  scripts: {
    src: './src/js/**/*.js',
    dest: './dist/js',
    test: './test/**/*.js',
    gulp: './gulp/**/*.js'
  },

  svg: {
    src: './src/svg/',
    dest: './dist/svg'
  },

  images: {
    src: './src/images/**/*.{png,jpg,gif,svg}',
    dest: './dist/images'
  },

  fonts: {
    src: ['./src/fonts/**/*.ttf'],
    dest: './dist/fonts'
  },

  html: {
    src: ['./src/html/**/*'],
    dest: './dist/html'
  },

  package: {
    src: './dist/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: './dist/',
    gzip: {}
  },

  serve: {
    browserPort: 3000,
    UIPort: 3001,
    testPort: 3002,
  },

  test: {},

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
      global.production = false;
    }

    return this;
  }

}.init();
