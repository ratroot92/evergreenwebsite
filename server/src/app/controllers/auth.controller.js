/* eslint-disable no-underscore-dangle */

const { SendResponse, CatchAsync } = require('../../common/common.utils');
const repoProvider = require('../repo');

const controller = {
    repo: 'admin/AuthRepository',
    login: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'login', req.args)) })
    ),
    adminLogin: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'adminLogin', req.args)) })
    ),
    otp: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'otp', req.args)) })
    ),
    isAuthenticated: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'isAuthenticated', req.args)) })
    ),
    logout: CatchAsync(async (req, res) =>
        SendResponse({ res, ...(await repoProvider(controller.repo, 'logout', req.args)) })
    ),
};

module.exports = controller;
