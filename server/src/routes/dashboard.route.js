/* eslint-disable prefer-arrow-callback */
const express = require('express');

const { IsAuthenticated, AdaptRequest } = require('../common/common.utils');
const { ProductModel, CategoryModel, UserModel, RoleModel } = require('../app/models');

const dashboardRouter = express.Router();
dashboardRouter.get('/', IsAuthenticated(), AdaptRequest({}), async (req, res) => {
    try {
        const productCount = await ProductModel.count();
        const categoryCount = await CategoryModel.count();
        const userCount = await UserModel.count();
        const roleCount = await RoleModel.count();
        const stats = {
            products: { count: productCount },
            categories: { count: categoryCount },
            users: { count: userCount },
            roles: { count: roleCount },
        };
        return res.status(200).json({
            success: true,
            data: stats,
            message: 'dashboard stats fecthed successfully.',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
});

module.exports = dashboardRouter;
