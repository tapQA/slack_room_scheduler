'use strict';

var config = require('../../../config/config'),
    outlookService = require('../../services/outlook.service'),
    nock = require('nock'),
    mockCalendarsCollection,
    mockCalenderObject;

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

        mockCalenderObject = {
            "@odata.context": "https://outlook.office.com/api/v2.0/$metadata#Me/Calendars/$entity",
            "@odata.id": "https://outlook.office.com/api/v2.0/Users('ddfcd489-628b-40d7-b48b-57002df800e5@1717622f-1d94-4d0c-9d74-709fad664b77')/Calendars('AAMkAGI2TGuLAAA=')",
            "Id": "AAMkAGI2TGuLAAA=",
            "Name": "Calendar",
            "Color": "Auto",
            "ChangeKey": "nfZyf7VcrEKLNoU37KWlkQAAA0x0+w=="
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

        it('should have a getCalendarAsync function', function () {
            outlookService.should.have.property('getCalendarAsync')
                .and.is.instanceOf(Function);
        });
    });

    describe('#getCalendarsAsync()', function () {
        it('should return a collection of calendar objects', function () {
            nock(config.outlookApiURI)
                .get('/' + config.outlookUserName + '/calendars')
                .reply(200, mockCalendarsCollection);

            return outlookService.getCalendarsAsync(function (err, calendars) {
                (!err).should.be.true();
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

        it('should return an error object if the response is a 404', function () {
            nock(config.outlookApiURI)
                .get('/' + config.outlookUserName + '/calendars')
                .reply(404, {});

            return outlookService.getCalendarsAsync(function (err, calendars) {
                (!calendars).should.be.true();
                err.should.have.property('errors');
                err.errors[0].message.should.equal('No calendars found for ' + config.outlookUserName);
            });
        });
    });

    describe('#getCalendarAsync()', function () {
        it('should throw an error if an id isn\'t provided', function () {
            outlookService.getCalendarAsync.should.throw('Calendar ID required');
            try {
                outlookService.getCalendarAsync();
            } catch (err) {
                err.message.should.equal('Calendar ID required');
            }
        });

        it('should return a calendar object', function () {
            nock(config.outlookApiURI)
                .get('/' + config.outlookUserName + '/calendars/AAMkAGI2TGuLAAA=')
                .reply(200, mockCalenderObject);

            return outlookService.getCalendarAsync('AAMkAGI2TGuLAAA=', function (err, calendar) {
                (!err).should.be.true();
                calendar.should.be.instanceOf(Object);
                calendar.should.have.property('@odata.context');
                calendar.should.have.property('Id');
                calendar.should.have.property('Name');
                calendar.should.have.property('Color');
                calendar.should.have.property('ChangeKey');
            });
        });

        it('should return an error object if the response is 404', function () {
            nock(config.outlookApiURI)
                .get('/' + config.outlookUserName + '/calendars/AAMkAGI2TGuLAAA=')
                .reply(404);

            return outlookService.getCalendarAsync('AAMkAGI2TGuLAAA=', function (err, calendar) {
                (!calendar).should.be.true();
                err.should.be.instanceOf(Object).and.have.property('errors');
                err.errors[0].message.should.equal('No calendar found with id: AAMkAGI2TGuLAAA=');
            });
        });
    });
});
