'use strict';

const SlackDelegator = require('../lib/slack.delegator');

exports.delegate = function (req, res) {
	let delegator = new SlackDelegator(req.body);
	res.json(delegator.responseObject);
};
