'use strict';

var express = require('express'),
    router = express.Router(),
    roomsController = require('../app/controllers/rooms.controller');

router.get('/rooms', roomsController.list);
router.get('/rooms/:id', roomsController.read);
router.get('/rooms/:id/status', roomsController.getStatus);

module.exports = router;
