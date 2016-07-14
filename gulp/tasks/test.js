'use strict';

import { Server as KarmaServer } from 'karma';

import config from '../../config';
import gulp from 'gulp';
import path from 'path';

// Run karma for development, will watch and reload
gulp.task('tdd', (done) => {
  let karma = new KarmaServer({
    configFile: __dirname +'/../../karma.conf.js',
  }, done);

  karma.start();
});

// Run tests and report for ci
gulp.task('test', (done) => {
  let karma = new KarmaServer({
    configFile: __dirname +'/../../karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
  }, done);

  karma.start();
});

gulp.task('coverage', (done) => {
  let karma = new KarmaServer({
    configFile: __dirname +'/../../karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['coverage'],
  }, done);

  karma.start();
});
