/* eslint-disable prefer-regex-literals */
const Joi = require('@hapi/joi');
const { UserModel } = require('../app/models');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    'DELETE:/api/user': Joi.object({
        _id: Joi.objectId().external(async (value) => {
            if (!await UserModel.findOne({ _id: value })) {
                throw new Joi.ValidationError(
                    'string.login',
                    [
                        {
                            message: 'Does not exist!.',
                            path: ['_id'],
                            type: 'string._id',
                            context: {
                                key: '_id',
                                label: '_id',
                                value


                            },
                        },
                    ],

                )
            }

        }
        ),



    })
}

