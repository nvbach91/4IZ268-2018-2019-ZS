
// Paths
const tempDir = '.tmp';
const templateDevDir = 'app';
const distDir = 'dist';

const jsDevDir = templateDevDir + '/scripts';
const jsTempDir = tempDir + '/scripts';
const jsDistDir = distDir + '/scripts';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('babelify');
var exit = require('gulp-exit');


// https://gist.github.com/danharper/3ca2273125f500429945
function compileScripts(watch) {
  var bundler = watchify(browserify(jsDevDir + '/src/app.js', { debug: true }).transform(babel, { presets: ['es2015'] }));

  function rebundle() {
    return bundler
      .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDevDir))
        .pipe(gulp.dest(jsDistDir));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle().pipe($.connect.reload());
    });

    rebundle()
  }
}

function watchScripts() {
  return compileScripts(true);
};

var vendorPath = 'node_modules/';
gulp.task('vendor', function(){
    return gulp.src([
      vendorPath + 'jquery/dist/jquery.js',
      vendorPath + 'jquery-lazy/jquery.lazy.js',
      vendorPath + 'waypoints/lib/jquery.waypoints.js',
    ])
  .pipe($.concat('vendor.js'))
  .pipe(gulp.dest(jsDevDir + '/'))
  // .pipe($.uglify())
  .pipe(gulp.dest(jsDistDir))
});

gulp.task('buildScripts', ['vendor'], function() {
    return gulp.src([jsDevDir + '/main.js'])
    // .pipe($.uglify())
    .pipe(gulp.dest(jsDistDir));
});


gulp.task('scripts', ['vendor'], function() { return compileScripts(); });
gulp.task('watchify', ['vendor'], function() { return watchScripts(); })