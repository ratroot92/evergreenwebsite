/* eslint-disable no-console */
/* eslint-disable func-names */
const { EmailManager } = require('../common/common.utils');

const EventConsumer = {
    'TOPIC.TRACK_USER_LOGIN': async function (payload = {}) {
        try {
            const emailPayload = {
                subject: 'User Login',
                text: `Login`,
                html: `Dear ${payload.user.username},
                    You have successfully logged into Askari Mobile Banking.
                    Login ID : ${payload.user.email}
                    Login Time : ${payload.loginTime}`,
            };
            await EmailManager.send(emailPayload);
            console.log(`>>> TOPIC.TRACK_USER_LOGIN Event Consumed! <<<`);
        } catch (err) {
            console.log(err);
        }
    },
    'TOPIC.CONSUMED_MESSAGES': async function (payload = {}) {
        try {
            console.log(`>>> TOPIC.CONSUMED_MESSAGES Event Consumed! <<<`);
        } catch (err) {
            console.log(err);
        }
    },
};
module.exports = EventConsumer;
