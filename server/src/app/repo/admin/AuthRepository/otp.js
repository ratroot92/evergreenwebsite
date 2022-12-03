/* eslint-disable no-underscore-dangle */

const { ApiError, GetJwtToken } = require("../../../../common/common.utils");
const { UserModel } = require("../../../models");
const Otp = require("../../../models/Otp");

async function verifyOtp(args) {
    const { payload, number, type } = args.body;
    console.log("payload  ==>", payload)
    console.log("number   ==>", number)
    console.log("type     ==>", type)


    let user;
    if (Number(type) === 1) {
        user = await UserModel.findOne({ email: payload });
    } else if (Number(type) === 2) {
        user = await UserModel.findOne({ username: payload });
    } else if (Number(type) === 3) {
        user = await UserModel.findOne({ phone: payload });
    }
    if (!user) throw ApiError.unAuthenticated();
    const otps = await Otp.find({ user: user._id }).select('number delay createdAt');
    if (otps.length === 0) {
        throw ApiError.unAuthenticated();
    }
    const otp = otps[otps.length - 1];
    const delay = Math.floor((new Date() - new Date(otp.createdAt)) / 1000);
    if (delay > otp.delay) {
        await Otp.deleteMany({ user: user._id });
        throw ApiError.badRequest('Otp timeout.');
    }

    if (otp.number !== number) throw ApiError.badRequest('Invalid Otp.');
    user = await UserModel.findById(user._id).populate('role').select(['username', 'email', 'mobile', 'role']);

    const accessToken = GetJwtToken({ user });
    return { message: 'Otp verified sucessfully.', statusCode: 200, accessToken };
}

module.exports = verifyOtp;
