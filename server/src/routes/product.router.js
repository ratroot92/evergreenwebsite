/* eslint-disable no-underscore-dangle */
const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const ProductModel = require('../models/product.model');
const productValidations = require('../validations/product.validation');
const protect = require('../middlewares/auth.middleware');
const fsUtils = require('../utils/fs.utils');

const productRouter = express.Router();
productRouter.get(`/`, protect, async (req, res) => {
    try {
        if (req.query._id) {
            const product = await ProductModel.findById(req.query._id);
            if (product) {
                return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: product });
            }
            return res.status(404).json({ success: true, message: 'NOT_FOUND', dataReturned: product });
        }
        const products = await ProductModel.find({});
        return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: products });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

productRouter.post(
    `/product`,
    protect,
    (req, res, next) => {
        const schema = productValidations[`${req.method}:${req.originalUrl}`]();
        const { errors } = Joi.valid(req.body, schema);
        if (errors) {
            return res.status(422).json({ success: false, errors, message: '' });
        }
        return next();
    },
    async (req, res) => {
        try {
            const product = await ProductModel.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
            });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: product });
        } catch (err) {
            return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
        }
    }
);

productRouter.patch(
    `/product`,
    protect,
    (req, res, next) => {
        const schema = productValidations[`${req.method}:${req.originalUrl}`]();
        const { errors } = Joi.valid(req.body, schema);
        if (errors) {
            return res.status(422).json({ success: false, errors, message: '' });
        }
        return next();
    },
    async (req, res) => {
        try {
            const set = {};
            Object.keys(req.body).forEach((key) => {
                set[key] = req.body[key];
            });
            const product = await ProductModel.findOneAndUpdate({ _id: req.body._id }, { $set: set }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: product });
        } catch (err) {
            return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
        }
    }
);
/**
         * {
         fieldname: 'avatar',
        originalname: 'avatar',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: '/home/asd/Desktop/development/Ropstam_App/server/public/assets/products/avatar',
        filename: 'avatar-1682238130595-731214915',
        path: '/home/asd/Desktop/development/Ropstam_App/server/public/assets/products/avatar/avatar-1682238130595-731214915',
        size: 3013
        }
        */

// const pathExistAsync=util.promisify(path.exists)
const uploadProductAvatarDir = `${process.cwd()}/public/assets/products/avatar`;
const uploadProductAvatar = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadProductAvatarDir);
        },
        filename(req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
        },
    }),
});

productRouter.post(`//avatar`, fsUtils.ensureUploadDirExist(uploadProductAvatarDir), protect, uploadProductAvatar.single('avatar'), async (req, res) => {
    try {
        let product = await ProductModel.findById(req.body._id);
        if (product) {
            if (product.avatar.url) {
                if (await fsUtils.existsAsync(`${uploadProductAvatarDir}/${product.avatar.publicId}`)) {
                    return fsUtils.unlinkAsync(`${uploadProductAvatarDir}/${product.avatar.publicId}`);
                }
            }
            const avatarUrl = req.file.path.replace(`${process.cwd()}`, '');
            product = await ProductModel.findOneAndUpdate({ _id: req.body._id }, { $set: { 'avatar.url': avatarUrl, 'avatar.publicId': req.file.filename } }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: product });
        }
        return res.status(404).json({ success: true, message: 'NOT_FOUND', dataReturned: product });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

const uploadProductMediaDir = `${process.cwd()}/public/assets/products/media`;
const uploadProductMedia = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadProductMediaDir);
        },
        filename(req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
        },
    }),
});

productRouter.post(`//media`, fsUtils.ensureUploadDirExist(uploadProductMediaDir), protect, uploadProductMedia.array('media', [10]), async (req, res) => {
    try {
        let product = await ProductModel.findById(req.body._id);
        if (product) {
            if (product.media.length) {
                await Promise.all(
                    product.media.map(async (med) => {
                        if (await fsUtils.existsAsync(`${uploadProductMediaDir}/${med.publicId}`)) {
                            return fsUtils.unlinkAsync(`${uploadProductMediaDir}/${med.publicId}`);
                        }
                        return false;
                    })
                );
            }

            const media = req.files.map((file) => {
                const mediaUrl = file.path.replace(`${process.cwd()}`, '');
                return { url: mediaUrl, publicId: file.filename };
            });
            product = await ProductModel.findOneAndUpdate({ _id: req.body._id }, { $set: { media } }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: product });
        }

        return res.status(404).json({ success: true, message: 'NOT_FOUND', dataReturned: product });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

module.exports = productRouter;
