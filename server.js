'use strict';

var express = require('express'),
    app = express(),
    config = require(__dirname + '/config/config');


app.listen(8000, function () {
    console.log('API listening on port 8000');
});
