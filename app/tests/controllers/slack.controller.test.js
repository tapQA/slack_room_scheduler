'use strict';

const slackController = require('../../controllers/slack.controller'),
    sinon = require('sinon');

describe('Slack controller',() => {
    it('should have a delegate function',() => {
        slackController.should.have.property('delegate')
            .and.is.instanceOf(Function);
    });

    it('should call the res.json method', () => {
        const req = sinon.stub({
            body: {}
        });

        const res = sinon.stub({
            json: function (data) {}
        });

        res.json.returns({yo: 'dawg'});
        slackController.delegate(req, res);
        (res.json.called).should.be.true();
    });
});
