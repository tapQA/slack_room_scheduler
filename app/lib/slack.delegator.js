'use strict';

const errorService = require('../services/error.service'),
	config = require('../../config/config'),
	SlackResponse = require(__dirname + '/slack.response.object'),
	OutlookService = require('../services/outlook.service');

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

	/**
	 * Aysynchronously get the status of a conference room
	 * @param  {String}   [start] Start date as a string
	 * @param  {String}   [end]   End data as a string
	 * @param  {Function} cb    Call back function
	 * @return {Object}
	 */
	roomStatus(start, end, cb) {
		// If no date range is provided
		// then make a request using the current time
		if (start instanceof Function) {
			cb = start;
			start = end = new Date();
		}

		return OutlookService.getEventsAsync(start, end, (err, events) => {
			const availability = { is_available: (!err && (events && !events.length)) ? true : false };
			return cb(availability);
		});
	}

	get responseObject() {
		return new SlackResponse(this.getReq());
	}

	scheduleRoom() {
		return;
	}
}

module.exports = SlackDelegator;
