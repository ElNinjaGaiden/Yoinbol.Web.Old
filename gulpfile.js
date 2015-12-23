var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

gulp.task('build', function () {
    return browserify({entries: './src/app/index.jsx', extensions: ['.jsx', '.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', [], function () {
    gulp.watch('./src/**/*.jsx', ['build', browserSync.reload]);
});

gulp.task('browsersync',['build'], function () {
    browserSync({
      server: {
        baseDir: './'
      },
      notify: false,
      browser: ["google chrome"]
  });
});

gulp.task('default',['browsersync','watch'], function() {});