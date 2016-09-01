var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var pug = require('gulp-pug');
var path = require('path');
var pugInheritance = require('gulp-pug-inheritance');
var webserver = require('gulp-webserver');
var paths = {
    sass: './src/sass/**/*.scss',
    pug: './src/pug/**/*.pug',
    js: './src/js/**/*.js',
    fonts: './src/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}',
    images: './src/imgs/**/*.{svg,png,jpg,jpeg,gif}'
}

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css-unprefixed'));
});

gulp.task('autoprefixer', ['sass'], function () {
    return gulp.src('./src/css-unprefixed/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ]
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./SITE/css'));
});

gulp.task('compileCss', ['sass', 'autoprefixer']);

gulp.task('minjs', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./SITE/js'));
});

gulp.task('pug', function (done) {
    gulp.src(paths.pug)
        .pipe(pug())
        .pipe(gulp.dest('./SITE/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.pug, ['pug']);
    gulp.watch('./src/css-unprefixed/**/*.css', ['autoprefixer'])
    gulp.watch(paths.js, ['minjs']);
});

gulp.task('copyfonts', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./SITE/fonts'))
})

gulp.task('copyimgs', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./SITE/imgs'))
})

gulp.task('build', ['watch', 'pug', 'compileCss', 'minjs', 'copyfonts', 'copyimgs']);

gulp.task('webserver', ['build'], function () {
    gulp.src('SITE')
        .pipe(webserver({
            livereload: true,
            fallback: "index.html",
            port: 3000,
            open: true
        }));
});

gulp.task('default', ['webserver']);