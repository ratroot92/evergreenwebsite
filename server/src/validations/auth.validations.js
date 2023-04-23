const Joi = require('joi');

const authValidations = {
    'POST:/api/auth/register': () => Joi.object().keys({ firstName: Joi.string().required(), lastName: Joi.string().required(), email: Joi.string().email().required(), password: Joi.string().alphanum().min(8).max(14).required() }),
    'POST:/api/auth/login': () => Joi.object().keys({ email: Joi.string().email().required(), password: Joi.string().alphanum().min(8).max(14).required() }),
};

module.exports = authValidations;
