var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('sass', function () {
  return gulp.src('./src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function () {
  return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('jsFiles', function () {
  return gulp.src('./src/js/**')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('fontFiles', function () {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});
 

gulp.task('start', ['browserSync','sass','images', 'jsFiles', 'fontFiles'], function() {
  //2. serve at custom port
  var server = gls.static('./', 3030);
  // var server = gls('./', true, 3030);
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['./src/*.scss', './index.html', './src/images/***'], ['sass', 'images'], function (file) {
    server.notify.apply(server, [file]);
  });
});
