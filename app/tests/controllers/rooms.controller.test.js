'use strict';

var roomsController = require('../../controllers/rooms.controller');

describe('Rooms Controller',() => {
    describe('initialization',() => {
        it('should have a list function',() => {
            roomsController.should.have.property('list')
                .and.is.instanceOf(Function);
        });

        it('should have a read function',() => {
            roomsController.should.have.property('read')
                .and.is.instanceOf(Function);
        });

        it('should have a getStatus function',() => {
            roomsController.should.have.property('getStatus')
                .and.is.instanceOf(Function);
        });
    });
});
