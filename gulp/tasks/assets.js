'use strict';

import config        from '../../config';
import merge         from 'merge-stream';
import gulp          from 'gulp';
import browser       from 'browser-sync';
import notify        from 'gulp-notify';
import concat        from 'gulp-concat';
import getSrcFiles   from '../util/getSrcFiles';
import AssetsManager from 'assets-manager';

/*
 * Checkout https://github.com/amazingSurge/assets-manager
 */
export function copy(options = config.assets, message = 'Assets task complete') {
  const manager = new AssetsManager('manifest.json', options);

  return function (done) {
    manager.copyPackages().then(()=>{
      done();
    });
  };
}

export function clean(options = config.assets, message = 'Assets task complete') {
  const manager = new AssetsManager('manifest.json', options);

  return function (done) {
    manager.cleanPackages().then(()=>{
      done();
    });
  };
}
