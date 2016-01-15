'use strict';

const SlackResponse = require('../../lib/slack.response.object');
let ro;

describe('SlackResponse class', () => {
	beforeEach(() => {

		ro = new SlackResponse();
	});

	it('should implement DEFAULT_PROPERTIES getter', () => {
		try {
			SlackResponse.DEFAULT_PROPERTIES.should.be.any.instanceOf(Object);
		} catch (err) {
			(!!err).should.be.false();
		}
	});

	it('should implement DEFAULT_PROPERTIES setter', () => {
		try {
			SlackResponse.DEFAULT_PROPERTIES = { foo: 'bar' };
		} catch (err) {
			(!!err).should.be.false();
		}

		SlackResponse.DEFAULT_PROPERTIES = {};
	});

	it('should have a toString method', () => {
		ro = new SlackResponse();
		ro.should.have.property('toString')
			.and.is.instanceOf(Function);

		ro.toString().should.equal('{"response_type":"ephemeral","foo":"bar"}');
	});

	it('should extend the DEFAULT_PROPERTIES onto the response object', () => {
		SlackResponse.DEFAULT_PROPERTIES = { foo: 'bar' };
		ro = new SlackResponse({ callback: function () {} });

		ro.should.have.property('foo').and.equal('bar');
		ro.should.have.property('callback').and.is.instanceOf(Function);
	});

	describe('DEFAULT_PROPERTIES setter', () => {
		it('should extend the already existing defaults', () => {
			SlackResponse.DEFAULT_PROPERTIES = { foo: 'bar', callback: function () {} };
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('foo');
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('callback');

			SlackResponse.DEFAULT_PROPERTIES = { bat: 'baz' };
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('foo');
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('callback');
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('bat');
		});

		it('should override properties', () => {
			SlackResponse.DEFAULT_PROPERTIES = { foo: 'bar' };
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('foo').and.equal('bar');
			SlackResponse.DEFAULT_PROPERTIES = { foo: 'baz' };
			SlackResponse.DEFAULT_PROPERTIES.should.have.property('foo').and.equal('baz');
		});
	});
});
