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
- [rollup.js](http://rollupjs.org/) - Javascript module bundler
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
- [htmlhint](http://htmlhint.com)
- [w3cjs](https://github.com/thomasdavis/w3cjs)
- [a11y](https://addyosmani.com/a11y/)

## Instalation

You will need to install [NodeJS](http://nodejs.org/).

```sh
# Clone the repository.
$ git clone git@github.com:amazingSurge/frontend-starter-kit.git project
$ cd project

# Install Gulp, Bower and babel-cli, if you haven't already.
$ npm install -g gulp-cli babel-cli bower assemble

# Installs all the dependencies.
$ npm install

# gulp-scss-lint plugin requires Ruby and scss-lint
$ gem install scss_lint

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

#### Html
- `gulp html` Complie handlebar templates into html files.
- `gulp htmlhint` Lint html files using htmlhint.
- `gulp w3cjs` Lint html files using w3c.
- `gulp a11y` Lint html files using a11y.
- `gulp clean:html` Clean out distribution html files.

#### Javascript
- `gulp bundler` Bundle javasript modules.
- `gulp scripts` Concatenate and minify JavaScript.
- `gulp eslint` Lint ES6 files using eslint.
- `gulp jshint` Lint Javascript files using jshint.
- `gulp clean:scripts` Clean out distribution javascript files.

#### CSS
- `gulp styles` Compile and automatically prefix stylesheets.
- `gulp csslint` Lint css files using csslint.
- `gulp scsslint` Lint scss files using scsslint.
- `gulp stylelint` Lint css files using stylelint.
- `gulp clean:styles` Clean out distribution stylesheets files.

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
- `gulp clean:visual` Clean out visual regression testing screenshots and results files.

#### Coverage
- `gulp coverage` Generate coverage report.

##### Standalone file tasks
- `gulp html --page=index.hbs`
- `gulp scripts --file=index.js`
- `gulp styles --file=styles.scss`
- `gulp svgs --folder=example`

## Directories
- `src/html` - Source files for html.
- `src/js` - Source files for javascript.
- `src/scss` - Source files for css.
- `src/svgs` - Svg files for sprites.
- `src/images` - Source files for images.
- `src/icons` - Source files for icons.
- `src/fonts` - ttf fonts that will generated into fontface files.

Other directories:

- `build` - Intermediate files produced by the development server. 
- `dist` - The output of `gulp dist`, which contains your distribution-ready app.

Main application files:
- `src/js/index.js` - The application's entry point
- `src/scss/style.scss` - Global styles for your application

Main build files:

- `gulpfile.babel.js` - Build scripts written with [gulp](http://gulpjs.com/)