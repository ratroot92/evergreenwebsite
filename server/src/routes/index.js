const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const categoryRouter = require('./category.route');

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/role', roleRouter);
appRouter.use('/category', categoryRouter);

module.exports = appRouter;
