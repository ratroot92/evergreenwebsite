/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

module.exports = {
    'POST:/api/auth/login': Joi.object({
        type: Joi.number().valid('email', 'phone', 'username').required(),
        payload: Joi.when('type', {
            is: 1,
            then: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            otherwise: Joi.string().required(),
        }),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password: Joi.string().min(8).max(14).required(),
    }),
    'POST:/api/auth/admin/login': Joi.object({
        type: Joi.number().valid('email', 'phone', 'username').required(),
        payload: Joi.when('type', {
            is: 1,
            then: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            otherwise: Joi.string().required(),
        }),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password: Joi.string().min(8).max(14).required(),
    }),
    'POST:/api/auth/otp': Joi.object({
        validFor: Joi.string().required(),
        type: Joi.number().valid('email', 'phone', 'username').required(),
        payload: Joi.when('type', {
            is: 1,
            then: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            otherwise: Joi.string().required(),
        }),
        number: Joi.number().required(),
    }),
};
