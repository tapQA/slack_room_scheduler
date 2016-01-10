'use strict';

var _ = require('lodash'),
    SlackResponse = require('../../lib/slack.response.object'),
    testObject;

describe('SlackResponse Object', function () {
    beforeEach(function () {
        testObject = new SlackResponse();
    });

    it('should be an object', function () {
        testObject.should.be.instanceOf(Object);
    });

    it('should have default properties if no additional properties are provided', function () {
        testObject.should.have.property('response_type').and.equal('ephemeral');
    });

    it('should extend the default properties if additional properties are provided', function () {
        testObject = new SlackResponse({ yo: 'dawg' });
        testObject.should.have.property('yo').and.equal('dawg');
    });

    describe('SlackResponse.protoype', function () {
        it('should expose a getResponseObject function', function () {
            SlackResponse.prototype.should.have.property('getResponseObject')
                .and.is.instanceOf(Function);
        });

        it('should expose a DEFAULT_PROPERTIES object', function () {
            SlackResponse.prototype.should.have.property('DEFAULT_PROPERTIES')
                .and.is.instanceOf(Object);
        });

        it('should expose a setDefaultProperties function', function () {
            SlackResponse.prototype.should.have.property('setDefaultProperties')
                .and.is.instanceOf(Function);
        });

        describe('#getResponseObject()', function () {
            it('should return an object', function () {
                testObject.getResponseObject().should.be.instanceOf(Object);
            });

            it('should return default values if a data object isn\'t provided', function () {
                (_.isEqual(testObject.getResponseObject(), testObject.DEFAULT_PROPERTIES))
                    .should.be.true();
            });

            it('should extend the optional data object onto the response', function () {
                testObject.getResponseObject({ foo: 'bar' })
                    .should.have.property('foo')
                    .and.equal('bar');
            });

            it('should not alter the DEFAULT_PROPERTIES objects', function () {
                testObject.getResponseObject({ foo: 'bar' });
                testObject.DEFAULT_PROPERTIES.should.not.have.property('foo');
            });
        });

        describe('#setDefaultProperties()', function () {
            it('should extend the provided object onto the DEFAULT_PROPERTIES', function () {
                testObject.setDefaultProperties({ foo: 'bar' });
                testObject.DEFAULT_PROPERTIES.should.have.property('foo')
                    .and.equal('bar');
            });

            it('should extend the key/value pair onto the DEFAULT_PROPERTIES', function () {
                testObject.setDefaultProperties('test', 'value');
                testObject.DEFAULT_PROPERTIES.should.have.property('test')
                    .and.equal('value');
            });
        });
    });
});
