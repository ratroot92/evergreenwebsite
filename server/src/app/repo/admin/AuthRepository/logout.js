/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */

const { UserModel } = require("../../../models");


async function logout(args) {
    const tokens = args.user.tokens.filter(t => t.token !== args.accessToken)
    await UserModel.findByIdAndUpdate(args.user._id, { tokens })

    return { message: 'User logout sucessfully.', statusCode: 200, data: { user: null, isAuthenticated: false } };
}

module.exports = logout;
