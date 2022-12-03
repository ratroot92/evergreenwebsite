/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const path = require('path')
const YAML = require('yaml')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const { UserModel, RoleModel } = require('../../../models')
const { ReadFileAsync } = require('../../../../common/common.utils')

async function seed(args) {
    await UserModel.deleteMany({})
    const roles = await RoleModel.find({})
    if (roles.length === 0) {
        throw new Error('no roles exist.')
    } else {
        const allRolesNames = roles.map(({ name }) => name)
        let data = await YAML.parse(await ReadFileAsync(path.join(__dirname, './users.yaml'), 'utf-8'))
        data = await Promise.all(
            data.map(async (user) => {
                if (allRolesNames.includes(user.role)) {
                    user._id = mongoose.Types.ObjectId()
                    user.role = roles.filter((role) => role.name === user.role)[0]._id
                    user.password = await bcryptjs.hash(user.password, 10)
                    const usr = await UserModel.create(user)
                    return usr
                }
                return false
            })
        )
        data = data.filter((user) => user !== false)

        if (data.length === 0) throw new Error('no data with valid role.')

        data = await UserModel.find({}).populate('role')
        return Object.freeze({
            data,
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            message: 'Users seeders successfull',
        })
    }
}

module.exports = seed
