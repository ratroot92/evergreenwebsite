/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const path = require('path')
const YAML = require('yaml')
const mongoose = require('mongoose')
const { RoleModel, UserModel } = require('../../../models')
const { ReadFileAsync, ApiError } = require('../../../../common/common.utils')

async function seed(args) {
    const users = await UserModel.find({})
    if (users.length) throw new ApiError({ message: 'Delete users first!.' }).conflict()
    await RoleModel.deleteMany({})
    let roles = await YAML.parse(await ReadFileAsync(path.join(__dirname, './roles.yaml'), 'utf-8'))
    roles = roles.map((role) => {
        role._id = mongoose.Types.ObjectId()
        return role
    })
    const data = await Promise.all(roles.map(async (role) => RoleModel.create(role)))

    return Object.freeze({
        data,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        message: 'Roles seeders successfull',
    })
}

module.exports = seed
