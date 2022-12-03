const { SendResponse, CatchAsync } = require('../../common/common.utils');
const repoProvider = require('../repo');

const controller = {
    repo: 'admin/UserRepository',
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
    updatePassword: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'updatePassword', req.args)) })
    ),
};

module.exports = controller;
