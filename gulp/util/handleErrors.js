'use strict';

import gutil    from 'gulp-util';
import config   from '../../config';
import notifier from 'node-notifier';

export default function(error, ...args) {
  if (!config.deploy) {
    // Send error to notification center with gulp-notify
    notifier.notify({
      title:    'Gulp',
      subtitle: 'Failure!',
      message:  `Error: ${error.message}`,
    });

    // Keep gulp from hanging on this task
    this.emit('end');
  } else {
    // Log the error and stop the process
    // to prevent broken code from building
    gutil.log(gutil.colors.red(error));
    process.exit(1);
  }
}
