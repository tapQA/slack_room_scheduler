'use strict';

module.exports = {
    port: process.env.PORT || '3000',
    outlookApiURI: 'https://outlook.office.com/api/v2.0',
    outlookApiKey: process.env.OUTLOOK_API_KEY || '',
    slackApiURI: 'https://slack.com/api',
    slackApiKey: process.env.SLACK_API_KEY || '',
    slackVerificationToken: process.env.SLACK_TOKEN
};
