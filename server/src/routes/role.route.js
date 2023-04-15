/* eslint-disable prefer-arrow-callback */
const express = require('express');
const roleController = require('../app/controllers/role.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const roleRouter = express.Router();

roleRouter.get('/seed', AdaptRequest({}), roleController.seed);
roleRouter.post('/', IsAuthenticated(), AdaptRequest({}), roleController.create);
roleRouter.get('/', IsAuthenticated(), AdaptRequest({}), roleController.get);
roleRouter.delete('/:id', IsAuthenticated(), AdaptRequest({}), roleController.remove);
roleRouter.put('/', IsAuthenticated(), AdaptRequest({}), roleController.update);

module.exports = roleRouter;
