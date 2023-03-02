/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const path = require('path');
const fs = require('fs');
const util = require('util');

const unlinkAsync = util.promisify(fs.unlink);
const writeAsync = util.promisify(fs.writeFile);
const existsAsync = util.promisify(fs.exists);
const mkdirAsync = util.promisify(fs.mkdir);

const { ApiFeature } = require('../../common/common.utils');
const { CategoryModel, ProductModel } = require('../models');

const productController = {
    async getById(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id).populate('category', '_id name media');
            if (product) {
                return res.status(200).json({ message: 'SUCCESS', data: product || {} });
            }
            return res.status(404).json({ message: 'PRODUCT_NOT_FOUND', data: {} });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },
    async get(req, res) {
        const { dbQuery } = ApiFeature.init({
            dbQuery: ProductModel.find({}).populate('category', '_id name media'),
            query: req.query,
        })
            .search()
            .filter();
        const products = await dbQuery;

        return res.status(200).json({ message: 'SUCCESS', data: products });
    },
    async create(req, res) {
        try {
            const category = await CategoryModel.findById(req.body.category).populate('products');
            if (!category) {
                return res.json({
                    message: 'CATEGORY_DOES_NOT_EXISTS',
                    data: req.body,
                });
            }
            const exists = await ProductModel.findOne({ name: req.body.name });
            if (exists || category.products.filter(({ name }) => name === req.body.name).length > 1) {
                return res.json({
                    message: 'PRODUCT_ALREADY_EXISTS',
                    data: req.body,
                });
            }
            const product = new ProductModel({ name: req.body.name, category: category.name });
            category.products.push(product._id);
            await Promise.all([product.save(), category.save()]);
            return res.json({
                data: product,
                message: 'Product created successfully.',
                statusCode: 200,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },

    async removeById(req, res) {
        try {
            if (req.params.id) {
                const product = await ProductModel.findById(req.params.id);
                if (product) {
                    if (product.avatar) {
                        try {
                            await unlinkAsync(process.cwd() + product.avatar);
                        } catch (err) {
                            if (!err.code === 'ENOENT') {
                                throw new Error(err.stack);
                            }
                        }
                    }
                    if (product.media.images.length) {
                        await Promise.all(
                            product.media.images.map(async (img) => {
                                try {
                                    await unlinkAsync(process.cwd() + img);
                                } catch (err) {
                                    if (!err.code === 'ENOENT') {
                                        throw new Error(err.stack);
                                    }
                                }
                            })
                        );
                    }

                    const category = await CategoryModel.findOne({ name: product.category });
                    category.products.filter((p) => p._id === product._id);
                    await Promise.all([product.delete(), category.save()]);
                    return res.status(200).json({
                        message: 'SUCCESS',
                        data: req.params.id,
                    });
                }

                return res.status(404).json({
                    message: 'PRODUCT_NOT_FOUND',
                    data: req.params.id,
                });
            }
            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },

    async remove(req, res) {
        try {
            const products = await ProductModel.find({});
            if (products.length) {
                await Promise.all(
                    products.map(async (product) => {
                        if (product.avatar) {
                            try {
                                await unlinkAsync(process.cwd() + product.avatar);
                            } catch (err) {
                                if (!err.code === 'ENOENT') {
                                    throw new Error(err.stack);
                                }
                            }
                        }
                        if (product.media.images.length) {
                            await Promise.all(
                                product.media.images.map(async (img) => {
                                    try {
                                        await unlinkAsync(process.cwd() + img);
                                    } catch (err) {
                                        if (!err.code === 'ENOENT') {
                                            throw new Error(err.stack);
                                        }
                                    }
                                })
                            );
                        }
                    })
                );
            }

            await ProductModel.deleteMany({});
            await CategoryModel.deleteMany({});
            return { message: 'SUCCESS', statusCode: 200 };
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },

    async seed(req, res) {
        try {
            let products = await ProductModel.find({});
            if (products.length) {
                await Promise.all(
                    products.map(async (product) => {
                        if (product.avatar) {
                            try {
                                await unlinkAsync(process.cwd() + product.avatar);
                            } catch (err) {
                                if (!err.code === 'ENOENT') {
                                    throw new Error(err.stack);
                                }
                            }
                        }
                        if (product.media.images.length) {
                            await Promise.all(
                                product.media.images.map(async (img) => {
                                    try {
                                        await unlinkAsync(process.cwd() + img);
                                    } catch (err) {
                                        if (!err.code === 'ENOENT') {
                                            throw new Error(err.stack);
                                        }
                                    }
                                })
                            );
                        }
                    })
                );
            }

            const categories = await CategoryModel.find({});
            if (categories.length) {
                await Promise.all(
                    categories.map(async (cat, index) => {
                        await ProductModel.deleteMany({ category: cat._id });
                        const product = await ProductModel.create({
                            category: cat._id,
                            name: `${cat.name}_product_${index}`,
                        });
                        categories.products = [];
                        cat.products.push(product._id);
                        return cat.save();
                    })
                );
                products = await ProductModel.find({});
                return res.status(200).json({ message: 'SUCCESSS', data: products });
            }

            return res.status(404).json({ message: 'CATEGORIES_NOT_FOUND', data: [] });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },
    async addProductImage(req, res) {
        try {
            let product = await ProductModel.findById(req.params.id);
            if (product) {
                if (req.files.avatar) {
                    if (product.avatar) {
                        try {
                            await unlinkAsync(process.cwd() + product.avatar);
                        } catch (err) {
                            if (!err.code === 'ENOENT') {
                                throw new Error(err.stack);
                            }
                        }
                    }
                    if (!(await existsAsync(`${process.cwd()}/public/products/avatar`))) {
                        await mkdirAsync(`${process.cwd()}/public/products/avatar`);
                    }
                    const fileName = Date.now() + path.extname(req.files.avatar[0].originalname);
                    const filePath = `${process.cwd()}/public/products/avatar/${fileName}`;
                    await writeAsync(filePath, req.files.avatar[0].buffer);
                    product.avatar = filePath.replace(process.cwd(), '');
                    product = await product.save();
                }
                if (req.files.images) {
                    if (!(await existsAsync(`${process.cwd()}/public/products/images`))) {
                        await mkdirAsync(`${process.cwd()}/public/products/images`);
                    }
                    await Promise.all(
                        req.files.images.map(async (galleryImage, index) => {
                            const fileName = Date.now() + index + path.extname(galleryImage.originalname);
                            const filePath = `${process.cwd()}/public/products/images/${fileName}`;
                            await writeAsync(filePath, galleryImage.buffer);
                            product.media.images.push(filePath.replace(process.cwd(), ''));
                        })
                    );
                    await product.save();
                }

                return res.status(200).json({
                    message: 'SUCCESS',
                    data: product,
                });
            }

            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },
    async updateProductImage(req, res) {
        try {
            let product = await ProductModel.findById(req.params.id);
            if (product) {
                if (req.files.avatar) {
                    if (product.avatar) {
                        try {
                            await unlinkAsync(process.cwd() + product.avatar);
                        } catch (err) {
                            if (!err.code === 'ENOENT') {
                                throw new Error(err.stack);
                            }
                        }
                    }
                    if (!(await existsAsync(`${process.cwd()}/public/products/avatar`))) {
                        await mkdirAsync(`${process.cwd()}/public/products/avatar`);
                    }
                    const fileName = Date.now() + path.extname(req.files.avatar[0].originalname);
                    const filePath = `${process.cwd()}/public/products/avatar/${fileName}`;
                    await writeAsync(filePath, req.files.avatar[0].buffer);
                    product.avatar = filePath.replace(process.cwd(), '');
                    product = await product.save();
                }
                if (req.files.images) {
                    if (product.media.images.length) {
                        await Promise.all(
                            product.media.images.map(async (img) => {
                                try {
                                    await unlinkAsync(process.cwd() + img);
                                } catch (err) {
                                    if (!err.code === 'ENOENT') {
                                        throw new Error(err.stack);
                                    }
                                }
                            })
                        );
                    }

                    product.media.images = [];
                    if (!(await existsAsync(`${process.cwd()}/public/products/images`))) {
                        await mkdirAsync(`${process.cwd()}/public/products/images`);
                    }
                    await Promise.all(
                        req.files.images.map(async (galleryImage, index) => {
                            const fileName = Date.now() + index + path.extname(galleryImage.originalname);
                            const filePath = `${process.cwd()}/public/products/images/${fileName}`;
                            await writeAsync(filePath, galleryImage.buffer);
                            product.media.images.push(filePath.replace(process.cwd(), ''));
                        })
                    );
                    await product.save();
                }

                return res.status(200).json({
                    message: 'SUCCESS',
                    data: product,
                });
            }

            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },

    async addProductVideos(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (product) {
                if (!(await existsAsync(`${process.cwd()}/public/products/videos`))) {
                    await mkdirAsync(`${process.cwd()}/public/products/videos`);
                }
                await Promise.all(
                    req.files.videos.map(async (galleryImage, index) => {
                        const fileName = Date.now() + index + path.extname(galleryImage.originalname);
                        const filePath = `${process.cwd()}/public/products/videos/${fileName}`;
                        await writeAsync(filePath, galleryImage.buffer);
                        product.media.videos.push(filePath.replace(process.cwd(), ''));
                    })
                );
                await product.save();
                return res.status(200).json({
                    message: 'SUCCESS',
                    data: product,
                });
            }

            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },
    async updateProductVideos(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (product) {
                if (req.files.videos) {
                    if (product.media.videos.length) {
                        await Promise.all(
                            product.media.videos.map(async (img) => {
                                try {
                                    await unlinkAsync(process.cwd() + img);
                                } catch (err) {
                                    if (!err.code === 'ENOENT') {
                                        throw new Error(err.stack);
                                    }
                                }
                            })
                        );
                    }

                    product.media.videos = [];

                    if (!(await existsAsync(`${process.cwd()}/public/products/videos`))) {
                        await mkdirAsync(`${process.cwd()}/public/products/videos`);
                    }

                    await Promise.all(
                        req.files.videos.map(async (galleryImage, index) => {
                            const fileName = Date.now() + index + path.extname(galleryImage.originalname);
                            const filePath = `${process.cwd()}/public/products/videos/${fileName}`;
                            await writeAsync(filePath, galleryImage.buffer);
                            product.media.videos.push(filePath.replace(process.cwd(), ''));
                        })
                    );
                    await product.save();
                }

                return res.status(200).json({
                    message: 'SUCCESS',
                    data: product,
                });
            }

            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
                data: req.params.id,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'SOMETHING_WENT_WRONG',
                data: err.stack,
            });
        }
    },
};

module.exports = productController;
