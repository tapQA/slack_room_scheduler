'use strict';

module.exports = {
    outlookApiURI: 'https://outlook.office.com/api/v2.0',
    outlookApiKey: process.env.OUTLOOK_API_KEY || '',
    outlookUserName: 'slack_scheduler',
    slackApiURI: 'https://slack.com/api',
    slackApiKey: process.env.SLACK_API_KEY || ''
};
