/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const { UserModel } = require('../../../models')

const updateable = ['role', 'email', 'username', 'mobile']

async function update(args) {
    let user = await UserModel.findById(args.body._id)
    const set = {}
    Object.keys(args.body).forEach((field) => {
        if (updateable.includes(field)) {
            set[field] = args.body[field]
        }
    })
    set.updatedAt = new Date()
    const { modifiedCount } = await UserModel.updateOne({ _id: args.body._id }, { $set: set })
    user = await UserModel.findById(args.body._id)
    user = await UserModel.findById(args.body._id).populate('role').select(['-password'])
    return Object.freeze({
        data: user,
        message: 'User updated successfully.',
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })

}

module.exports = update
