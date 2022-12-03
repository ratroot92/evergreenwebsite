/* eslint-disable no-underscore-dangle */
const { ThrowableErrors } = require('../../../../common/common.utils');
const { UserModel } = require('../../../models');

async function isAuthenticated(args) {
    const tokenExist = args.user.tokens.filter(t => t.token === args.accessToken)
    if (tokenExist.length > 0) {
        return { data: { isAuthenticated: true, user: args.user }, message: 'User is authenticated.', statusCode: 200, };
    }

    return ThrowableErrors.ThrowUnauthrized()


}

module.exports = isAuthenticated;
