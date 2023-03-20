/* eslint-disable prefer-arrow-callback */
const express = require('express');
const multer = require('multer');
const path = require('path');

const categoryController = require('../app/controllers/category.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const uploadImages = multer({
    destination(req, file, cb) {
        cb(null, `${process.cwd()}/public/categories/images`);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    },
});

const uploadCategoryImages = uploadImages.fields([
    // { name: 'avatar', maxCount: 1 },
    // { name: 'images', maxCount: 8 },
    { name: 'avatar' },
    { name: 'images' },
]);

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
categoryRouter.post(
    '/:id/media/images',
    IsAuthenticated(),
    AdaptRequest({}),
    uploadCategoryImages,
    categoryController.addCategoryImages
);
module.exports = categoryRouter;
