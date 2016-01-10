'use strict';

var config = require(__dirname + '/config/config');

var app = require(__dirname + '/config/express')(/* optional db connection */);

app.listen(config.port);
console.log('API started on port ' + config.port);
