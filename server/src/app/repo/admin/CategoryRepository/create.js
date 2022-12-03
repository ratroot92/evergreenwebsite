const { CategoryModel } = require('../../../models');

async function create(args = {}) {
    try {
        console.log;
        const category = await CategoryModel.create({
            name: args.body.name,
        });

        return Object.freeze({
            data: category,
            message: 'User created successfully.',
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        if (err.code) {
            if (err.code === 11000) {
                return Object.freeze({
                    message: 'Duplicate entry!.',
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return Object.freeze({
                message: err.message,
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return Object.freeze({
            message: err.message,
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

module.exports = create;
