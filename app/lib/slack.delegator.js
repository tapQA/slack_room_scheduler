'use strict';

var errorService = require('../services/error.service'),
    outlookService = require('../services/outlook.service'),
    config = require('../../config/config'),
    _ = require('lodash');

/**
 * Helper to validate the request token
 * @private
 */
function isValid(token) {
    return token === config.slackVerificationToken;
}

/**
 * Helper to get error text
 * @private
 */
function getError(reqBody) {
    if (!reqBody) {
        return errorService.createError('No Request Body');
    } else if (!isValid(reqBody.token)) {
        return errorService.createError('Invalid Request Token');
    }
}

/**
 * @constructor SlackDelegator
 * @type SlackDelegator
 * @typedef {SlackDelegator} object used to parse and delegate resource fetching
 * @param {Object} reqBody
 * @returns {SlackDelegator}
 */
function SlackDelegator(reqBody) {
    _.extend(this, getError(reqBody));
    
    if (!this.hasError()) {
        _.extend(this, reqBody);
    }
}

SlackDelegator.prototype = {
    hasError: function () {
        return !!this.errors;
    },
    getResponseObject: function () {

    }
};

module.exports = SlackDelegator;
