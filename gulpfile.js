var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var bower       = require('gulp-bower');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

var config = {
    bowerDir: './bower_components',
    sassDir: './app/styles'
};

//install all bower needed bower modules
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./app",
            browser: 'chrome'
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});