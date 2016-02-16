var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var cache = require('gulp-cached');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    source: 'src/**/*.jsx',
    //html: '**/*.html',
    //templates: 'src/**/*.html',
    output: 'dist/',
    outputCss: 'dist/**/*.css',
    sass: 'src/**/*.scss',
    locales: 'src/assets/locales/*.json'
};

var bundleCodeEntries = [
    './src/app/core/index.jsx',
    './src/js/bootstrap.min.js'
];

//Compile task -> sass + jsx build
gulp.task('compile', function(callback) {
    return runSequence(
        ['sass', 'build', 'move-js', 'move-assets', 'move-fonts'],
        callback
    );
});

gulp.task('build', function () {
    return browserify({entries: bundleCodeEntries, extensions: ['.jsx', '.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', [], function () {
    var inputs = [
        paths.source,
        paths.locales,
        //paths.templates,
        paths.sass
    ];
    //[paths.source, paths.templates, paths.sass]
    gulp.watch(inputs, ['compile', browserSync.reload]);
});

gulp.task('browsersync',['compile'], function () {
    browserSync({
      server: {
        baseDir: './'
      },
      notify: false,
      browser: ["google chrome"]
  });
});

//Move assets to distribution dir
gulp.task('move-assets', function() {
    return gulp.src([
        './src/**/*.json',
        './src/**/*.svg',
        './src/**/*.woff',
        './src/**/*.ttf',
        './src/**/*.png',
        './src/**/*.gif',
        './src/**/*.ico',
        './src/**/*.jpg',
        './src/**/*.eot',
        './src/**/*.css',
        './src/**/*.js',
        './src/**/*.json'
    ])
    .pipe(cache('move'))
    .pipe(gulp.dest(paths.output));
});

gulp.task('move-fonts', function () {
    return gulp.src(['./src/fonts']).pipe(cache('move-fonts')).pipe(gulp.dest(paths.output));
});

gulp.task('move-js', function () {
    return gulp.src(['./src/js']).pipe(cache('move-js')).pipe(gulp.dest(paths.output));
});

//Sass
gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            dirname: "css",
            extname: '.min.css'
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('default',['browsersync','watch'], function() {});