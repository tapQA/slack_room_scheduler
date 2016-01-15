'use strict';

var slackController = require('../../controllers/slack.controller');

describe('Slack controller',() => {
    it('should have a delegate function',() => {
        slackController.should.have.property('delegate')
            .and.is.instanceOf(Function);
    });
});
