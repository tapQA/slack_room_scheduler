'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        execMap: {
        	'js': 'node --harmony'
        },
        env: { 'NODE_ENV': 'development' }
    });
});
