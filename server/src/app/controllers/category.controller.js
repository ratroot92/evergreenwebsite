/* eslint-disable no-underscore-dangle */
const { ApiFeature } = require('../../common/common.utils');
const { CategoryModel, ProductModel } = require('../models');

const categoryController = {
    async create(req, res) {
        try {
            let category = await CategoryModel.find({ name: req.body.name });
            if (category) {
                return res.status(400).send({
                    message: 'CATEGORY_ALREADY_EXISTS',
                    data: req.body,
                });
            }
            category = await CategoryModel.create({
                name: req.body.name,
            });
            return res.status({
                message: 'SUCCESS',
                data: category,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },
    async getById(req, res) {
        try {
            const product = await CategoryModel.findById(req.params.id);
            if (product) {
                return res.status(200).json({ message: 'SUCCESS', data: product || {} });
            }
            return res.status(404).json({ message: 'CATEGORY_NOT_FOUND', data: {} });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },
    async get(req, res) {
        try {
            const { dbQuery } = ApiFeature.init({ dbQuery: CategoryModel.find({}), query: req.query })
                .search()
                .filter();
            const categories = await dbQuery;
            return res.status(200).json({
                message: 'SUCCESS',
                data: categories,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },

    async seed(req, res) {
        try {
            await ProductModel.deleteMany({});
            await CategoryModel.deleteMany({});
            let categories = await Promise.all(
                ['dryfruits', 'dates', 'condiments'].map(async (name) => {
                    const cat = await CategoryModel.create({ name });
                    return cat;
                })
            );
            categories = await CategoryModel.find({});
            return res.status(200).json({
                message: 'SUCCESS',
                data: categories,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },
    async remove(req, res) {
        try {
            await ProductModel.deleteMany({});
            await CategoryModel.deleteMany({});
            return { message: 'SUCCESS', statusCode: 200 };
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },
    async removeById(req, res) {
        try {
            if (req.params.id) {
                const category = await CategoryModel.findById(req.params.id);
                if (category) {
                    await Promise.all([
                        await ProductModel.deleteMany({ _id: { $in: category.products.filter((p) => p) } }),
                        category.delete(),
                    ]);
                    return res.status(200).json({
                        message: 'SUCCESS',
                        data: req.params.id,
                    });
                }
            }
            return res.status(404).json({
                message: 'CATEGORY_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.message,
            });
        }
    },

    async update(req) {
        let user = await CategoryModel.findById(req.body._id);
        const set = {};
        const updateable = [];
        Object.keys(req.body).forEach((field) => {
            if (updateable.includes(field)) {
                set[field] = req.body[field];
            }
        });
        set.updatedAt = new Date();
        const { modifiedCount } = await CategoryModel.updateOne({ _id: req.body._id }, { $set: set });
        user = await CategoryModel.findById(req.body._id);
        user = await CategoryModel.findById(req.body._id).populate('role').select(['-password']);
        return Object.freeze({
            data: user,
            message: 'User updated successfully.',
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            //  accessToken: getJWTToken({ user: req.user }),
        });
    },
};

module.exports = categoryController;
