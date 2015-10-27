var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

// If you want to put the built files into
// the same directory as SRC, just change
// these paths. Keep !(*.min.js) so that
// gulp doesn't build minified scripts again
var SRC_PATHS = {
    CSS: './public/src/stylesheets/*.scss',
    JS: './public/src/javascripts/!(*.min.js)'
};

var DIST_PATHS = {
    CSS: './public/dist/stylesheets',
    JS: './public/dist/javascripts'
};

gulp.task('css', function() {
    gulp.src(SRC_PATHS.CSS)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'ios 7', 'android 4'],
        cascade: true
    }))
    .pipe(minifyCSS({keepBreaks: false}))
    // .pipe(rename(function (path) {
    //     path.basename += ".min";
    // }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(DIST_PATHS.CSS));
});

gulp.task('js', function() {
    var getFileName = function(pathString) {
        var directoryArr = pathString.split('/');
        return directoryArr[directoryArr.length - 1];
    }

    var jsFiles = glob.sync(SRC_PATHS.JS);
    for(var i = 0; i < jsFiles.length; i++) {
        var fileName = getFileName(jsFiles[i]);
        var extIndex = fileName.lastIndexOf('.');
        var minFileName = fileName.substring(0, extIndex) + '.min'
                        + fileName.substring(extIndex, fileName.length);
        browserify(jsFiles[i])
        .transform(reactify) // for JSX
        .bundle()
        .pipe(source(minFileName))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(DIST_PATHS.JS));
    }
});
 
gulp.task('watch', function() {
    gulp.watch(SRC_PATHS.CSS, ['css']);
    gulp.watch(SRC_PATHS.JS, ['js']);
});

gulp.task('default', ['watch', 'css', 'js']);