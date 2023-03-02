/* eslint-disable no-underscore-dangle */
const { ApiFeature } = require('../../../../common/common.utils');
const { ProductModel, CategoryModel } = require('../../../models');

const RoleRepository = {
    async create(args) {
        try {
            const category = await CategoryModel.findById(args.body.category).populate('products');
            if (!category) {
                return Object.freeze({
                    message: 'CATEGORY_DOES_NOT_EXISTS',
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            const exists = await ProductModel.findOne({ name: args.body.name });
            if (exists || category.products.filter(({ name }) => name === args.body.name).length > 1) {
                return Object.freeze({
                    message: 'PRODUCT_ALREADY_EXISTS',
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            const product = new ProductModel({ name: args.body.name, category: category.name });
            category.products.push(product._id);
            await Promise.all([product.save(), category.save()]);
            return Object.freeze({
                data: product,
                message: 'Product created successfully.',
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            if (err.code) {
                if (err.code === 11000) {
                    return Object.freeze({
                        message: 'DUPLICATE_ENTRY',
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                return Object.freeze({
                    message: err.message,
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return Object.freeze({
                message: err.message,
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    },
    async get(args) {
        console.log(args);
        if (Object.keys(args.query)) {
            const { dbQuery } = ApiFeature.init({ dbQuery: ProductModel.find({}), query: args.query })
                .search()
                .filter();
            const data = await dbQuery;
        } else {
            const data = await ProductModel.find({}).populate('category');

            return Object.freeze({
                data,
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    },
    async remove(args) {
        await ProductModel.deleteMany({});
        await CategoryModel.deleteMany({});
        return { message: 'SUCCESS', statusCode: 200 };
        // const product = await ProductModel.findById(args.body.id);
        // if (product) {
        //     const category = await CategoryModel.findById(product.category);
        //     category.products = category.products.filter((p) => p !== product.category);
        //     await Promise.all([category.save(), product.delete()]);
        //     return { message: 'PRODUCT_DELETED', data: args.body.id };
        // }
        // return {
        //     message: 'PRODUCT_DELETION_FAILED',
        // };
    },
};

module.exports = RoleRepository;
