'use strict';

const _ = require('lodash');

/**
 * @class ResponseObject
 * @description Creates a response object be extending input data onto response
 * @returns {ResponseObject}
 */
class ResponseObject {
	constructor(data) {
		_.merge(this, data);
	}

	/**
	 * Get class defaults
	 * @static
	 * @throws {Error} Must be defined by inheriting classes
	 */
	static get DEFAULT_PROPERTIES() {
		throw new Error('DEFAULT_PROPERTIES need to be defined by children');
	}

	/**
	 * Set class defaults
	 * @static
	 * @param {Object} obj
	 * @throws {Error} Must be defined by inherting classes
	 */
	static set DEFAULT_PROPERTIES(obj) {
		throw new Error('DEFAULT_PROPERTIES need to be defined by children');
	}
}

module.exports = ResponseObject;
