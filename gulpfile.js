var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');


function setRandom() {
    var unix = Math.round(+new Date()/100000);
    var random = parseInt(Math.random() * 10000);
    return unix + random;
}
var random = setRandom();



gulp.task('cleanCss', function () {
    return del(['./dist/css/**/*.css', './src/css/**/*.css']);
});

gulp.task('cleanJs', function () {
    return del(['./dist/js/**/*.js']);
});

gulp.task('cleanHtml', function () {
    return del(['./dist/**/*.html']);
});


gulp.task('createCss', ['cleanCss'], function () {

    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: "-" + random + ".min"}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('createJs', ['cleanJs'], function () {

    return gulp.src('./src/js/**/*.js')
        .pipe(rename({suffix: "-" + random}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('createHtml', ['cleanHtml'], function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlreplace({
            'css': 'css/main-' + random + '.min.css'
        }))
        .pipe(gulp.dest('dist/'));

});



gulp.task('build', ['createCss', 'createJs', 'createHtml']);