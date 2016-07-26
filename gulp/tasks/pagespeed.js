'use strict';

import config from '../../config';
import {output as pagespeed} from 'psi';
import gulp from 'gulp';

gulp.task('pagespeed:mobile', (cb) => {
  return pagespeed(config.pagespeed.url, {
    strategy: 'mobile',
    nokey: 'true'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

gulp.task('pagespeed:desktop', (cb) => {
  return pagespeed(config.pagespeed.url, {
    strategy: 'desktop',
    nokey: 'true'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

gulp.task('pagespeed', gulp.series('pagespeed:mobile', 'pagespeed:desktop'));
