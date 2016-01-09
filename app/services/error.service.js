'use strict';

var _ = require('lodash');

/**
 * Create an error response object
 * @param {Array|String} errors - An array of errors or one error string
 * @returns {Array[Object]}
 */
exports.createError = function (errors) {
    if (!errors) {
        return;
    }

    var errObject = { errors: [ ] };

    if (errors instanceof Array) {
        _.forEach(errors, function (err) {
            errObject.errors.push({ message: err });
        });
    } else {
        errObject.errors.push({ message: errors });
    }

    return errObject;
};
