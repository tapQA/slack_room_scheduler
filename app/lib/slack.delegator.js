'use strict';

const errorService = require('../services/error.service');
const config = require('../../config/config');
const SlackResponse = require(__dirname + '/slack.response.object');

class SlackDelegator {
	constructor(reqBody) {
		const _req = reqBody;

		this.getReq = function () {
			return _req;
		};
	}

	hasError() {
		return !!this.error;
	}

	isValid() {
		return this.getReq().token === config.slackVerificationToken;
	}

	get error() {
		if (!this.getReq()) {
			return errorService.createError('No Request Body');
		} else if (!this.isValid(this.getReq().token)) {
			return errorService.createError('Invalid Request Token');
		}
	}

	get roomStatus() {
		return { is_available: true };
	}

	get responseObject() {
		return new SlackResponse(this.getReq());
	}

	scheduleRoom() {
		return;
	}
}

module.exports = SlackDelegator;
