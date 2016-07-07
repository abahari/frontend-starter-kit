'use strict';

import gutil  from 'gulp-util';
import notify from 'gulp-notify';
import config from '../config';

export default function(error) {
  if (!config.deploy) {
    const args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
  } else {
    // Log the error and stop the process
    // to prevent broken code from building
    gutil.log(gutil.colors.red(error));
    process.exit(1);
  }
};
