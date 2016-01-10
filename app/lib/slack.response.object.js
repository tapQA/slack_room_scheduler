'use strict';
var _ = require('lodash');

/**
 * @constructor Slack Response
 * @type SlackResponse
 * @typedef SlackResponse object used when responding to slack API
 * @param {Object} [data] - optional data to extend the default SlackResponse
 * @returns {SlackResponse}
 */
function SlackResponse(data) {
    _.extend(this, this.getResponseObject(data));
}

/**
 * SlackResponse prototype
 */
SlackResponse.prototype = {
    /**
     * Build the response object
     * @param {Object} data
     * @returns {Object}
     */
    getResponseObject: function (data) {
        data = data || {};
        return _.merge(_.cloneDeep(this.DEFAULT_PROPERTIES), data);
    },

    /**
     * Default response object properties
     */
    DEFAULT_PROPERTIES: {
        response_type: 'ephemeral', // only let commanding user to see response
    },

    /**
     * Extend the DEFAULT_PROPERTIES with new properties
     * @param {Object|*} data - The object to extend, or the key for a new enumerable
     * @param {*} [value] - optional value to pair with input key
     * @returns
     */
    setDefaultProperties: function (data, value) {
        if (data instanceof Object) {
            _.merge(this.DEFAULT_PROPERTIES, data);
        } else {
            var tmp = {};
            tmp[data] = value;
            _.merge(this.DEFAULT_PROPERTIES, tmp);
        }
    }
};

module.exports = SlackResponse;
