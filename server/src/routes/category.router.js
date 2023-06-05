/* eslint-disable no-underscore-dangle */
const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const util = require('util');

const protect = require('../middlewares/auth.middleware');
const fsUtils = require('../utils/fs.utils');
const CategoryModel = require('../models/category.models');
const categorytValidations = require('../validations/category.validation');

const categoryRouter = express.Router();
categoryRouter.get(`/`, protect, async (req, res) => {
    try {
        if (req.query._id) {
            const category = await CategoryModel.findById(req.query._id);
            if (category) {
                return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: category });
            }
            return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
        }
        const products = await CategoryModel.find({});
        return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: products });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

categoryRouter.post(
    `/`,
    protect,
    (req, res, next) => {
        const schema = categorytValidations[`${req.method}:${req.originalUrl}`]();
        const { errors } = Joi.valid(req.body, schema);
        if (errors) {
            return res.status(422).json({ success: false, errors, message: '' });
        }
        return next();
    },
    async (req, res) => {
        try {
            const category = await CategoryModel.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
            });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: category });
        } catch (err) {
            return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
        }
    }
);

categoryRouter.patch(
    `/`,
    protect,
    (req, res, next) => {
        const schema = categorytValidations[`${req.method}:${req.originalUrl}`]();
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
            const category = await CategoryModel.findOneAndUpdate({ _id: req.body._id }, { $set: set }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: category });
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
const uploadCategoryAvatarDir = `${process.cwd()}/public/assets/category/avatar`;
const uploadProductAvatar = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadCategoryAvatarDir);
        },
        filename(req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
        },
    }),
});

categoryRouter.post(`/avatar`, fsUtils.ensureUploadDirExist(uploadCategoryAvatarDir), protect, uploadProductAvatar.single('avatar'), async (req, res) => {
    try {
        let category = await CategoryModel.findById(req.body._id);
        if (category) {
            if (category.avatar.url) {
                if (await fsUtils.existsAsync(`${uploadCategoryAvatarDir}/${category.avatar.publicId}`)) {
                    return fsUtils.unlinkAsync(`${uploadCategoryAvatarDir}/${category.avatar.publicId}`);
                }
            }
            const avatarUrl = req.file.path.replace(`${process.cwd()}`, '');
            category = await CategoryModel.findOneAndUpdate({ _id: req.body._id }, { $set: { 'avatar.url': avatarUrl, 'avatar.publicId': req.file.filename } }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: category });
        }
        return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
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

categoryRouter.post(`/media`, fsUtils.ensureUploadDirExist(uploadProductMediaDir), protect, uploadProductMedia.array('media', [10]), async (req, res) => {
    try {
        let category = await CategoryModel.findById(req.body._id);
        if (category) {
            if (category.media.length) {
                await Promise.all(
                    category.media.map(async (med) => {
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
            category = await CategoryModel.findOneAndUpdate({ _id: req.body._id }, { $set: { media } }, { new: true });
            return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: category });
        }

        return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

categoryRouter.delete(`/media`, protect, async (req, res) => {
    try {
        if (req.query._id && req.query.publicId) {
            let category = await CategoryModel.findById(req.body._id);
            if (category) {
                if (category.media.length) {
                    const selectedMedia = category.media.filter((med) => med.publicId === req.query.publicId);
                    if (selectedMedia) {
                        if (await fsUtils.existsAsync(`${uploadProductMediaDir}/${selectedMedia.publicId}`)) {
                            await fsUtils.unlinkAsync(`${uploadProductMediaDir}/${selectedMedia.publicId}`);
                            const updatedMedia = category.media.filter((med) => med.publicId !== req.query.publicId);
                            category = await CategoryModel.findOneAndUpdate({ _id: req.body._id }, { $set: { updatedMedia } }, { new: true });
                        } else {
                            return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
                        }
                    } else {
                        return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
                    }
                } else {
                    return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
                }
            } else {
                return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: category });
            }
        } else {
            return res.status(404).json({ success: false, message: 'NOT_FOUND', dataReturned: {} });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'FAILURE', dataReturned: err.message });
    }
});

module.exports = categoryRouter;
