/* eslint-disable prefer-arrow-callback */
const express = require('express');
const userController = require('../app/controllers/user.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const userRouter = express.Router();
userRouter.post('/', IsAuthenticated(), AdaptRequest({}), userController.create);
userRouter.get('/', IsAuthenticated(), AdaptRequest({}), userController.get);
userRouter.delete('/', IsAuthenticated(), AdaptRequest({}), userController.remove);
userRouter.patch('/', IsAuthenticated(), AdaptRequest({}), userController.update);
userRouter.put('/password', IsAuthenticated(), AdaptRequest({}), userController.updatePassword);
userRouter.get('/seed', AdaptRequest({}), userController.seed);

module.exports = userRouter;
