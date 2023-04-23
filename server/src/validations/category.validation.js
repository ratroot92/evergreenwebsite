const Joi = require('joi');

const categorytValidations = {
    'POST:/api/category': () => Joi.object().keys({ name: Joi.string().required(), description: Joi.string().required() }),
    'PATCH:/api/category': () => Joi.object().keys({ _id: Joi.string().required(), name: Joi.string().required(), description: Joi.string().required() }),
};

module.exports = categorytValidations;
