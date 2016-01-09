'use strict';

/**
 * Dependencies
 */
var config = require('../../config/config'),
    request = require('request');

/**
 * Locals
 */
var outlookApiURI = config.outlookApiURI;

/**
 * Helper to strip the response wrapper from the outlook service
 */
function stripResponseWrapper(data) {
    if (!data) {
        throw new Error('Data is required');
    }

    data = JSON.parse(data);
    return data.value;
}

/**
 * Get the oulook calendars for the given use
 * @param cb {Function} - callback function
 * @returns {Array[Object]}
 */
exports.getCalendarsAsync = function (cb) {
    var uri = outlookApiURI + '/' + config.outlookUserName + '/calendars';

    return request(uri, function (err, res, data) {
        return cb(err, stripResponseWrapper(data));
    });
};
