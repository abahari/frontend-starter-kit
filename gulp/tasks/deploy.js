'use strict';

import config from '../../config';
import gulp from 'gulp';
import inquirer from 'inquirer';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
import octophant from 'octophant';
import {execSync as exec} from 'child_process';
import {spawnSync as spawn} from 'child_process';

let VERSIONED_FILES = [
  'bower.json',
  'package.json'
];

let CURRENT_VERSION = require('../../package.json').version;
let NEXT_VERSION;

gulp.task('deploy', (done) => {
  runSequence('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist', 'deploy:commit', done);
});

gulp.task('deploy:prepare', (done) => {
  runSequence('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist', done);
});

gulp.task('deploy:prompt', (done) => {
  inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: `What version are we moving to? (Current version is ${CURRENT_VERSION})`,
    validate: function (input) {
      if(input === '') {
        input = CURRENT_VERSION;
      }
      return /^\d*[\d.]*\d*$/.test(input);
    }
  }]).then((answers) => {
    if(answers.version === '') {
      NEXT_VERSION = CURRENT_VERSION;
    } else {
      NEXT_VERSION = answers.version;
    }
    done();
  });
});

// Bumps the version number in any file that has one
gulp.task('deploy:version', () => {
  return gulp.src(VERSIONED_FILES, { base: process.cwd() })
    //.pipe(replace(CURRENT_VERSION, NEXT_VERSION))
    .pipe(replace(/("|')version\1\s*:\s*("|')([\d.]+)\2/, `$1version$1:$2${NEXT_VERSION}$2`))
    .pipe(gulp.dest('.'));
});

// Generates compiled CSS and JS files and puts them in the dist/ folder
gulp.task('deploy:dist', (done) => {
  config.deploy = true;
  config.init();

  runSequence('styles', 'scripts', 'images', 'fonts', done);
});

// Generates a settings file
gulp.task('deploy:settings', (done) => {
  let options = {
    title: 'Settings',
    output: './src/scss/settings/_settings.scss',
    groups: {
      foo: 'The Foo',
      bar: 'Another Bar'
    },
    sort: [
      'bar',
      'foo',
    ],
    imports: ['mixins']
  };

  octophant('./src/scss', options, done);
});

// Writes a commit with the changes to the version numbers
gulp.task('deploy:commit', (done) => {
  exec(`git commit -am "Bump to version ${NEXT_VERSION}"`);
  exec(`git tag v${NEXT_VERSION}`);
  exec('git push origin master --follow-tags');
  done();
});


gulp.task('deploy:pull', (done) => {
  function fail(context, msg) {
    console.error('Prepare aborted.');
    console.error(msg);
    process.exit(1);
  }

  // Check for uncommitted changes
  let gitStatusResult = exec('git status --porcelain');
  if (gitStatusResult.toString().length > 0) {
    return fail(this, 'You have uncommitted changes, please stash or commit them before running prepare');
  }

  // Pull latest
  let gitPullResult = spawn('git', ['pull', 'origin', 'master']);
  if (gitPullResult.status !== 0) {
    return fail('There was an error running \'git pull\':\n' + gitPullResult.stderr.toString());
  }
});
