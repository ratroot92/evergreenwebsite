/* eslint-disable no-underscore-dangle */
const { RoleModel } = require('../../../models')

const updateable = ['name']

async function update(args) {
    let role = await RoleModel.findById(args.body._id)
    const set = {}
    Object.keys(args.body).forEach((field) => {
        if (updateable.includes(field)) {
            set[field] = args.body[field]
        }
    })
    set.updatedAt = new Date()
    const { modifiedCount } = await RoleModel.updateOne({ _id: args.body._id }, { $set: set })
    role = await RoleModel.findById(args.body._id)
    return Object.freeze({
        data: role,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })


}

module.exports = update
