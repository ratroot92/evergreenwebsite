/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        unique: true,
    },
    description: { type: String, required: [true, 'description is required'], trim: true },
    avatar: {
        publicId: { type: String, required: false },
        url: { type: String, required: false },
    },
    media: [
        {
            publicId: { type: String, required: false },
            url: { type: String, required: false },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

categorySchema.methods.getJWTToken = function () {
    // return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_SECRET_EXPIRE,
    // });
};
const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;
