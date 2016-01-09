'use strict';

var config = require('../../../config/config'),
    outlookService = require('../../services/outlook.service'),
    nock = require('nock'),
    mockCalendarsCollection;

describe('Outlook Service', function () {
    beforeEach(function () {
        nock.disableNetConnect();

        mockCalendarsCollection = {
            "@odata.context": "https://outlook.office.com/api/v2.0/$metadata#Me/Calendars",
            "value": [
                {
                    "@odata.id": "https://outlook.office.com/api/v2.0/Users('ddfcd489-628b-40d7-b48b-57002df800e5@1717622f-1d94-4d0c-9d74-709fad664b77')/Calendars('AAMkAGI2TGuLAAA=')",
                    "Id": "AAMkAGI2TGuLAAA=",
                    "Name": "Calendar",
                    "Color": "Auto",
                    "ChangeKey": "nfZyf7VcrEKLNoU37KWlkQAAA0x0+w=="
                }
            ]
        };
    });

    afterEach(function () {
        nock.cleanAll();
    });

    describe('initialization', function () {
        it('should have a getCalendarsAsync function', function () {
            outlookService.should.have.property('getCalendarsAsync')
                .and.is.instanceOf(Function);
        });
    });

    describe('#getCalendarsAsync()', function () {
        beforeEach(function () {
            nock('https://outlook.office.com')
                .get('/api/v2.0/' + config.outlookUserName + '/calendars')
                .reply(200, mockCalendarsCollection);
        });

        it('should return a collection of calendar objects', function () {
            return outlookService.getCalendarsAsync(function (err, calendars) {
                (err === null).should.be.true();
                calendars.should.be.instanceOf(Array);
                for (var i = 0; i < calendars.length; i++) {
                    var calendar = calendars[i];
                    calendar.should.be.instanceOf(Object);
                    calendar.should.have.property('@odata.id');
                    calendar.should.have.property('Id');
                    calendar.should.have.property('Name');
                    calendar.should.have.property('Color');
                    calendar.should.have.property('ChangeKey');
                }
            });
        });
    });
});
