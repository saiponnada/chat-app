'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
sass.compiler = require('node-sass');


//style paths
var stylesSass = './src/assets/styles/scss/*.scss';
var componentSass = './src/components/**/*.scss';
var sassSrc = [stylesSass, componentSass];

gulp.task('sass', function () {
  return gulp.src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./src/assets/styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sassSrc, gulp.series('sass'));
});