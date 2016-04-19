'use strict';

import {output as pagespeed} from 'psi';
import gulp from 'gulp';

gulp.task('pagespeed:mobile', (cb) => {
  return pagespeed(config.prodURL, {
    strategy: 'mobile',
    nokey: 'true'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

gulp.task('pagespeed:desktop', (cb) => {
  return pagespeed(config.prodURL, {
    strategy: 'desktop',
    nokey: 'true'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

gulp.task('pagespeed', ['pagespeed:mobile', 'pagespeed:desktop']);
