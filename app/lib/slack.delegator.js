'use strict';

var errorService = require('../services/error.service'),
    outlookService = require('../services/outlook.service'),
    config = require('../../config/config'),
    SlackResponse = require(__dirname + '/slack.response.object'),
    _ = require('lodash');

/**
 * Helper to validate the request token
 * @private
 */
function isValid(token) {
    return token === config.slackVerificationToken;
}

/**
 * @constructor SlackDelegator
 * @type SlackDelegator
 * @typedef {SlackDelegator} object used to parse and delegate resource fetching
 * @param {Object} reqBody
 * @returns {SlackDelegator}
 */
function SlackDelegator(reqBody) {
    _.merge(this, reqBody);
}

SlackDelegator.prototype = {
    /**
     * Get the error object
     * @returns {Object}
     */
    getError: function () {
        if (!_.keys(this).length) {
            return errorService.createError('No Request Body');
        } else if (!isValid(this.token)) {
            return errorService.createError('Invalid Request Token');
        }
    },

    /**
     * Check to see is the delegator has an error
     * @returns {Boolean}
     */
    hasError: function () {
        return !!this.getError();
    },

    /**
     * Get the formatted slack response
     * @param {Object} data
     * @returns {Object}
     */
    getResponseObject: function (data) {
        return new SlackResponse(data);
    },

    /**
     * Get the status of the room
     * @returns {Object}
     */
    getRoomStatus: function () {
        // Do something to result in {is_available: Bool}
    },

    /**
     * Schedule the selected room
     * @returns {Object}
     */
    scheduleRoom: function () {
        // Return a success or failure object
    }
};

module.exports = SlackDelegator;
