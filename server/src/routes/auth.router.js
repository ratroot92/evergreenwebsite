/* eslint-disable prefer-arrow-callback */
const express = require('express');

// const { adaptRequest } = require();

const authController = require('../app/controllers/auth.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');
// const { UserModel } = require('../app/models');

const auth = express.Router();

auth.post('/login', AdaptRequest({}), authController.login);
auth.post('/admin/login', AdaptRequest({}), authController.adminLogin);

auth.get('/is-authenticated', IsAuthenticated({}), AdaptRequest({}), authController.isAuthenticated);
auth.get('/logout', IsAuthenticated({}), AdaptRequest({}), authController.logout);




module.exports = auth;
