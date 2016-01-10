'use strict';

/**
 * Dependencies
 */
var express = require('express'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    errorService = require('../app/services/error.service');

module.exports = function (db) {
    var app = express();

    app.set('showStackError', true);

    // Setup logging middleware
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('common'));
    }

    // Use helmet to help secure the API
    app.use(helmet());

    // Respond with a 400 if a request isn't to the api
    // All routes have to start with '/api'
	app.use(function(req, res, next) {
        if (!(/\/api\//.test(req.url))) {
            res.status(400).json(errorService.createError('Bad Request'));
        }
        next();
	});

    return app;
};
