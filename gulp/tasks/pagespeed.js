'use strict';

import config from '../../config';
import {output as pagespeed} from 'psi';

export default function (options = {}, url = config.pagespeed.url) {
  options = Object.assign({
    nokey: 'true',

    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, options);

  return function(done){
    return pagespeed(url, options, done);
  };
}
