'use strict';

const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const connect = require('gulp-connect');

// CLEAN

gulp.task('clean', () => {
  return del(['dist', 'serve']);
});

// BUILD

gulp.task('build:styles', () => {
  return gulp.src('src/asset/**/*.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:'),
    }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dist/asset'));
});

gulp.task('build:scripts', () => {
  return gulp.src('src/asset/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist/asset'));
});

gulp.task('build:html', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:images', () => {
  return gulp.src(['src/asset/img/**/*']).pipe(gulp.dest('dist/asset/img'));
});

gulp.task('build:node', () => {
  return gulp.src([
    'node_modules/bootstrap.native/dist/bootstrap-native.js',
    'node_modules/chart.js/dist/Chart.js',
  ])
    .pipe(uglify())
    .pipe(gulp.dest('dist/asset/'));
});

gulp.task('build', gulp.series('clean', 'build:styles', 'build:scripts', 'build:html', 'build:images', 'build:node'));

// SERVE

gulp.task('serve:styles', () => {
  return gulp.src('src/asset/style.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:'),
    }))
    .pipe(gulp.dest('serve/asset/'));
});

gulp.task('serve:copy', () => {
  return gulp.src(['src/**/*', '!src/**/*.scss']).pipe(gulp.dest('serve'));
});

gulp.task('serve:node', () => {
  return gulp.src([
    'node_modules/bootstrap.native/dist/bootstrap-native.js',
    'node_modules/chart.js/dist/Chart.js',
  ]).pipe(gulp.dest('serve/asset/'));
});

gulp.task('serve:reload', () => {
  return gulp.src('serve').pipe(connect.reload());
});

gulp.task('serve:watch', async () => {
  return gulp.watch('src/**/*', gulp.series('clean', 'serve:copy', 'serve:node', 'serve:styles', 'serve:reload'));
});

gulp.task('serve:connect', async () => {
  connect.server({
    port: 4000,
    root: 'serve',
    livereload: true,
  });
});

gulp.task('serve', gulp.series(
  'clean', 'serve:copy', 'serve:node', 'serve:styles', 'serve:reload', 'serve:connect', 'serve:watch'),
);

// DEFAULT

gulp.task('default', async () => {
  console.log('Check README.md to see development commands.');
});
