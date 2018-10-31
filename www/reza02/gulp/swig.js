
// Paths
const tempDir = '.tmp';
const templateDevDir = 'app';
const distDir = 'dist';

const swigDevDir = templateDevDir + '/views';
const dataDevDir = templateDevDir + '/datas';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// template consts
const projectName = "Srdce Evropy";
const year = new Date().getFullYear();
const timestamp = new Date().getTime();

gulp.task('minify', function() {
  return gulp.src(tempDir + '/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(distDir));
});

gulp.task('templates', function() {
  var options = {
    load_json : true,
    json_path: dataDevDir,
    data: {
      projectName: projectName,
      year: year,
      timestamp: timestamp,
      path: '/'
    },
    defaults: {
      'cache': false
    }
  };

  return gulp.src([
    swigDevDir + '/**/*.swig'
    ])
    .pipe($.plumber())
    .pipe($.swig(options))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(tempDir))
    .pipe($.livereload());
});