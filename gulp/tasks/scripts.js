'use strict';

import config       from '../config';
import gulp         from 'gulp';
import babel        from 'gulp-babel';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import handleErrors from '../util/handleErrors';
import browser      from 'browser-sync';
import header       from 'gulp-header';
import rename       from 'gulp-rename';
import uglify       from 'gulp-uglify';
import size         from 'gulp-size';
import plumber      from 'gulp-plumber';
import beautify     from '../util/beautify';
//import filter       from 'gulp-filter';

gulp.task('scripts', () => {
  const createSourcemap = config.deploy || config.scripts.prodSourcemap;

  return gulp.src(config.scripts.src)
    //.pipe(filter(['**/*', '!**/_*.js']))
    .on('error', handleErrors)
    .pipe(plumber())
    .pipe(babel())
    .pipe(header(config.banner))
    .pipe(beautify({
      "lineBreak": {
        "before": {
          "ClassClosingBrace": "1",
          "FunctionDeclarationClosingBrace": "1",
          "FunctionExpressionClosingBrace": "1",
          "CallExpression": ">=1",
          "ReturnStatement" : "2",
          "FunctionExpression": "2",
          "FunctionDeclaration": "2",
          "ClassDeclaration": "2",
          "IfStatement": "2",
          "ForStatement": "2",
          "ForOfStatement": "2",
          "ForInStatement": "2",
        },
        "after": {
          "ClassClosingBrace": ">=1",
          "FunctionExpressionOpeningBrace" : "<2",
          "FunctionExpressionClosingBrace": ">=1",
          "FunctionDeclarationOpeningBrace": "<2",
          "FunctionDeclarationClosingBrace": "2",
        }
      }
    }))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({
      title: 'scripts',
      showFiles: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(uglify())
    .pipe(header(config.banner))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write(config.deploy ? './' : null))
    )
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({
      title: 'minified scripts',
      showFiles: true
    }))
    .pipe(browser.stream());
});
