// require gulp
var gulp = require('gulp');
// require other packages
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var terser = require('gulp-terser');

var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

function script() {
    return (
        gulp
            .src(
                [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/popper.js/dist/umd/popper.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.min.js',
                    './node_modules/@fortawesome/fontawesome-free/js/all.min.js',
                    './wp-content/themes/loviz/assets/js/loviz_scripts.js'
                ]
            )
            .pipe(concat('loviz.js'))
            .pipe(gulp.dest('./wp-content/themes/loviz/assets/'))
            .pipe(terser())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./wp-content/themes/loviz/assets/'))

    );
}
function style() {
    return (

        gulp
            .src(
                [
                    './node_modules/bootstrap/dist/css/bootstrap.min.css',
                    './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
                    './wp-content/themes/loviz/assets/scss/aplication.scss'])
            .pipe(concat('loviz.scss'))
            .pipe(gulp.dest('./wp-content/themes/loviz/assets/scss'))
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cssnano())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./wp-content/themes/loviz/assets/scss'))

    );
}

function watch() {
    gulp.watch('./wp-content/themes/loviz/assets/js/*.js', script)
    gulp.watch('./wp-content/themes/loviz/assets/scss/*.scss', style)
}

exports.watch = watch
exports.style = style
exports.script = script;