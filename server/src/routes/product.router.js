/* eslint-disable prefer-arrow-callback */
const express = require('express');
const multer = require('multer');
const path = require('multer');

const productController = require('../app/controllers/product.controller');
const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');

const productRouter = express.Router();
// GET
productRouter.get('/seed', IsAuthenticated(), AdaptRequest({}), productController.seed);
productRouter.get('/:id', IsAuthenticated(), AdaptRequest({}), productController.getById);
productRouter.get('/', IsAuthenticated(), AdaptRequest({}), productController.get);

// POST
productRouter.post('/', IsAuthenticated(), AdaptRequest({}), productController.create);
const uploadImages = multer({
    destination(req, file, cb) {
        cb(null, `${process.cwd()}/public/products/images`);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    },
});

const uploadProductImage = uploadImages.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 8 },
]);
const uploadProductVideos = uploadImages.fields([{ name: 'videos', maxCount: 8 }]);
productRouter.post(
    '/:id/media/images',
    IsAuthenticated(),
    AdaptRequest({}),
    uploadProductImage,
    productController.addProductImage
);

productRouter.put(
    '/:id/media/images',
    IsAuthenticated(),
    AdaptRequest({}),
    uploadProductImage,
    productController.updateProductImage
);

productRouter.post(
    '/:id/media/videos',
    IsAuthenticated(),
    AdaptRequest({}),
    uploadProductVideos,
    productController.addProductVideos
);

productRouter.put(
    '/:id/media/videos',
    IsAuthenticated(),
    AdaptRequest({}),
    uploadProductVideos,
    productController.updateProductVideos
);

// DELETE
productRouter.delete('/:id', IsAuthenticated(), AdaptRequest({}), productController.removeById);
productRouter.delete('/', IsAuthenticated(), AdaptRequest({}), productController.remove);

module.exports = productRouter;
