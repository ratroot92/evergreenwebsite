/* eslint-disable no-underscore-dangle */
const bcryptjs = require('bcryptjs');
const { ThrowableErrors, GetJwtToken } = require('../../../../common/common.utils');
const { UserModel, OtpModel } = require('../../../models');

function EvaluateJWTExpiryInSeconds(val, unit) {
    switch (unit) {
        case 's':
            return parseInt(val, 10) * 1;
        case 'm':
            return parseInt(val, 10) * 60;
        case 'h':
            return parseInt(val, 10) * 3600;
        case 'd':
            return parseInt(val, 10) * 86400;
        default:
            return parseInt(val, 10) * 60;
    }
}
async function adminLogin(args) {
    const { payload, password, type } = args.body;
    let user;
    if (type === 'email') {
        user = await UserModel.findOne({ email: payload }).populate(['role']);
        if (!user || !user.role.name) ThrowableErrors.ThrowUnauthrized();
        const number = 123123;
        await OtpModel.create({ user: user._id, number, delay: 30 });
        if (process.env.SEND_MAIL === '1') {
            // await EmailManager.send({ otp: number });
        }
    } else if (type === 2) {
        user = await UserModel.findOne({ username: payload }).select('password');
        if (!user || !user.role.name) ThrowableErrors.ThrowUnauthrized('Invalid username.');
    } else if (type === 3) {
        user = await UserModel.findOne({ phone: payload }).select('password');
        if (!user || !user.role.name) ThrowableErrors.ThrowUnauthrized();
    }
    if (!user || !user.role.name) ThrowableErrors.ThrowUnauthrized('Invalid mobile number.');
    const isMatched = await bcryptjs.compare(password, user.password);
    if (isMatched === false) {
        ThrowableErrors.ThrowUnauthrized();
    }

    const jwtPayload = {
        // validFor: '/api/auth/otp',
        userId: user._id,
    };
    const accessToken = GetJwtToken(jwtPayload);

    let oldTokens = user.tokens || [];
    if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
            const timeDiff = Date.now() - parseInt(t.signedAt, 10) / 1000;
            const [val, unit] = process.env.JWT_SECRET_EXPIRE.split('');
            const expiryInMin = EvaluateJWTExpiryInSeconds(val, unit);
            if (timeDiff < expiryInMin) {
                return t;
            }
        });
    }
    user = await UserModel.findByIdAndUpdate(user._id, {
        tokens: [...oldTokens, { token: accessToken, signedAt: Date.now().toString() }],
    }).select(['username', 'email', 'role', 'mobile']);
    return {
        message: 'User logged in successfully!.',
        statusCode: 200,
        accessToken,
        data: { user, isAuthenticated: true },
    };
}
module.exports = adminLogin;
