const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const categoryRouter = require('./category.route');
const productRouter = require('./product.router');

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/role', roleRouter);
appRouter.use('/category', categoryRouter);
appRouter.use('/product', productRouter);

module.exports = appRouter;
