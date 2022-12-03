/* eslint-disable no-underscore-dangle */
const bcryptjs = require('bcryptjs')
const { UserModel } = require('../../../models')

async function updatePassword(args) {
    let user = await UserModel.findById(args.body._id)
    const isMatch = await bcryptjs.compare(args.body.password, user.password)
    if (isMatch) {
        user = await UserModel.findById(args.body._id).populate('role').select(['-password'])
        return Object.freeze({
            data: user,
            message: 'Provided user password is same as old.',
            statusCode: 409,
            headers: { 'Content-Type': 'application/json' },
            //  accessToken: getJWTToken({ user: args.user }),
        })
    }
    user.password = args.body.password
    await user.save()

    user = await UserModel.findById(args.body._id).populate('role').select(['-password'])
    return Object.freeze({
        data: user,
        message: 'User password updated successfully.',
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })
}
module.exports = updatePassword
