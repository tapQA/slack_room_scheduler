'use strict';

var roomsController = require('../../controllers/rooms.controller');

describe('Rooms Controller', function () {
    describe('initialization', function () {
        it('should have a list function', function () {
            roomsController.should.have.property('list')
                .and.is.instanceOf(Function);
        });

        it('should have a read function', function () {
            roomsController.should.have.property('read')
                .and.is.instanceOf(Function);
        });

        it('should have a getStatus function', function () {
            roomsController.should.have.property('getStatus')
                .and.is.instanceOf(Function);
        });
    });
});
