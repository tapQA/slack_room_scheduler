'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');

gulp.task('test', function () {
    return gulp.src(['app/tests/**/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }))
        .on('error', gutil.log);
});

gulp.task('test:watch', function () {
    gulp.watch(['app/**', 'server.js'], ['test']);
});
