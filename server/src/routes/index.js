const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const roleRouter = require('./role.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const dashboardRouter = require('./dashboard.route');

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/role', roleRouter);
appRouter.use('/category', categoryRouter);
appRouter.use('/product', productRouter);
appRouter.use('/dashboard', dashboardRouter);

module.exports = appRouter;
