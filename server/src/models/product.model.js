/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        unique: true,
    },
    description: { type: String, required: [true, 'description is required'], trim: true },
    price: { type: String, required: [true, 'price is required'], maxLength: [8, 'price could not exceed 8 chars'], trim: true },
    category: {
        type: String,
        required: [true, 'product category is required.'],
    },
    rating: { type: Number, default: 0 },
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
    stock: {
        type: Number,
        required: [true, 'stock is required.'],
        maxLength: [4, 'price could not exceed 4 chars'],
        default: 1,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{ name: { type: String, required: true }, rating: { type: Number, required: true }, comment: { type: String, required: true } }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
