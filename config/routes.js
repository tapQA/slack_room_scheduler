'use strict';

var express = require('express'),
    router = express.Router(),
    roomsController = require('../app/controllers/rooms.controller'),
    slackController = require('../app/controllers/slack.controller');

/** Slack will POST to one end point */
router.post('/scheduler', slackController.delegate);

router.get('/rooms', roomsController.list);
router.get('/rooms/:id', roomsController.read);
router.get('/rooms/:id/status', roomsController.getStatus);

module.exports = router;
