'use strict';

import config      from '../../config';
import gulp        from 'gulp';
import phantomcss  from 'gulp-phantomcss';
import getSrcFiles from '../util/getSrcFiles';

export default function (screen = '', viewportSize = config.visual.desktop.viewportSize, files = config.visual.desktop.files, src = config.visual.src, dest = config.visual.dest, results = config.visual.results, failures =  config.visual.failures){
  return function (){
    let srcFiles = getSrcFiles(src, files);

    return gulp.src(srcFiles)
      .pipe(phantomcss({
        screenshots: `${dest}/${screen}`,
        comparisonResultRoot: `${dest}/${results}/${screen}`,
        failedComparisonsRoot: `${dest}/${failures}/${screen}`,
        viewportSize: viewportSize
      }));
  };
}
