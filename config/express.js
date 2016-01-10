'use strict';

/**
 * Dependencies
 */
var express = require('express'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    errorService = require('../app/services/error.service'),
    path = require('path');

module.exports = function (db) {
    var app = express();

    app.set('showStackError', true);

    app.use(express.static('../../public'));

    // Setup logging middleware
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('common'));
    }

    // Use helmet to help secure the API
    app.use(helmet());

    // Routes
    app.use('/api', require(__dirname + '/routes'));

    // Respond with a 400 if a request to the API can't be found
    // Else respond with 404
    // All routes have to start with '/api'
    app.use(function(req, res, next) {
        if (/\/api\//.test(req.url)) {
            res.status(400).json(errorService.createError('Bad Request'));
        } else {
            res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
        }
    });

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).sendFile(path.join(__dirname, '../public', '500.html'));
    });

    return app;
};
