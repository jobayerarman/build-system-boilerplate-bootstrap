/**
 * Gulpfile for front-end developing with Bootstrap.
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Less to CSS conversion, error catching, Autoprefixing,
 *         CSS minification.
 *      3. JS: Concatenates & uglifies Custom JS files.
 *      4. Images: Compresses PNG, JPEG, GIF and SVG images.
 *      5. Watches files for changes in CSS or JS.
 *      6. Watches files for changes in HTML.
 *      7. Corrects the line endings.
 *      8. InjectCSS instead of browser page reload.
 *
 * @author Jobayer Arman (@JobayerArman)
 * @version 1.0.1
 */

/**
 * Configuration.
 *
 * Project Configuration for gulp tasks.
 *
 * In paths you can add <<glob or array of globs>>. Edit the variables as per your project requirements.
 */

// Style related.
var styleSRC                = './src/less/main.less'; // Path to main .scss file.
var styleDestination        = './dist/css/'; // Path to place the compiled CSS file.

// JS Custom related.
var scriptsSRC              = './src/js/*.js'; // Path to JS custom scripts folder.
var scriptsDestination      = './dist/js/'; // Path to place the compiled JS custom scripts file.
var scriptsFile             = 'script'; // Compiled JS custom file name.

// Images related.
var imagesSRC               = './src/img/**/*.{png,jpg,gif,svg}'; // Source folder of images which should be optimized.
var imagesDestination       = './dist/img/'; // Destination folder of optimized images. Must be different from the imagesSRC folder.

// Watch files paths.
var styleWatchFiles         = './src/less/**/*.less'; // Path to all *.scss files inside css folder and inside them.
var scriptsWatchFiles       = './src/js/*.js'; // Path to all custom JS files.
var projectHTMLWatchFiles   = './src/site/**/*.html'; // Path to all HTML files.

// Browsers you care about for autoprefixing.
// Browserlist https        ://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];

/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp            = require('gulp'); // Gulp of-course
var gutil           = require('gulp-util'); //Utility functions for gulp plugins

// CSS related plugins.
var less            = require('gulp-less'); // Gulp pluign for Sass compilation.
var cssmin          = require('gulp-cssmin'); // Minifies CSS files.
var autoprefixer    = require('gulp-autoprefixer'); // Autoprefixing magic.

// JS related plugins.
var jshint          = require('gulp-jshint'); // JSHint plugin for gulp
var concat          = require('gulp-concat'); // Concatenates JS files
var uglify          = require('gulp-uglify'); // Minifies JS files

// Image realted plugins.
var imagemin        = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
var plumber         = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins
var rename          = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var notify          = require('gulp-notify'); // Sends message notification to you
var browserSync     = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload          = browserSync.reload; // For manual browser reload.

/**
 * Log Errors
 */
function errorLog (err) {
  notify.onError({title: "LESS Error", message: "Check your terminal"})(err); //Error Notification
  console.log(err.toString()); //Prints Error to Console
  this.emit('end');
}


/**
 * Task: `styles`.
 *
 * Compiles Less, Autoprefixes it and Minifies CSS.
 *
 */
 gulp.task('styles', function () {
  gulp.src( styleSRC )
  .pipe(plumber({errorHandler: errorLog}))

  .pipe(less())

  .pipe(autoprefixer( AUTOPREFIXER_BROWSERS ))
  .pipe(gulp.dest(styleDestination))
  .pipe( browserSync.stream() ) // Reloads style.css if that is enqueued.

  .pipe(rename({suffix: '.min'}))
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest(styleDestination))
  .pipe( browserSync.stream() ) // Reloads style.css if that is enqueued.

});


/**
  * Task: `scripts`.
  *
  * Concatenate and uglify custom scripts.
  *
  */
gulp.task( 'scripts', function() {
  gulp.src( scriptsSRC )
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))

  .pipe( concat( scriptsFile + '.js' ) )
  .pipe( gulp.dest( scriptsDestination ) )

  .pipe( rename( {
    basename: scriptsFile,
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( gulp.dest( scriptsDestination ) )
});


/**
  * Task: `images`.
  *
  * Compresses PNG, JPEG, GIF and SVG images.
  *
  * This task does the following:
  *     1. Gets the images from src folder
  *     2. Compresses PNG, JPEG, GIF and SVG images
  *     3. Generates and saves the optimized images in dist folder
  *
  */
gulp.task( 'images', function() {
  gulp.src( imagesSRC )

  .pipe( imagemin( {
    progressive: true,
    optimizationLevel: 3, // 0-7 low-high
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}]
  } ) )

  .pipe(gulp.dest( imagesDestination ))
});


/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * This task does the following:
 *    1. Sets the project URL
 *    2. Sets inject CSS
 *    3. You may define a custom port
 *    4. You may want to stop the browser from openning automatically
 */
gulp.task( 'browser-sync', function() {
  browserSync.init( {

    // For more options
    // @link http://www.browsersync.io/docs/options/

    server: {
      baseDir: "./dist/"
    },

    // Project URL.
    // proxy: projectURL,

    // `true` Automatically open the browser with BrowserSync live server.
    // `false` Stop the browser from automatically opening.
    open: false,

    // Inject CSS changes.
    // Commnet it to reload browser for every CSS change.
    injectChanges: true,

    // Use a specific port (instead of the one auto-detected by Browsersync).
    // port: 7000,

    // The small pop-over notifications in the browser are not always needed/wanted
    notify: false,

  } );
});


/**
  * Watch Tasks.
  *
  * Watches for file changes and runs specific tasks.
  */
gulp.task( 'default', ['styles', 'scripts', 'browser-sync'], function () {
  gulp.watch( projectHTMLWatchFiles, reload ); // Reload on PHP file changes.
  gulp.watch( styleWatchFiles, [ 'styles' ] ); // Reload on SCSS file changes.
  gulp.watch( scriptsWatchFiles, [ 'scripts', reload ] ); // Reload on customJS file changes.
});
