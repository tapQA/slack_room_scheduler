'use strict';

var config = require('../../../config/config'),
    outlookService = require('../../services/outlook.service'),
    nock = require('nock'),
    req,
    mockCalendarsCollection,
    mockCalenderObject,
    mockEventsCollection;

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

        mockEventsCollection = {
            "value": [
                {
                    "Id": "AAMkADhkODk5YTFlLWJkZTQtNDk0Ni04ODE3LTAwNWU2ZjExZDM2ZAFRAAgI0x0_z7-AAEYAAAAAP7JYzajAk0eWE611ztPpPgcAHAWn9G2iuk69aiYxCs_qWQAAAAABDgAAHAWn9G2iuk69aiYxCs_qWQAAiRr3VAAAEA==",
                    "CreatedDateTime": "2014-10-14T00:33:38.3431426Z",
                    "LastModifiedDateTime": "2014-10-14T18:02:35.7703242Z",
                    "ChangeKey": "HAWn9G2iuk69aiYxCs+qWQAAiRsDcQ==",
                    "Categories": [],
                    "OriginalStartTimeZone": "Pacific Standard Time",
                    "OriginalEndTimeZone": "Pacific Standard Time",
                    "ResponseStatus": {
                        "Response": "Accepted",
                        "Time": "2014-10-14T18:02:35.7547235Z"
                    },
                    "iCalUId": "040000008200E00074C5B7101A82E00807E0010F5FFF87F609E6CC010000000000000000100000000F5E856BC2152F43AD52D501FF866EB1",
                    "ReminderMinutesBeforeStart": 15,
                    "IsReminderOn": true,
                    "HasAttachments": false,
                    "Subject": "Friday Unwinder",
                    "Body": {
                        "ContentType": "HTML",
                        "Content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n<meta name=\"Generator\" content=\"Microsoft Exchange Server\">\r\n<!-- converted from rtf -->\r\n<style><!-- .EmailQuote { margin-left: 1pt; padding-left: 4pt; border-left: #800000 2px solid; } --></style>\r\n</head>\r\n<body>\r\n<font face=\"Times New Roman\" size=\"3\"><span style=\"font-size:12pt;\"><a name=\"BM_BEGIN\"></a>\r\n<div style=\"margin-bottom:6pt;\"><font face=\"Calibri\" size=\"2\"><span style=\"font-size:11pt;\">When: Occurs every Friday from 4:00 PM to 5:00 PM effective 2/10/2012. (UTC-08:00) Pacific Time (US & Canada)<br>\r\n\r\nWhere: Cafeteria<br>\r\n\r\n<br>\r\n\r\n+~+~+~+~+~+~+~+~+~+<br>\r\n\r\n<br>\r\n\r\n</span></font></div>\r\n<div style=\"margin-bottom:6pt;\"><font face=\"Calibri\" size=\"2\"><span style=\"font-size:11pt;\"> </span></font></div>\r\n</span></font>\r\n</body>\r\n</html>\r\n"
                    },
                    "BodyPreview": "When: Occurs every Friday from 4:00 PM to 5:00 PM effective 2/10/2012. (UTC-08:00) Pacific Time (US & Canada)\r\nWhere: Cafeteria\r\n\r\n+~+~+~+~+~+~+~+~+~+",
                    "Importance": "Normal",
                    "Sensitivity": "Normal",
                    "Start": {
                        "DateTime": "2016-01-16T00:00:00.0000000",
                        "TimeZone": "UTC"
                    },
                    "End": {
                        "DateTime": "2016-01-16T01:00:00.0000000",
                        "TimeZone": "UTC"
                    },
                    "Location": {
                        "DisplayName": "Cafeteria"
                    },
                    "IsAllDay": false,
                    "IsCancelled": false,
                    "IsOrganizer": false,
                    "Recurrence": null,
                    "ResponseRequested": true,
                    "SeriesMasterId": "AAMkADhkODk5YTFlLWJkZTQtNDk0Ni04ODE3LTAwNWU2ZjExZDM2ZABGAAAAAAA-sljNqMCTR5YTrXXO0_k_BwAcBaf0baK6Tr1qJjEKz6pZAAAAAAEOAAAcBaf0baK6Tr1qJjEKz6pZAACJGvdUAAA=",
                    "ShowAs": "Busy",
                    "Type": "Occurrence",
                    "Attendees": [
                        {
                            "Type": "Required",
                            "EmailAddress": {
                                "Name": "Katie Jordan",
                                "Address": "KatieJ@oauthplay.onmicrosoft.com"
                            }
                        },
                        {
                            "Type": "Required",
                            "EmailAddress": {
                                "Name": "Garth Fort",
                                "Address": "GarthF@oauthplay.onmicrosoft.com"
                            }
                        }
                    ],
                    "Organizer": {
                        "EmailAddress": {
                            "Name": "Katie Jordan",
                            "Address": "KatieJ@oauthplay.onmicrosoft.com"
                        }
                    },
                    "WebLink": "https://outlook.office365.com/owa/?ItemID=AAMkADhkODk5YTFlLWJkZTQtNDk0Ni04ODE3LTAwNWU2ZjExZDM2ZAFRAAgI0x0%2Bz7%2FAAEYAAAAAP7JYzajAk0eWE611ztPpPgcAHAWn9G2iuk69aiYxCs%2BqWQAAAAABDgAAHAWn9G2iuk69aiYxCs%2BqWQAAiRr3VAAAEA%3D%3D&exvsurl=1&viewmodel=ICalendarItemDetailsViewModelFactory"
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

        it('should have a getCalendarAsync function', function () {
            outlookService.should.have.property('getCalendarAsync')
                .and.is.instanceOf(Function);
        });

        it('should have a getEventsAsync function', function () {
            outlookService.should.have.property('getEventsAsync')
                .and.is.instanceOf(Function);
        });
    });

    describe('#getCalendarsAsync()', function () {
        beforeEach(function () {
            req = nock(config.outlookApiURI)
                .get('/me/calendars');
        });

        it('should return a collection of calendar objects', function () {
            req.reply(200, mockCalendarsCollection);

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
            req.reply(404);

            return outlookService.getCalendarsAsync(function (err, calendars) {
                (!calendars).should.be.true();
                err.should.have.property('errors');
                err.errors[0].message.should.equal('No calendars found');
            });
        });
    });

    describe('#getCalendarAsync()', function () {
        const reqId = 'AAMkAGI2TGuLAAA=';
        beforeEach(function () {
            req = nock(config.outlookApiURI)
                .get('/me/calendars/' + reqId);
        });

        it('should throw an error if an id isn\'t provided', function () {
            outlookService.getCalendarAsync.should.throw('Calendar ID required');
            try {
                outlookService.getCalendarAsync();
                (true).should.be.false();
            } catch (err) {
                err.message.should.equal('Calendar ID required');
            }
        });

        it('should return a calendar object', function () {
            req.reply(200, mockCalenderObject);

            return outlookService.getCalendarAsync(reqId, function (err, calendar) {
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
            req.reply(404);

            return outlookService.getCalendarAsync(reqId, function (err, calendar) {
                (!calendar).should.be.true();
                err.should.be.instanceOf(Object).and.have.property('errors');
                err.errors[0].message.should.equal('No calendar found with id: ' + reqId);
            });
        });

        it('should return an empty object if the response is invalid JSON', () => {
            req.reply(200, '<div> some invalid json </div>');

            return outlookService.getCalendarAsync(reqId, (err, calendar) => {
                (!err).should.be.true();
                calendar.should.be.instanceOf(Object);
                (JSON.stringify(calendar)).should.equal('{}');
            });
        });
    });

    describe('#getEventsAsync()', function () {
        beforeEach(function () {
            req = nock(config.outlookApiURI)
                .get('/me/calendarview')
                .query({
                    startdatetime: new Date('2016-01-09').toISOString(),
                    enddatetime: new Date('2016-01-10').toISOString()
                });
        });

        it('should return an events collection', function () {
            req.reply(200, mockEventsCollection);

            return outlookService.getEventsAsync('2016-01-09', '2016-01-10', function (err, events) {
                (!err).should.be.true();
                events.should.be.instanceOf(Array);
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    event.should.be.instanceOf(Object);
                    event.should.have.property('Id');
                    event.should.have.property('CreatedDateTime');
                    event.should.have.property('LastModifiedDateTime');
                    event.should.have.property('ChangeKey');
                    event.should.have.property('Categories');
                    event.should.have.property('OriginalStartTimeZone');
                    event.should.have.property('OriginalEndTimeZone');
                    event.should.have.property('ResponseStatus');
                    event.ResponseStatus.should.have.property('Response');
                    event.ResponseStatus.should.have.property('Time');
                    event.should.have.property('iCalUId');
                    event.should.have.property('ReminderMinutesBeforeStart');
                    event.should.have.property('IsReminderOn');
                    event.should.have.property('Subject');
                    event.should.have.property('Body');
                    event.Body.should.have.property('ContentType');
                    event.Body.should.have.property('Content');
                    event.should.have.property('BodyPreview');
                    event.should.have.property('Importance');
                    event.should.have.property('Sensitivity');
                    event.should.have.property('Start');
                    event.Start.should.have.property('DateTime');
                    event.Start.should.have.property('TimeZone');
                    event.should.have.property('End');
                    event.End.should.have.property('DateTime');
                    event.End.should.have.property('TimeZone');
                    event.should.have.property('Location');
                    event.Location.should.have.property('DisplayName');
                    event.should.have.property('IsAllDay');
                    event.should.have.property('IsCancelled');
                    event.should.have.property('IsOrganizer');
                    event.should.have.property('Recurrence');
                    event.should.have.property('ResponseRequested');
                    event.should.have.property('SeriesMasterId');
                    event.should.have.property('ShowAs');
                    event.should.have.property('Type');
                    event.should.have.property('Attendees');
                    event.Attendees[0].should.have.property('Type');
                    event.Attendees[0].should.have.property('EmailAddress');
                    event.Attendees[0].EmailAddress.should.have.property('Name');
                    event.Attendees[0].EmailAddress.should.have.property('Address');
                    event.should.have.property('Organizer');
                    event.Organizer.should.have.property('EmailAddress');
                    event.Organizer.EmailAddress.should.have.property('Name');
                    event.Organizer.EmailAddress.should.have.property('Address');
                    event.should.have.property('WebLink');
                }
            });
        });

        it('should return an error object if the response is a 404', function () {
            req.reply(404);

            return outlookService.getEventsAsync('2016-01-09', '2016-01-10', function (err, events) {
                (!events).should.be.true();
                err.should.be.instanceOf(Object);
                err.errors[0].message.should.equal('No events found');
            });
        });

        it('should throw an error if a startDateTime is not provided', function () {
            outlookService.getEventsAsync.should.throw();
            try {
                outlookService.getEventsAsync(undefined, '2016-01-01');
                (true).should.be.false();
            } catch (err) {
                err.message.should.equal('Invalid time value');
            }
        });

        it('should throw an error if an endDateTime is not provided', function () {
            outlookService.getEventsAsync.should.throw();
            try {
                outlookService.getEventsAsync('2016-01-01', undefined);
                (true).should.be.false();
            } catch (err) {
                err.message.should.equal('Invalid time value');
            }
        });
    });
});
