var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var clean       = require('gulp-clean');
var browserify  = require('browserify');
var source  = require('vinyl-source-stream');
var bower       = require('gulp-bower');
var concat      = require('gulp-concat');
ß
var config = {
    bowerDir: './bower_components',
    sassDir: './app/styles'
};
//
////install all bower needed bower modules
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('js', function () {
    return browserify('./app/scripts/app.js', {debug: true})
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('tmp/js'));
});


gulp.task('sass', function () {
    gulp.src('./app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('tmp/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean', function () {
    return gulp.src('app/tmp/', {read: false})
        .pipe(clean());
});

gulp.task('html', function () {
    //gulp.src('app/scripts/*.js')
    gulp.src('app/*.html')
        .pipe(gulp.dest('tmp'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', function () {
    gulp.watch('./app/styles/*.scss', ['sass'], browserSync.reload);
    gulp.watch('./app/*.html', ['html'], browserSync.reload);
    gulp.watch('./app/scripts/*.js', ['js'], browserSync.reload);
})
// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['clean', 'html', 'sass', 'js', 'watch'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "tmp",
            browser: 'chrome'
        }
    });
});