const Joi = require('joi');

const productValidations = {
    'POST:/api/product': () => Joi.object().keys({ name: Joi.string().required(), description: Joi.string().required(), price: Joi.string().required(), category: Joi.string().required() }),
    'PATCH:/api/product': () => Joi.object().keys({ _id: Joi.string().required(), name: Joi.string().required(), description: Joi.string().required(), price: Joi.string().required(), category: Joi.string().required() }),
};

module.exports = productValidations;
