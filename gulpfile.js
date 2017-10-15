'use strict'

const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');



gulp.task('webserver', function() {
   connect.server({
    livereload: true
  });
});

gulp.task('scss', function() {
   return gulp.src('style/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('style'))
  .pipe(connect.reload());
});

//can't figure out how to compile another way
gulp.task('jsx', function() {
  return gulp.src("src/app.jsx")
  .pipe(babel())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('src'))
  .pipe(connect.reload());

});

gulp.task('reload', function() {
  return gulp.src("src/*.js")
        .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('style/*.scss', ['scss']);
  gulp.watch('src/*.jsx', ['jsx']);
  gulp.watch('src/skills.js', ['reload']);
  gulp.watch('src/projects.js', ['reload']);
});

gulp.task('compile', ['jsx','scss']);
gulp.task('default', ['jsx','scss','webserver','watch']);


