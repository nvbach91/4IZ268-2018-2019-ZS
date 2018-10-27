/*global -$ */
'use strict';

const settingsFile = require('./gulp/settings');

// Settings
const settings = {
  static: false,
};

// Paths
const tempDir = '.tmp';
const templateDevDir = 'app';
const distDir = 'dist';

const swigDevDir = templateDevDir + '/views';
const cssDevDir = templateDevDir + '/styles';
const cssTempDir = tempDir + '/styles';
const cssDistDir = distDir + '/styles';
const jsDevDir = templateDevDir + '/scripts';
const jsTempDir = tempDir + '/scripts';
const jsDistDir = distDir + '/scripts';
const imgDevDir = templateDevDir + '/images';
const imgDistDir = distDir + '/images';
const fontsDevDir = templateDevDir + '/fonts';
const fontsDistDir = distDir + '/fonts';
const dataDevDir = templateDevDir + '/datas';
const dataDistDir = distDir + '/datas';

// generated on 2015-12-13 using generator-leswigul 0.3.3
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var inlineimg = require('gulp-inline-image-html');
var open = require('open');

// includes
const server = require('./gulp/server');
const styles = require('./gulp/styles');
const scripts = require('./gulp/scripts');
const swig = require('./gulp/swig');

gulp.task('html', ['templates', 'styles', 'scripts', 'buildScripts'], function () {
  var assets = $.useref.assets({searchPath: [tempDir, templateDevDir, '.']});
  return gulp.src(tempDir + '/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso({restructure: false})))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest(distDir));
});

gulp.task('images', function () {
  return gulp.src(imgDevDir + '/**/*')
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true,
    //   // don't remove IDs from SVGs, they are often used
    //   // as hooks for embedding and styling
    //   svgoPlugins: [{cleanupIDs: false}],
    //   use: [pngquant({quality: '65-80', speed: 4})]
    // })))
    .pipe(gulp.dest(imgDistDir));
});

gulp.task('fonts', function () {
  // others
  gulp.src([
    fontsDevDir + '/**/*',
  ], {
    dot: true
  }).pipe(gulp.dest(fontsDistDir));
});

gulp.task('datas', function () {
  // others
  gulp.src([
    dataDevDir + '/**/*',
  ], {
    dot: true
  }).pipe(gulp.dest(dataDistDir));
});

gulp.task('extras', function () {
  // others
  gulp.src([
    templateDevDir + '/*',
    '!' + templateDevDir + '/*.swig'
  ], {
    dot: true
  }).pipe(gulp.dest(distDir));
});

gulp.task('clean', require('del').bind(null, [tempDir, distDir]));

gulp.task('watch', ['connect', 'serve', 'watchify'],  function(){
  // watch for changes
  gulp.watch([
    templateDevDir + '/**/*.html',
    tempDir + '/**/*.html',
    cssDevDir + '/**/*.css',
    cssTempDir + '/**/*.css',
    imgDevDir + '/**/*',
    fontsDevDir + '/**/*',
  ], function (event) {
    return gulp.src(event.path)
      .pipe($.connect.reload());
  });

  gulp.watch([templateDevDir + '/**/*.swig', templateDevDir + '/**/*.json'], ['templates']);
  gulp.watch(cssDevDir + '/**/*.scss', ['styles']); // Sass

  open("http://localhost:9000");

});


gulp.task('build', ['html', 'images', 'fonts', 'datas', 'extras']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
