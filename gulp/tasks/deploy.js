'use strict';

import config    from '../../config';
import gulp      from 'gulp';
import inquirer  from 'inquirer';
import replace   from 'gulp-replace';
import octophant from 'octophant';
import {execSync as exec, spawnSync as spawn} from 'child_process';

let VERSIONED_FILES = [
  'bower.json',
  'package.json'
];

let CURRENT_VERSION = require('../../package.json').version;
let NEXT_VERSION;

export function prompt(done) {
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
}

// Bumps the version number in any file that has one
export function version() {
  return gulp.src(VERSIONED_FILES, { base: process.cwd() })
    //.pipe(replace(CURRENT_VERSION, NEXT_VERSION))
    .pipe(replace(/("|')version\1\s*:\s*("|')([\d.]+)\2/, `$1version$1:$2${NEXT_VERSION}$2`))
    .pipe(gulp.dest('.'));
}

export function init(done) {
  config.deploy = true;
  config.init();

  done();
}

// Generates a settings file
export function settings(done) {
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
}

// Writes a commit with the changes to the version numbers
export function commit(done) {
  exec(`git commit -am "Bump to version ${NEXT_VERSION}"`);
  exec(`git tag v${NEXT_VERSION}`);
  exec('git push origin master --follow-tags');
  done();
}

export function pull(done) {
  let fail = function (msg) {
    console.error('Prepare aborted.');
    console.error(msg);
    process.exit(1);
  };

  // Check for uncommitted changes
  let gitStatusResult = exec('git status --porcelain');
  if (gitStatusResult.toString().length > 0) {
    return fail('You have uncommitted changes, please stash or commit them before running prepare');
  }

  // Pull latest
  let gitPullResult = spawn('git', ['pull', 'origin', 'master']);
  if (gitPullResult.status !== 0) {
    let error = gitPullResult.stderr.toString();
    return fail(`There was an error running 'git pull':\n${error}`);
  }

  return done();
}
