'use strict';

import fs          from 'graceful-fs';
import gulp        from 'gulp';
import config      from './config';

// Tasks
import clean             from './gulp/tasks/clean';
import favicons          from './gulp/tasks/favicons';
import fonts             from './gulp/tasks/fonts';
import icons             from './gulp/tasks/icons';
import svgs              from './gulp/tasks/svgs';
import images            from './gulp/tasks/images';
import styles            from './gulp/tasks/styles';
import {bundler,scripts} from './gulp/tasks/scripts';
import html              from './gulp/tasks/html';
import * as lintHtml     from './gulp/tasks/lint-html';
import * as lintScripts  from './gulp/tasks/lint-scripts';
import * as lintStyles   from './gulp/tasks/lint-styles';
import pagespeed         from './gulp/tasks/pagespeed';
import test              from './gulp/tasks/test';
import visual            from './gulp/tasks/visual';
import * as deploy       from './gulp/tasks/deploy';
import * as browser      from './gulp/tasks/browser';
import archive           from './gulp/tasks/archive';

gulp.task('favicons', favicons());
gulp.task('clean:favicons', clean(config.favicons.dest));

gulp.task('images', images());
gulp.task('clean:images', clean(config.images.dest));

gulp.task('icons', icons());
gulp.task('clean: icons', clean(config.icons.dest));

gulp.task('fonts', fonts());
gulp.task('clean:fonts', clean(config.fonts.dest));

gulp.task('svgs', svgs());
gulp.task('clean:svgs', clean(config.svgs.dest));

gulp.task('styles', styles());
gulp.task('clean:styles', clean(config.styles.dest));

gulp.task('bundler', bundler());
gulp.task('scripts', scripts());
gulp.task('clean:scripts', clean(config.scripts.dest));

gulp.task('html', html());
gulp.task('clean:html', clean(config.html.dest));

gulp.task('clean', clean(config.paths.destDir));

// Build the files
gulp.task('build', gulp.series('clean', 'styles', 'bundler', 'scripts', 'images', 'icons', 'fonts', 'svgs', 'html'));

// Lint html
gulp.task('lint:w3c', lintHtml.w3c());
gulp.task('lint:html', lintHtml.html());
gulp.task('lint:ally', lintHtml.ally());

// Lint Scripts
gulp.task('lint:es:src', lintScripts.es(config.scripts.src));
gulp.task('lint:es:dest', lintScripts.es(config.scripts.dest));
gulp.task('lint:es:test', lintScripts.es(config.scripts.test));
gulp.task('lint:es:gulp', lintScripts.es(config.scripts.gulp, {rules: {'no-console': 'off'}}));
gulp.task('lint:es', gulp.series('lint:es:src', 'lint:es:dest', 'lint:es:test', 'lint:es:gulp'));

gulp.task('lint:js:src', lintScripts.js(config.scripts.src));
gulp.task('lint:js:dest', lintScripts.js(config.scripts.dest));
gulp.task('lint:js:test', lintScripts.js(config.scripts.test));
gulp.task('lint:js:gulp', lintScripts.js(config.scripts.gulp));
gulp.task('lint:js', gulp.series('lint:js:src', 'lint:js:dest', 'lint:js:test', 'lint:js:gulp'));

// Lint Styles
gulp.task('lint:css', lintStyles.css());
gulp.task('lint:scss', lintStyles.scss());
gulp.task('lint:style', lintStyles.style());

// PageSpeed
gulp.task('pagespeed:mobile', pagespeed({strategy: 'mobile'}));
gulp.task('pagespeed:desktop', pagespeed({strategy: 'desktop'}));
gulp.task('pagespeed', gulp.series('pagespeed:mobile', 'pagespeed:desktop'));

// Visual testing
gulp.task('visual:desktop', visual('desktop', config.visual.desktop.viewportSize, config.visual.desktop.files))
gulp.task('visual:mobile', visual('mobile', config.visual.mobile.viewportSize, config.visual.mobile.files))
gulp.task('visual', gulp.series('visual:desktop', 'visual:mobile'));
gulp.task('clean:visual', clean(config.visual.dest));

// Run karma for development, will watch and reload
gulp.task('tdd', test());

// Run tests and report for ci
gulp.task('test', test({
  singleRun: true,
  browsers: ['PhantomJS'],
  reporters: ['mocha']
}));

gulp.task('coverage', test({
  singleRun: true,
  browsers: ['PhantomJS'],
  reporters: ['coverage'],
}));

// Deploy
gulp.task('deploy:prompt', deploy.prompt);
gulp.task('deploy:version', deploy.version);
gulp.task('deploy:init', deploy.init);
gulp.task('deploy:settings', deploy.settings);
gulp.task('deploy:commit', deploy.commit);
gulp.task('deploy:pull', deploy.pull);

// Generates compiled CSS and JS files and puts them in the dist/ folder
gulp.task('deploy:dist', gulp.series('build'));
gulp.task('deploy:prepare', gulp.series('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist'));
gulp.task('deploy', gulp.series('deploy:prompt', 'deploy:version', 'deploy:settings', 'deploy:dist', 'deploy:commit'));

// Archive the distrubution files into package
gulp.task('archive', archive());

// Starts a BrowerSync instance
gulp.task('serve', browser.init());

// Reload browser
gulp.task('reload', browser.reload());

// Watch files for changes
gulp.task('watch', () => {
  gulp.watch(config.scripts.src, gulp.series('scripts', browser.reload));
  gulp.watch(config.styles.src,  gulp.series('styles', browser.reload));
  gulp.watch(config.images.src,  gulp.series('images', browser.reload));
  gulp.watch(config.fonts.src,   gulp.series('fonts', browser.reload));
  gulp.watch(config.svgs.src,    gulp.series('svgs', browser.reload));
});

// Register default task
gulp.task('default', gulp.series('serve'));
