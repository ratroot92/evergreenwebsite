/* eslint-disable no-underscore-dangle */

const { CatchAsync, SendResponse } = require('../../common/common.utils')
const repoProvider = require('../repo')

const controller = {
    repo: 'admin/RoleRepository',
    create: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'create', req.args)) })
    ),
    seed: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'seed', req.args)) })
    ),
    get: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'get', req.args)) })
    ),
    remove: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'remove', req.args)) })
    ),
    update: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'update', req.args)) })
    ),
}

module.exports = controller
