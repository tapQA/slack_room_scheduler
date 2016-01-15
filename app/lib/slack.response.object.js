'use strict';

const ResponseObject = require(__dirname + '/response.object');
const _ = require('lodash');
let DEFAULT_PROPERTIES = require('../../config/properties/slack.response.object.properties');

class SlackResponse extends ResponseObject {
	constructor(data) {
		super();
		_.merge(this, DEFAULT_PROPERTIES, data);
	}

	static get DEFAULT_PROPERTIES() {
		return DEFAULT_PROPERTIES;
	}

	static set DEFAULT_PROPERTIES(obj) {
		_.merge(DEFAULT_PROPERTIES, obj);
	}

	toString() {
		return JSON.stringify(this);
	}
}

module.exports = SlackResponse;
