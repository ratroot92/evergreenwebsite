const express = require('express');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const authValidations = require('../validations/auth.validations');
const UserModel = require('../models/user.model');
const protect = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post(
    `/register`,
    (req, res, next) => {
        const schema = authValidations[`${req.method}:${req.originalUrl}`]();
        const { errors } = Joi.valid(req.body, schema);
        if (errors) {
            return res.status(422).json({ success: false, errors, message: '' });
        }
        return next();
    },
    async (req, res) => {
        try {
            const user = await UserModel.create({ firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, email: req.body.email });
            const accessToken = user.getJWTToken();
            return res.status(201).json({ success: true, message: 'SUCCESS', dataReturned: user, accessToken });
        } catch (err) {
            return res.status(500).json({ success: true, message: 'SUCCESS', dataReturned: err.message });
        }
    }
);

authRouter.post(
    `/login`,
    (req, res, next) => {
        const schema = authValidations[`${req.method}:${req.originalUrl}`]();
        const { errors } = Joi.valid(req.body, schema);
        if (errors) {
            return res.status(422).json({ success: false, errors, message: '' });
        }
        return next();
    },
    async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email }).select(['firstName', 'lastName', 'email', 'password']);
            if (!user) {
                return res.status(401).json({ success: true, message: 'unauthorized', dataReturned: {} });
            }
            const isMatched = await bcryptjs.compare(req.body.password, user.password);
            if (!isMatched) {
                return res.status(401).json({ success: true, message: 'unauthorized', dataReturned: {} });
            }
            const accessToken = user.getJWTToken();
            return res.status(201).json({ success: true, message: 'SUCCESS', dataReturned: user, accessToken });
        } catch (err) {
            return res.status(500).json({ success: true, message: 'SUCCESS', dataReturned: err.message });
        }
    }
);

authRouter.get(`/logout`, protect, async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: null });
    } catch (err) {
        return res.status(500).json({ success: true, message: 'SUCCESS', dataReturned: err.message });
    }
});

authRouter.get(`/is-authenticated`, protect, async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'SUCCESS', dataReturned: req.user });
    } catch (err) {
        return res.status(500).json({ success: true, message: 'SUCCESS', dataReturned: err.message });
    }
});

module.exports = authRouter;
