'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    istanbul = require('gulp-istanbul'),
    tests = ['app/tests/**/*.js'],
    javascripts = ['app/**/*.js', '!app/tests/**/*.js'];

gulp.task('test', function () {
    process.env.NODE_ENV = 'development';
    return gulp.src(tests, { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should'),
                sinon: require('sinon')
            }
        }))
        .on('error', gutil.log);
});

gulp.task('test:watch', function () {
    gulp.watch(['app/**', 'server.js'], ['test']);
});

gulp.task('pre-test', function () {
    return gulp.src(javascripts)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test:coverage', ['pre-test'], function () {
    process.env.NODE_ENV = 'development';
    return gulp.src(tests)
        .pipe(mocha({
            globals: {
                should: require('should')
            }
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }));
});