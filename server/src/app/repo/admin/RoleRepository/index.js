const seed = require('./seed')
const create = require('./create')
const get = require('./get')
const remove = require('./remove')
const update = require('./update')

const RoleRepository = {
    seed,
    create,
    get,
    remove,
    update,
}

module.exports = RoleRepository
