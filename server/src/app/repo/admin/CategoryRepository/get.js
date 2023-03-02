/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { ApiFeature } = require('../../../../common/common.utils');
const { CategoryModel } = require('../../../models');

async function get(args) {
    const { dbQuery } = ApiFeature.init({ dbQuery: CategoryModel.find({}), queryParams: args.queryParams })
        .search()
        .filter();
    const data = await dbQuery;
    // remove logged in user from users array

    return Object.freeze({
        data,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        /// /  accessToken: getJWTToken({ user: args.user }),
    });
}

module.exports = get;
