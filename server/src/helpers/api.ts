'use strict';

import { NextFunction, Request, Response } from 'express';

const _hasOwnProperty = Object.prototype.hasOwnProperty;

const Status = {
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500,
    CREATED: 201,
    CONFLICT: 409,
};

function statusMessage(status: number): string {
    switch (status) {
        case Status.BAD_REQUEST:
            return 'Bad Request';
        case Status.UNAUTHORIZED:
            return 'Unauthorized';
        case Status.FORBIDDEN:
            return 'Forbidden';
        case Status.NOT_FOUND:
            return 'Not Found';
        case Status.UNSUPPORTED_ACTION:
            return 'Unsupported Action';
        case Status.VALIDATION_FAILED:
            return 'Validation Failed';
        case Status.SERVER_ERROR:
            return 'Internal Server Error';
        case Status.CREATED:
            return 'Created';
        case Status.CONFLICT:
            return 'Conflict';
        case Status.OK:
            return 'Success';
        case Status.NO_CONTENT:
            return 'No Content.';

        default:
            throw new Error('Unkown case.');
    }
}

function jsonResponse(res: Response, body: any, options: any) {
    options = options || {};
    options.status = options.status || Status.OK;
    res.status(options.status).json(body || null);
}

// export interface IReturnedData {
//     []: any;
// }

const ApiResponse = {
    ok(req: Request, res: Response, data: any) {
        const body = {
            message: statusMessage(Status.OK),
            success: true,
            data,
        };
        jsonResponse(res, body, {
            status: Status.OK,
        });
    },

    badRequest(req: Request, res: Response, errors: any) {
        errors = Array.isArray(errors) ? errors : [errors];

        const body = {
            message: statusMessage(Status.BAD_REQUEST),
            errors,
        };

        jsonResponse(res, body, {
            status: Status.BAD_REQUEST,
        });
    },

    unauthorized(req: Request, res: Response, error: any) {
        const body = {
            message: statusMessage(Status.UNAUTHORIZED),
            error,
        };

        jsonResponse(res, body, {
            status: Status.UNAUTHORIZED,
        });
    },

    forbidden(req: Request, res: Response) {
        const body = {
            message: statusMessage(Status.FORBIDDEN),
        };

        jsonResponse(res, body, {
            status: Status.FORBIDDEN,
        });
    },
    conflict(req: Request, res: Response) {
        const body = {
            message: statusMessage(Status.CONFLICT),
            success: false,
            status: Status.CONFLICT,
        };

        jsonResponse(res, body, {
            status: Status.CONFLICT,
        });
    },
    notFound(req: Request, res: Response) {
        const body = {
            message: statusMessage(Status.NOT_FOUND),
            success: false,
            status: Status.NOT_FOUND,
        };

        jsonResponse(res, body, {
            status: Status.NOT_FOUND,
        });
    },
    noContent(req: Request, res: Response) {
        const body = {
            message: statusMessage(Status.NO_CONTENT),
            success: true,
            status: Status.NO_CONTENT,
        };

        jsonResponse(res, body, {
            status: Status.NOT_FOUND,
        });
    },

    unsupportedAction(req: Request, res: Response) {
        const body = {
            message: statusMessage(Status.UNSUPPORTED_ACTION),
        };

        jsonResponse(res, body, {
            status: Status.UNSUPPORTED_ACTION,
        });
    },

    invalid(req: Request, res: Response, errors: any) {
        errors = Array.isArray(errors) ? errors : [errors];

        const body = {
            message: statusMessage(Status.VALIDATION_FAILED),
            errors,
        };

        jsonResponse(res, body, {
            status: Status.VALIDATION_FAILED,
        });
    },
    serverError(req: Request, res: Response, error: any) {
        if (error instanceof Error) {
            error = {
                message: error.message,
                stacktrace: error.stack,
            };
        }
        const body = {
            message: statusMessage(Status.SERVER_ERROR),
            error,
        };

        jsonResponse(res, body, {
            status: Status.SERVER_ERROR,
        });
    },

    requireParams(req: Request, res: Response, parameters: any, next: NextFunction) {
        const missing: any[] = [];
        parameters = Array.isArray(parameters) ? parameters : [parameters];
        parameters.forEach((parameter: any) => {
            if (!(req.body && _hasOwnProperty.call(req.body, parameter)) && !(req.params && _hasOwnProperty.call(req.params, parameter)) && !_hasOwnProperty.call(req.query, parameter)) {
                missing.push(`Missing required parameter: ${parameter}`);
            }
        });

        if (missing.length) {
            return ApiResponse.badRequest(req, res, missing);
        } else {
            return next();
        }
    },
    created(req: Request, res: Response, data: any) {
        jsonResponse(res, data, {
            status: Status.OK,
            success: true,
        });
    },

    requireHeaders(req: Request, res: Response, headers: any, next: NextFunction) {
        const missing: any[] = [];

        headers = Array.isArray(headers) ? headers : [headers];

        headers.forEach((header: any) => {
            if (!(req.headers && _hasOwnProperty.call(req.headers, header))) {
                missing.push(`Missing required header parameter: ${header}`);
            }
        });

        if (missing.length) {
            ApiResponse.badRequest(req, res, missing);
        } else {
            next();
        }
    },
};

export { ApiResponse };
