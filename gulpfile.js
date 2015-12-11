'use strict';

var gulp = require('gulp'),
    glob = require('glob'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

var CSS = {
    SOURCE: './css/common.scss',
    DESTINATION: './css',
    BUILD_FILE_NAME: 'all.min.css',
    WATCH: './css/**/*.scss'
};

var JS = {
    SOURCE: './js/!(*.min.js)',
    DESTINATION: './js/bundle',
    WATCH: './js/**/!(*.min.js|*.dev.js)'
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
    
    // return the baseName extension included from a path
    var getBaseName = function(path) {
        var directoryArr = path.split('/');
        return directoryArr[directoryArr.length - 1];
    };

    // bundle all files that aren't minified
    var jsFiles = glob.sync(JS.SOURCE, {nodir: true});
    for(var i = 0; i < jsFiles.length; i++) {
        var baseName = getBaseName(jsFiles[i]),
            extIndex = baseName.lastIndexOf('.'),
            fileName = baseName.substring(0, extIndex),
            extension = baseName.substring(extIndex, baseName.length),
            minBaseName = fileName + '.min' + extension,
            devBaseName = fileName + '.dev' + extension;
        
        // bundle for production and development
        var bundle = browserify(jsFiles[i])
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle();

        // write development bundle (non-minfied)
        bundle.pipe(source(devBaseName))
        .pipe(gulp.dest(JS.DESTINATION));

        // write production bundle (minified)
        bundle.pipe(source(minBaseName))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(JS.DESTINATION));
    }
});
 
gulp.task('watch', function() {
    gulp.watch(CSS.WATCH, ['css']);
    gulp.watch(JS.WATCH, ['js']);
});

gulp.task('default', ['watch', 'css', 'js']);