
// Paths
const tempDir = '.tmp';
const templateDevDir = 'app';

var gulp = require('gulp');
var open = require('gulp-open');
var $ = require('gulp-load-plugins')();

gulp.task('connect', function(){
  $.connect.server({
    root: [templateDevDir, tempDir],
    port: 9000,
    livereload: true
  });
});

gulp.task('serve', ['templates', 'styles', 'scripts', 'connect'], function(){
  open("http://localhost:9000");
});