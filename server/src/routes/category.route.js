/* eslint-disable prefer-arrow-callback */
const express = require('express');
const categoryController = require('../app/controllers/category.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const categoryRouter = express.Router();
// GET
categoryRouter.get('/seed', IsAuthenticated(), AdaptRequest({}), categoryController.seed);
categoryRouter.get('/:id', IsAuthenticated(), AdaptRequest({}), categoryController.getById);
categoryRouter.get('/', IsAuthenticated(), AdaptRequest({}), categoryController.get);

// POST

categoryRouter.post('/', IsAuthenticated(), AdaptRequest({}), categoryController.create);

// DELETE

categoryRouter.delete('/:id', IsAuthenticated(), AdaptRequest({}), categoryController.removeById);
categoryRouter.delete('/', IsAuthenticated(), AdaptRequest({}), categoryController.remove);

module.exports = categoryRouter;
