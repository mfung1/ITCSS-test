/* eslint func-names: ['error', "as-needed"]*/
/* eslint arrow-body-style: ["error", "never"] */
/* eslint-env node */
/*
-- Gulpfile.js --

The purpose of this file is for running the task runner gulp.

 Config
 ======
 In this area you can set the paths of your Sass and JS files,
 this must be a relative path.

 You can choose to only use a specific file or to concatenate all files,
 this may depend on how your build is setup.

 For instance a setup like:

 + Project
 +-- build
 +---- sass
 +------ index.scss (contains @imports)

 You will only need to consider index.scss in your path as this will
 include the other files when the sass is compiled.

 Otherwise for a setup like:

 + Project
 +-- build
 +---- sass
 +------ file1.scss
 +------ file2.scss

 You'd want to use someting like ./build/sass/*.scss

 Commands
 ========

 gulp watch: This will listen for any changes you make to .scss or
             .js files in the path set in the config.
 gulp sass: This will:
            - initialise sourcemapping,
            - return your .scss files from the config,
            - compile the .scss into .css,
            - autoPrefix the css using settings in the config,
            - minify the css onto 1 line,
            - write sourcemapping file (dev file)
            - outputs css into ./dist/css/styles.min.css
gulp scripts: This will:
              - concatenate all .js files in the path in the config.
              - minify the js
              - output in ./dist/js/scripts.min.js


 What each package does
 ======================

 Gulp:              Goes without saying?
 Gulp-Sass:         Sass comipler usable with Gulp
 Gulp-Sourcemaps:   Tracks the initial preprocessor files, so you can tell where the styling
                    originated from (rather than looking through a minified file).
 Gulp-concat:       Concatenates files from a given array of files
 Gulp-uglify:       Minifies compiled CSS.
 Gulp-autoprefixer: Scans the CSS and prefixes properties that require it
                    (i.e -ms-, -webkit-, -moz- etc.). Config is in the config object below.
 Gulp-babel:        Transpiles ES6 JavaScript into ES5 for browser compatibility.

*/

// Inital Setup

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglifyjs = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const autoPrefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const BrowserSync = require('browser-sync').create();
const babel = require('gulp-babel');

// Config
const config = {
  preprocessorType: 'scss',
  paths: {
    sass: './build/scss/index.scss',
    js: './build/js/**/*.js',
  },
  browser_sync: {
    server_location: './',
    tunnelName: 'ui-frontend',
  },
  autoPrefixer: {
    versions: 'last 4 versions',
  },
};

// Default task

gulp.task('default', () => {
  BrowserSync.init({
    server: `${config.browser_sync.server_location}`,
    logPrefix: 'Direct SCSS Library',
    // tunnel: `${config.browser_sync.tunnelName}`,
  });
  gulp.watch('./build/scss/**/*.scss', ['sass']);
  gulp.watch('./build/JS/**/*.js', ['scripts']);
  gulp.watch('./**/**/*.html').on('change', BrowserSync.reload);
});

// Sass
gulp.task('sass', () => {
  gulp.src(config.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(postcss([autoPrefixer()]))
    .pipe(cleancss())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(BrowserSync.stream());
});

// JavaScript
gulp.task('scripts', () => {
  gulp.src(config.paths.js)
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('./dist/js'))
    .pipe(BrowserSync.stream());
});
