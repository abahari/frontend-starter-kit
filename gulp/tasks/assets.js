'use strict';

import config        from '../../config';
import merge         from 'merge-stream';
import gulp          from 'gulp';
import browser       from 'browser-sync';
import notify        from 'gulp-notify';
import concat        from 'gulp-concat';
import getSrcFiles   from '../util/getSrcFiles';
import assetBuilder  from 'asset-builder';
import minifyScripts from '../util/minifyScripts';
import minifyStyles  from '../util/minifyStyles';

const manifest = assetBuilder('manifest.json');

/*
 * Checkout http://use-asset-builder.austinpray.com/
 */
export function scripts (dest = config.assets.scripts, message = 'Scripts assets task complete') {
  return function () {
    let merged = merge();

    manifest.forEachDependency('js', function(dep) {
      merged.add(
        gulp.src(dep.globs, {base: 'scripts'})
          .pipe(concat(dep.name))
          .pipe(minifyScripts())
      );
    });
    return merged
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
      .pipe(notify({
        title: config.notify.title,
        message: message,
        onLast: true
      }));
  };
}

export function styles (dest = config.assets.styles, message = 'Styles assets task complete') {
  return function () {
    let merged = merge();

    manifest.forEachDependency('css', function(dep) {
      merged.add(
        gulp.src(dep.globs, {base: 'styles'})
          .pipe(concat(dep.name))
          .pipe(minifyStyles())
      );
    });
    return merged
      .pipe(gulp.dest(dest))
      .pipe(browser.stream())
      .pipe(notify({
        title: config.notify.title,
        message: message,
        onLast: true
      }));
  };
}

