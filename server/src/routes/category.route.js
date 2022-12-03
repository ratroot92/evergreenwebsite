/* eslint-disable prefer-arrow-callback */
const express = require('express');
const categoryController = require('../app/controllers/category.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const categoryRouter = express.Router();
categoryRouter.post('/', IsAuthenticated(), AdaptRequest({}), categoryController.create);

module.exports = categoryRouter;
