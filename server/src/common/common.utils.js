/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
const util = require('util');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const Joi = require('@hapi/joi');
const { UserModel } = require('../app/models');

const validations = require(path.join(`${process.cwd()}/src/validations/index.js`));

const ENV = process.env.NODE_ENV;

function SendResponse(options = {}) {
    // console.log("--- SendResponse ----".options)

    const payload = {};
    payload.data = options.data || {};
    payload.statusCode = options.statusCode || options.statusCode || 500;
    payload.message = options.message || '';
    if (options.accessToken) payload.accessToken = options.accessToken;
    // console.log("payload", payload)
    return options.res.status(payload.statusCode).json(payload);
}

const CatchAsync = (fn) => async (req, res, next) => {
    // console.log("--- CatchAsync ----")
    try {
        await fn(req, res, next);
    } catch (err) {
        console.log('err.message ==>', err.message);
        console.log('err.stack   ==>', err.stack);
        return next(err, req, res, next);
    }
};

function IsAuthenticated(options = {}) {
    return async (req, res, next) => {
        // console.log("--- IsAuthenticated ----")

        try {
            let accessToken = req.headers.authorization;

            if (!accessToken) return res.status(401).json({ message: 'Missing accessToken.' });
            accessToken = accessToken.split(' ')[1];
            const decoded = JWT.verify(accessToken, process.env.JWT_SECRET, {
                algorithms: [process.env.JWT_SECRET_ALGO],
            });
            if (decoded.userId === false) {
                return res.status(401).json({ message: 'Invalid accessToken.' });
            }

            if (decoded.validFor) {
                if (!options.validFor) return res.status(401).json({ message: `Unauthorized for ${req.originalUrl}` });
                if (options.validFor !== req.originalUrl)
                    return res.status(401).json({ message: `Unauthorized for ${req.originalUrl}` });
                const user = await UserModel.findById(decoded.userId)
                    .populate('role')
                    .select(['username', 'email', 'mobile', 'role', 'tokens']);
                if (!user) return res.status(401).json({ message: 'Invalid user.' });
                req.user = user;
                return next();
            }
            const user = await UserModel.findById(decoded.userId)
                .populate('role')
                .select(['username', 'email', 'mobile', 'role', 'tokens']);
            if (!user) return res.status(401).json({ message: 'Invalid user.' });
            req.user = user;
            req.accessToken = accessToken;
            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: `${err.message} at ${err.expiredAt}` });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: `${err.message}` });
            }
            if (err.name === 'NotBeforeError') {
                return res.status(401).json({ message: `${err.message} at ${err.date}` });
            }
            return res.status(401).json({ message: `${err.message}` });
        }
    };
}

function AdaptRequest(options = {}) {
    return (req, res, next) => {
        req.args = {
            params: req.params,
            query: req.query,
            method: req.method,
            body: req.body,
            user: req.user,
            accessToken: req.accessToken,
        };
        return next();
    };
}

const ReadFileAsync = util.promisify(fs.readFile);

const ApiFeature = {
    query: {},
    dbQuery: {},
    optional: {},
    init(options) {
        this.query = options.query || {};
        this.dbQuery = options.dbQuery || {};
        this.optional = options.optional || {};
        return this;
    },
    search() {
        // "i" case in-sensitive
        const keyword = this.query.keyword ? { name: { $regex: this.query.keyword, $options: 'i' } } : {};
        this.dbQuery = this.dbQuery.find({ ...keyword });
        return this;
    },
    filter() {
        const queryParamsCopy = { ...this.query };
        console.log('queryParamsCopy', queryParamsCopy);
        // remove some fields
        const excludeFields = ['keyword', 'page', 'limit'];
        excludeFields.forEach((key) => delete queryParamsCopy[key]);
        let queryStr = JSON.stringify(queryParamsCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.dbQuery.find(JSON.parse(queryStr));
        return this;
    },
    pagination(resultPerPage = 10) {
        const currentPage = Number(this.query.page || 1);
        const skip = resultPerPage * (currentPage - 1);
        this.query.limit(resultPerPage).skip(skip);
        return this;
    },
};

function GetJwtToken(payload = {}) {
    // console.log("--- GetJwtToken ----")
    const { JWT_SECRET_EXPIRE, SERVICE_NAME, JWT_SECRET } = process.env;
    const signOptions = {
        audience: 'evergreen.com',
        expiresIn: `${JWT_SECRET_EXPIRE}`,
        issuer: `${SERVICE_NAME}`,
    };
    const accessToken = JWT.sign(payload, JWT_SECRET, signOptions);
    return accessToken;
}

class ApiError extends Error {
    constructor(options = {}) {
        // console.log("--- ApiError ----")

        super(options.message);
        this.message = options.message;
        this.statusCode = options.statusCode || 500;
        if (options.accessToken) this.accessToken = options.accessToken;
        this.data = options.data || {};
    }

    unAuthenticated() {
        this.statusCode = 401;
        this.message = this.message || 'Unauthrozied';
        return this;
    }

    conflict() {
        this.statusCode = 409;
        this.message = this.message || 'Conflict in API';
        return this;
    }

    badRequest() {
        this.statusCode = 400;
        this.message = this.message || 'Bad Request';
        return this;
    }

    missingFields() {
        this.statusCode = 422;
        this.message = this.message || 'Bad Request';
        return this;
    }
}

function ApiErrorMiddleware(err, req, res, next) {
    // console.log("--- ApiErrorMiddleware ----")

    if (ENV === 'development') {
    }
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        err = MongooseErrors.handleCastErrorDB(err);
    }
    if (err.name === 'ValidationError') {
        err = MongooseErrors.handleValidationErrorDB(err);
    }
    if (err.code === 11000) {
        const message = handleDuplicateFieldError(err);
        err = new ApiError({ statusCode: 400, message });
    }
    if (err.name === 'JsonWebTokenError') {
        err = MongooseErrors.handleJWTsError();
    }
    if (err.name === 'TokenExpiredError') {
        err = MongooseErrors.handleJWTExpiredError();
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
            data: err.data,
            accessToken: err.accessToken,
        });
    }
    return res.status(500).json({
        message: err.message || 'Something went wrong.',
        statusCode: err.statusCode || 500,
        data: err.data || {},
        accessToken: err.accessToken || null,
    });
}

const ThrowableErrors = {
    ThrowUnauthrized(message) {
        throw new ApiError({ statusCode: 401, message: message || 'Unauthroized' });
    },
};

const MongooseErrors = {
    handleDuplicateFieldsDB: (err) => {
        const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
        const message = `Duplicate  field value: ${value}, Please use another value`;
        return new ApiError({ message, statusCode: 400 });
    },

    handleCastErrorDB: (err) => {
        const message = `Invalid ${err.path}: ${err.value}`;
        return new ApiError({ message, statusCode: 400 });
    },

    // handleDuplicateFieldsDB: (err) => {
    //     const key = Object.keys(err.keyPattern)[0];
    //     const value = err.keyValue[key];
    //     // message: `Duplicate field error! '${key}' with value '${value}' at ${err.index} already exists!`,
    //     const message = `Duplicate  field value: ${value}, Please use another value`;
    //     return new ApiError({ message, statusCode: 400 });
    // },

    handleValidationErrorDB: (err) => {
        const errors = Object.keys(err.errors).map((el) => el.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        return new ApiError({ message, statusCode: 422 });
    },

    handleJWTsError: () => new ApiError({ message: 'Invalid token, Please log in again', statusCode: 401 }),

    handleJWTExpiredError: () =>
        new ApiError({ message: 'Your token has expired, Please log in again', statusCode: 401 }),
};

// SMTP_HOST="mail.pec.org.pk"
// SMTP_PORT=25
// SMTP_SECURE=false
// SMTP_AUTH_USER="no-reply@pec.org.pk"
// SMTP_AUTH_PASS= "Noreply@12#$43@!"

const EmailManager = {
    host: process.env.SMTP_HOST || 'mail.pec.org.pk',
    port: Number(process.env.SMTP_PORT) || 25,
    // secure: Boolean(process.env.SMTP_SECURE) || false,
    secure: true,

    auth: {
        user: process.env.SMTP_AUTH_USER || 'no-reply@pec.org.pk',
        pass: process.env.SMTP_AUTH_PASS || 'Noreply@12#$43@!',
    },
    reciever: 'maliksblr92@gmail.com',
    transport() {
        return nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: this.auth,
        });
    },

    async send(options = {}) {
        try {
            const mailTransporter = this.transport();
            const mailData = {
                from: this.host,
                to: this.reciever,
                subject: options.subject || 'Email Subject',
                text: options.text || 'Otp',
                //   attachments: [{ filename: 'epe_rollno_slip.pdf', path: sysPath, contentType: 'application/pdf' }],
                html:
                    options.html ||
                    `<p> This email is originated from www.evergreen.com<p><p>Your Otp is <b>${
                        options.otp || 1234
                    } </b> </p>`,
            };

            return mailTransporter.sendMail(mailData);
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

function ApplyApiValidation(options = {}) {
    return async (req, res, next) => {
        if (validations) {
            const routeUrl = `${req.method}:${req.originalUrl}`;
            const routeExist = Object.keys(validations).includes(routeUrl);
            if (routeExist) {
                const schema = validations[routeUrl];
                try {
                    const { value, error } = await schema.validateAsync(req.body, { abortEarly: false });
                    return next();
                } catch (err) {
                    if (err instanceof Joi.ValidationError) {
                        const errors = err.details.reduce((errorArr, el, index) => {
                            errorArr[`${el.path[0]}`] = [];
                            errorArr[`${el.path[0]}`].push({
                                message: el.message.replace(/"/g, ''),
                                path: el.path[0],
                                // value: value[el.path[0]]
                            });
                            return errorArr;
                        }, {});
                        return res.status(422).json({ errors });
                    }

                    return res.status(422).json({ errors: err });
                }
            } else {
                return next();
            }
        } else {
            return next();
        }
    };
}

module.exports = {
    SendResponse,
    CatchAsync,
    IsAuthenticated,
    ReadFileAsync,
    ApiFeature,
    GetJwtToken,
    ApiError,
    EmailManager,
    ApiErrorMiddleware,
    AdaptRequest,
    ApplyApiValidation,
    ThrowableErrors,
};
