/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
const { ApiError } = require('../../../../common/common.utils')
const { UserModel } = require('../../../models')

async function remove(args = {}) {
    console.log(args)
    if (!args.body._id) throw new ApiError({ message: 'User Id is required!.' }).badRequest()
    if (args.body._id === args.user._id) throw new ApiError({ message: 'Could not delete current user.' }).badRequest()
    const user = await UserModel.findById(args.body._id)
    await user.delete()
    return Object.freeze({
        data: args.body._id,
        message: 'user deleted successfully.',
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })

}

module.exports = remove
