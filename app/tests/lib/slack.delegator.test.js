'use strict';

const SlackDelegator = require('../../lib/slack.delegator'),
    config = require('../../../config/config');

let delegator;

describe('Slack Delegator', () => {
    describe('init', () => {
        beforeEach( () => {
            delegator = new SlackDelegator();
        });

        it('should have a hasError function', () => {
            delegator.should.have.property('hasError')
                .and.is.instanceOf(Function);
        });

        it('should have a scheduleRoom function', () => {
            delegator.should.have.property('scheduleRoom')
                .and.is.instanceOf(Function);
        });

        it('should have an error getter', () => {
            delegator.should.have.property('error')
                .and.is.instanceOf(Object);
        });

        it('should have a roomStatus getter', () => {
            delegator.should.have.property('roomStatus')
                .and.is.instanceOf(Object);
        });
    });

    describe('#hasError()', () => {
        beforeEach( () => {
            delegator = new SlackDelegator();
        });

        it('should return a boolean', () => {
            delegator.hasError().should.be.instanceOf(Boolean);
        });

        it('should return false if there isn\'t an error', () => {
            delegator = new SlackDelegator({foo: 'bar'});
            delegator.hasError().should.be.false();
        });

        it('should return true if there isn\'t a res.body', () => {
            delegator.hasError().should.be.true();
        });

        it('should return true if the request token doesn\'t match the config token', () => {
            config.slackVerificationToken = 'abcd';
            delegator = new SlackDelegator({token: 'dcba'});
            delegator.hasError().should.be.true();
        });
    });

    describe('#getResponseObject', () => {

    });
});
