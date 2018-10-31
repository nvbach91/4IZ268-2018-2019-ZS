
// Paths
const tempDir = '.tmp';
const templateDevDir = 'app';
const distDir = 'dist';

const cssDevDir = templateDevDir + '/styles';
const cssTempDir = tempDir + '/styles';
const cssDistDir = distDir + '/styles';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


var lessFunctions = require('less-plugin-functions');
var lessFN = new lessFunctions();

// this is for deploy watch
function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

// Sass
gulp.task('styles', function () {
  return gulp.src([cssDevDir + '/main.scss', cssDevDir + '/popup.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: [ '> 0%', 'last 3 version']}),
      // require('css-mqpacker')({sort: false}).postcss
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(cssTempDir))
    // .pipe($.csso({restructure: false}))
    .pipe($.base64({
      extensions: ['svg', 'png', /\.jpg#datauri$/i],
      maxImageSize: 16*1024, // bytes
      debug: true
    }))
    .pipe(gulp.dest(cssDistDir));
});
