## Features

#### Automation
- [Gulp](http://gulpjs.com/) - Task Runner.
- [Bower](http://bower.io/) - Package Manager.
- [Browsersync](http://www.browsersync.io/) - Watch project changes and updates browsers.

#### HTML
- [Assemble](https://github.com/assemble/assemble/)

#### CSS
- [SASS](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [CSScomb](http://csscomb.com/)
- [CSSnano](http://cssnano.co/)
- [stylelint](http://stylelint.io/)
- [CSSLint](http://csslint.net/)
- [SCSS-Lint](https://github.com/brigade/scss-lint/)

#### Javascript
- [BabelJS](https://babeljs.io/) - Javascript compiler.
- [ESLint](http://eslint.org/)
- [JSHint](http://jshint.com/)

#### Test
- [Karma](https://karma-runner.github.io/)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)
- [Sinon](http://sinonjs.org/)

#### Visual regression testing
- [PhantomCSS](https://github.com/Huddle/PhantomCSS)

#### Coverage
- [Istanbul](https://github.com/gotwarlost/istanbul)

#### HTML
- [Htmllint](http://htmllint.github.io)
- [w3cjs](https://github.com/thomasdavis/w3cjs)
- [a11y](https://addyosmani.com/a11y/)

## Instalation

You will need to install [NodeJS](http://nodejs.org/).

```sh
# Clone the repository.
$ git clone https://github.com/mjnr/Simple-Boilerplate.git project
$ cd project

# Install Gulp, Bower and babel-cli, if you haven't already.
$ npm install -g gulp-cli babel-cli bower assemble

# Installs all the dependencies.
$ npm install

# Installs all packages.
$ bower install

# Start a mini server to view the project and watch their changes on http://localhost:3000/
$ gulp
```

## Available Tasks
- `gulp` or `gulp watch` Start watch for changes and server with Browsersync.
- `gulp build` Run all development tasks
- `gulp serve` Start server with Browsersync.
- `gulp clean` Clean output directories.
- `gulp lint` Lint everything.
- `gulp pagespeed` Run PageSpeed Insights.

#### Javascript
- `gulp scripts` Concatenate and minify JavaScript.
- `gulp lint:es` Lint ES6 files using eslint.
- `gulp lint:js` Lint Javascript files using jshint.

#### Html
- `gulp lint:html` Lint html files using htmllint.
- `gulp lint:w3c` Lint html files using w3c.
- `gulp lint:a11y` Lint html files using a11y.

#### CSS
- `gulp styles` Compile and automatically prefix stylesheets.
- `gulp lint:css` Lint css files using csslint.
- `gulp lint:scss` Lint scss files using scsslint.
- `gulp lint:style` Lint css files using stylelint.

#### Assets
- `gulp images` Optimize all images.
- `gulp svg` Create svg sprites.
- `gulp fonts` Create fontface files.
- `gulp favicons` Create favicon images.
- `gulp icons` Create icons.

#### Tests
- `gulp tdd` Test for Test Driven Development purposes.
- `gulp test` Test for Continuous Integration purposes.

#### Visual regression testing
- `gulp visual` Run tests for visual regression.
- `gulp visual:restart` Restart visual regression testing.

#### coverage
- `gulp coverage` Generate coverage report.

## Directories

- `src/js` - Source files for javascript.
- `src/scss` - Source files for css.
- `src/svg` - Svg files for sprites.
- `src/fonts` - ttf fonts that will generated into fontface files.

Other directories:

- `build` - Intermediate files produced by the development server. 
- `dist` - The output of `gulp dist`, which contains your distribution-ready app.

Main application files:
- `src/js/index.js` - The application's entry point
- `src/scss/style.scss` - Global styles for your application

Main build files:

- `gulpfile.babel.js` - Build scripts written with [gulp](http://gulpjs.com/)