const mongoose = require('mongoose')
const { RoleModel } = require('../../../models')

async function create(args = {}) {
    const role = await RoleModel.create({
        _id: mongoose.Types.ObjectId(),
        name: args.body.name,
    })


    return Object.freeze({
        data: role,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })
}

module.exports = create
