const gulp = require('gulp');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');

gulp.task('compile-less', () => {
    return gulp
        .src('frontend/*.less')
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('less-watcher', () => {
    gulp.watch(['frontend/*.less'], ['compile-less']);
});

gulp.task('transpile-es6', () => {
    return gulp
        .src('frontend/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('build-all', ['compile-less', 'transpile-es6'], () => {
    console.log('build-all');
});

