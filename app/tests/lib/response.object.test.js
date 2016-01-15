'use strict';

const ResponseObject = require('../../lib/response.object');

let ro;
const inputData = { foo: 'bar', deep: { test: 'object' }};

describe('ResponseObject class', () => {
	beforeEach(() => {
		ro = new ResponseObject(inputData);
	});

	it('should set the input data onto the class', () => {
		ro.foo.should.equal('bar');
	});

	it('should have a DEFAULT_PROPERTIES getter that throws', () => {
		try {
			let t = ResponseObject.DEFAULT_PROPERTIES;
			(true).should.be.false();
		} catch (err) {
			err.name.should.equal('Error');
			err.message.should.equal('DEFAULT_PROPERTIES need to be defined by children');
		}
	});

	it('should have a DEFAULT_PROPERTIES setter that throws', () => {
		try {
			ResponseObject.DEFAULT_PROPERTIES = { foo: 'bar' };
			(true).should.be.false();
		} catch (err) {
			err.name.should.equal('Error');
			err.message.should.equal('DEFAULT_PROPERTIES need to be defined by children');
		}
	});
});