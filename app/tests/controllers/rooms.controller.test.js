'use strict';

const roomsController = require('../../controllers/rooms.controller'),
    sinon = require('sinon')

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

    describe('#list()',() => {
        it('should call res.json', () => {
            const req = sinon.stub();
            const res = sinon.stub({ json: function () {} });
            res.json.returns({});
            roomsController.list(req, res);
            (res.json.called).should.be.true();
        });
    });

    describe('#read()', () => {
        it('should do something...', () => {
            roomsController.read();
        });
    });

    describe('#getStatus', () => {
        it('should do something...', () => {
            roomsController.getStatus();
        });
    });
});
