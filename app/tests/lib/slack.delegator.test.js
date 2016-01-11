'use strict';

var SlackDelegator = require('../../lib/slack.delegator'),
    config = require('../../../config/config'),
    delegator;

describe.only('Slack Delegator', function () {
    describe('prototype', function () {
        it('should have a hasError function', function () {
            SlackDelegator.prototype.should.have.property('hasError')
                .and.is.instanceOf(Function);
        });

        it('should have a getResponseObject function', function () {
            SlackDelegator.prototype.should.have.property('getResponseObject')
                .and.is.instanceOf(Function);
        });

        it('should have a getRoomStatus function', function () {
            SlackDelegator.prototype.should.have.property('getRoomStatus')
                .and.is.instanceOf(Function);
        });

        it('should have a scheduleRoom function', function () {
            SlackDelegator.prototype.should.have.property('scheduleRoom')
                .and.is.instanceOf(Function);
        })
    });

    describe('#hasError()', function () {
        beforeEach(function () {
            delegator = new SlackDelegator();
        });

        it('should return a boolean', function () {
            delegator.hasError().should.be.instanceOf(Boolean);
        });

        it('should return false if there isn\'t an error', function () {
            delegator = new SlackDelegator({foo: 'bar'});
            delegator.hasError().should.be.false();
        });

        it('should return true if there isn\'t a res.body', function () {
            delegator.hasError().should.be.true();
        });

        it('should return true if the request token doesn\'t match the config token', function () {
            config.slackVerificationToken = 'abcd';
            delegator = new SlackDelegator({token: 'dcba'});
            delegator.hasError().should.be.true();
        });
    });

    describe('#getResponseObject', function () {

    });
});
