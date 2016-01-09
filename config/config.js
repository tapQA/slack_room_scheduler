'use strict';

var _ = require('lodash');

module.exports = _.extend(
    require(__dirname + '/env/all'),
    require(__dirname + '/env/' + process.env.NODE_ENV)
);
