'use strict';

var SlackDelegator = require('../lib/slack.delegator');

exports.delegate = function (req, res) {
    res.json(new SlackDelegator(req.body));
};
