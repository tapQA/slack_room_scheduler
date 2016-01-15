'use strict';

const SlackDelegator = require('../../lib/slack.delegator'),
    config = require('../../../config/config'),
    DEFAULT_PROPERTIES = require('../../../config/properties/slack.response.object.properties'),
    nock = require('nock');

let delegator, req;

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

    describe('#isInvalid()', () => {
        
    });

    describe('error getter', () => {

    });

    describe('#roomStatus()', () => {
        beforeEach(() => {
            // Because the dates I create in my test won't match the 
            // dates in the implementation I am matching routes via regex
            req = nock(config.outlookApiURI)
                .get(/[a-zA-Z0-9].*/);
        });

        it('should get the room status', (done) => {
            req.reply(200, {});
            return delegator.roomStatus((status) => {
                status.should.be.instanceOf(Object);
                status.is_available.should.be.instanceOf(Boolean);
                done();
            });
        });

        it('should return false if there is an error', (done) => {
            req.reply(404);
            return delegator.roomStatus((status) => {
                status.is_available.should.be.false();
                done();
            });
        });

        it('should return false if there are events', (done) => {
            req.reply(200, {'value': [{foo: 'bar'}]});
            return delegator.roomStatus((status) => {
                status.is_available.should.be.false();
                done();
            });
        });

        it('should return true if there are no events', (done) => {
            req.reply(200, {'value': []});
            return delegator.roomStatus((status) => {
                status.is_available.should.be.true();
                done();
            });
        });

        it('should get events as of provided dates', (done) => {
            req.reply(200, {'value': []});

            return delegator.roomStatus(new Date(), new Date(), (status) => {
                status.is_available.should.be.true();
                done();
            });
        });
    });

    describe('responseObject getter', () => {
        it('should return an object', () => {
            delegator.responseObject.should.be.instanceOf(Object);
        });

        it('should have the default properties on the response', () => {
            for (let prop in DEFAULT_PROPERTIES) {
                delegator.responseObject.should.have.property(prop)
                    .and.equal(DEFAULT_PROPERTIES[prop]);
            }
        });

        it('should have the properties from the reqBody', () => {
            delegator = new SlackDelegator({ test: 'property' });
            delegator.responseObject.should.have.property('test')
                .and.equal('property');
        });
    });

    describe('#scheduleRoom()', () => {
        it('should do something', () => {
            (!!delegator.scheduleRoom()).should.be.false();
        });
    });
});
