'use strict';

/**
 * Dependencies
 */
var _ = require('lodash'),
    config = require('../../config/config'),
    request = require('request'),
    errorService = require(__dirname + '/error.service');

/**
 * Locals
 */
var outlookApiURI = config.outlookApiURI;
var DEFAULT_REQUEST_HEADERS = {
    Prefer: 'outlook.timezone="Central Standard Time"'
};

/**
 * Helper to strip the response wrapper from the outlook service
 * @returns {Object}
 */
function stripResponseWrapper(data) {
    if (!data) {
        throw new Error('Data is required');
    }

    try {
        data = JSON.parse(data);
    } catch (err) {
        data = {};
    }

    return data.value;
}

/**
 * Helper to return request object
 * @param {Object} opts - Input options to extend with defaults
 * @returns {Object}
 */
function getRequestObject(opts) {
    if (!opts || !(opts instanceof Object)) {
        return {};
    }
    
    return _.extend(DEFAULT_REQUEST_HEADERS, opts);
}

/**
 * Get the oulook calendars for the given use
 * @param cb {Function} - callback function
 * @returns {Array[Object]}
 */
exports.getCalendarsAsync = function (cb) {
    var options = getRequestObject({
        uri: outlookApiURI + '/' + config.outlookUserName + '/calendars'
    });

    return request(options, function (err, res, data) {
        var errRes = err;
        if (res.statusCode !== 200) {
            errRes = 'No calendars found for ' + config.outlookUserName;
            data = {}; // send some data to the stripResponseWrapper func
        }

        return cb(errorService.createError(errRes), stripResponseWrapper(data));
    });
};

/**
 * Get a calendar by id
 * @param {String} id
 * @param {Function} cb - callback function
 * @returns {Object}
 */
exports.getCalendarAsync = function (id, cb) {
    if (!id) {
        throw new Error('Calendar ID required');
    }

    var options = getRequestObject({
        uri: outlookApiURI + '/' + config.outlookUserName + '/calendars' + '/' + id
    });

    return request(options, function (err, res, data) {
        var errRes = err;
        if (res.statusCode !== 200) {
            errRes = 'No calendar found with id: ' + id;
        }

        if (data) {
            try {
                data = JSON.parse(data);
            } catch (err) {
                data = {};
            }
        }

        return cb(errorService.createError(errRes), data);
    });
};
