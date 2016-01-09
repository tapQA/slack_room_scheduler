'use strict';

var errorService = require('../../services/error.service'),
    results;

/**
 * Helper to generate random string
 * @returns {String}
 */
function getRandomStr() {
    return Math.random().toString(36).substring(7);
}

describe('Error Service', function () {
    describe('initialization', function () {
        it('should have a createError function', function () {
            errorService.should.have.property('createError')
                .and.is.instanceOf(Function);
        });
    });

    describe('#createError()', function () {
        beforeEach(function () {
            results = errorService.createError('This is an error');
        });

        it('should return a collection of errors', function () {
            results.should.be.instanceOf(Object).and.have.property('errors');
            for (var i = 0; i < results.errors.length; i++) {
                var error = results.errors[i];
                error.should.be.instanceOf(Object).and.have.property('message');
            }
        });

        it('should return one error object if a string param was given', function () {
            results.errors.length.should.equal(1);
        });

        it('should return as many error objects as there were strings within array param given', function () {
            var errCnt = Math.floor(Math.random() * 100);
            var arrayParam = [];

            for (var i = 0; i < errCnt; i++) {
                arrayParam.push(getRandomStr());
            }

            results = errorService.createError(arrayParam);
            results.errors.length.should.equal(errCnt);
        });

        it('should return undefined if no errors params are provided', function () {
            (!errorService.createError()).should.be.true();
        });
    });
});
