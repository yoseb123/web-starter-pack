'use strict';

var gulp = require('gulp'),
    glob = require('glob'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

var CSS = {
    SOURCE: './css/*.scss',
    DESTINATION: './css',
    BUILD_FILE_NAME: 'all.min.css' 
};

var JS = {
    SOURCE: './js/!(*.min.js)',
    DESTINATION: './js',
    BUILD_FILE_NAME: 'main.min.js'
};

gulp.task('css', function() {
    gulp.src(CSS.SOURCE)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'ios 7', 'android 4'],
        cascade: true
    }))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(concat(CSS.BUILD_FILE_NAME))
    .pipe(gulp.dest(CSS.DESTINATION));
});

gulp.task('js', function() {
    
    // return the filename extension included from a path
    var getFileName = function(path) {
        var directoryArr = path.split('/');
        return directoryArr[directoryArr.length - 1];
    };

    // bundle all files that aren't minified
    var jsFiles = glob.sync(JS.SOURCE);
    for(var i = 0; i < jsFiles.length; i++) {
        var fileName = getFileName(jsFiles[i]);
        var extIndex = fileName.lastIndexOf('.');
        var minFileName = fileName.substring(0, extIndex) + '.min'
                        + fileName.substring(extIndex, fileName.length);
        browserify(jsFiles[i])
        // .transform(reactify) // for JSX
        .bundle()
        .pipe(source(minFileName))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(JS.DESTINATION));
    }
});
 
gulp.task('watch', function() {
    gulp.watch(CSS.SOURCE, ['css']);
    gulp.watch(JS.SOURCE, ['js']);
});

gulp.task('default', ['watch', 'css', 'js']);