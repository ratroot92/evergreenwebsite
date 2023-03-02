const mongoose = require('mongoose');
const { UserModel } = require('../../../models');

async function create(args = {}) {
    try {
        const user = await UserModel.create({
            _id: mongoose.Types.ObjectId(),
            email: args.body.email,
            username: args.body.username,
            password: args.body.password,
            mobile: args.body.mobile,
            role: args.body.role,
        });

        return Object.freeze({
            data: user,
            message: 'User created successfully.',
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            /// /  accessToken: getJWTToken({ user: args.user }),
        });
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) {
                // const { status, message, data } = handleDuplicateFieldsDB(err)
                return Object.freeze({
                    // data,
                    message: 'DUPLICATE_ENTRY',
                    // statusCode: status,
                    headers: { 'Content-Type': 'application/json' },
                    /// /  accessToken: getJWTToken({ user: args.user }),
                });
            }
            return Object.freeze({
                message: err.message,
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                /// /  accessToken: getJWTToken({ user: args.user }),
            });
        }
        return Object.freeze({
            message: err.message,
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            /// /  accessToken: getJWTToken({ user: args.user }),
        });
    }
}

module.exports = create;
