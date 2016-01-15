'use strict';

/**
 * Dependencies
 */
const _ = require('lodash'),
    config = require('../../config/config'),
    request = require('request'),
    errorService = require(__dirname + '/error.service');

/**
 * Locals
 */
const outlookApiURI = config.outlookApiURI;
const DEFAULT_REQUEST_OPTIONS = require('../../config/properties/outlook.request.properties');

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
 * @param {Object} opts - Input options to extend with DEFAULT_REQUEST_OPTIONSts
 * @returns {Object}
 */
function getRequestObject(opts) {
    if (!opts || !(opts instanceof Object)) {
        return DEFAULT_REQUEST_OPTIONS;
    }

    return _.merge(DEFAULT_REQUEST_OPTIONS, opts);
}

/******************************************************************************
 * Calendars
 *****************************************************************************/

/**
 * Get the oulook calendars for the given user
 * @param cb {Function} - callback function
 * @returns {Array[Object]}
 */
exports.getCalendarsAsync = function (cb) {
    var options = getRequestObject({
        uri: outlookApiURI + '/me/calendars'
    });

    return request(options, function (err, res, data) {
        var errRes = err;
        if (!res || res.statusCode !== 200) {
            errRes = 'No calendars found';
            data = {}; // send some data to the stripResponseWrapper func
        }

        return cb(errorService.createError(errRes), stripResponseWrapper(data));
    });
};

/**
 * Get a calendar by id
 * @param {Function} cb - callback function
 * @returns {Object}
 */
exports.getCalendarAsync = function (id, cb) {
    if (!id) {
        throw new Error('Calendar ID required');
    }

    var options = getRequestObject({
        uri: outlookApiURI + '/me/calendars' + '/' + id
    });

    return request(options, function (err, res, data) {
        var errRes = err;
        if (!res || res.statusCode !== 200) {
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

/******************************************************************************
 * Events
 *****************************************************************************/

/**
 * Get calendar events within a datetime range
 * @param {String} startDateTime
 * @param {String} endDateTime
 * @param {Function} cb - callback function
 * @returns {Array[Object]}
 */
exports.getEventsAsync = function (startDateTime, endDateTime, cb) {
    var options = getRequestObject({
        uri: outlookApiURI + '/me/calendarview',
        qs: {
            startdatetime: new Date(startDateTime).toISOString(),
            enddatetime: new Date(endDateTime).toISOString()
        }
    });

    return request(options, function (err, res, data) {
        var errRes = err;
        if (!res || res.statusCode !== 200) {
            errRes = 'No events found';
            data = {}; // send some data to the stripResponseWrapper func
        }

        return cb(errorService.createError(errRes), stripResponseWrapper(data));
    });
};
