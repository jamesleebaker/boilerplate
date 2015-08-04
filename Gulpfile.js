var gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  exorcist   = require('exorcist'),
  source = require('vinyl-source-stream'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  gulpif = require('gulp-if'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer'),
  handlebars = require('gulp-handlebars'),
  runSequence = require('run-sequence'),
  wrap = require('gulp-wrap'),
  livereload = require('gulp-livereload'),
  run = require('gulp-run'),
  karma = require('karma'),
  environment = process.env.NODE_ENV;

// Clean the build
gulp.task('clean:build', function() {
  return gulp.src('build/**/*', { read: false })
    .pipe(clean({
      force: true
    }));
});

// Clean the compiled templates
gulp.task('clean:templates', function() {
  return gulp.src('app/*(templates)', { read: false })
    .pipe(clean({
      force: true
    }));
});

// Client linting
gulp.task('lint:client', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Image optimization and move to static folder
gulp.task('compile:images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(gulp.dest('./build/images'));
});

// Tests linting
gulp.task('lint:tests', function() {
  return gulp.src('./tests/**/*.spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Compile the templates and wrap them for Browserify
gulp.task('compile:templates', function() {
  return gulp.src('./assets/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('import Handlebars from "handlebars"; module.exports = Handlebars.template(<%= contents %>);'))
    .pipe(gulp.dest('./app/templates'));
});

// SASS Stylesheet Compiling
gulp.task('compile:styles', function () {
  return gulp.src('./assets/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(environment === 'production', minifyCSS()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

// JS Compiling (Browserify)
gulp.task('compile:scripts', ['lint:client'], function() {
  return browserify({
    entries: './app/app.js',
    debug: environment !== 'production'
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: environment !== 'development' }))
  .pipe(gulpif(environment === 'production', uglify()))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./build'));
});

// Karma Testing
gulp.task('run:tests', ['lint:tests'], function(done) {
  karma.server.start({
    configFile:  __dirname + '/tests/config.js'
  }, done);
});

// Start the Node app
gulp.task('run:app', function(done) {
  var cmd = new run.Command('npm start', { verbosity: 3 });
  cmd.exec();
});

// Watch and Live Reload
gulp.task('watch', function () {
  gulp.watch('./assets/styles/**/*.scss', ['compile:styles']);
  gulp.watch('./assets/templates/**/*.*', ['compile:templates']);
  gulp.watch('./app/**/*.js', ['compile:scripts']);
  gulp.watch('./tests/**/*.js', ['run:tests']);

  livereload.listen();
  gulp.watch('build/**').on('change', livereload.changed);
});

// Compile task
gulp.task('compile', function(callback) {
  runSequence('clean:build', 'compile:templates', ['compile:images', 'compile:styles', 'compile:scripts'], 'clean:templates', callback);
});

gulp.task('start', function(callback) {
  runSequence('compile', 'run:app', 'watch');
});

gulp.task('deploy', function(callback) {
  // future task for deploying
});

gulp.task('test', ['run:tests']);


