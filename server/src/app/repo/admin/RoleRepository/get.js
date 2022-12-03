/* eslint-disable no-unused-vars */
const { ApiFeature } = require('../../../../common/common.utils')
const { RoleModel } = require('../../../models')

async function get(args) {
    const { dbQuery } = ApiFeature
        .init({ dbQuery: RoleModel.find({}), queryParams: args.queryParams })
        .search()
        .filter()
    const data = await dbQuery

    return Object.freeze({
        data,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        //  accessToken: getJWTToken({ user: args.user }),
    })
}

module.exports = get
