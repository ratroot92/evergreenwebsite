/* eslint-disable no-underscore-dangle */

const { SendResponse, CatchAsync } = require('../../common/common.utils');
const repoProvider = require('../repo');

const controller = {
    repo: 'admin/CategoryRepository',
    create: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'create', req.args)) })
    ),
};

module.exports = controller;
