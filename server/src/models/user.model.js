/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        maxLength: [30, 'firstName could not exceed 30 chars'],
        minLength: [4, 'firstName shoud have more than 4 chars'],
        trim: true,
    },
    lastName: { type: String, required: [true, 'lastName is required'], trim: true },
    email: { type: String, required: [true, 'email is required'], trim: true, unique: true, validate: [validator.isEmail, 'email is invalid'] },
    password: { type: String, required: [true, 'password is required'], maxLength: [14, 'password could not exceed 30 chars'], minLength: [8, 'password shoud have more than 4 chars'], select: false, trim: true },
    avatar: {
        publicId: { type: String, required: false },
        url: { type: String, required: false },
    },
    role: { type: String, default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        this.password = await bcryptjs.hash(this.password, 10);
    }
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRE,
    });
};
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
