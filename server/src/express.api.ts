/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import http from 'http';

import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import { Config, ConfigManager } from './config';
import { AppRouting } from './app.routing';
import { ApiResponse } from './helpers/api';
import { AppLogger } from './helpers/app-logger';

declare module 'express' {
    interface Express {
        use: any;
    }
}

declare module 'express-serve-static-core' {
    export interface Request {
        url: string;
        method: string;
        originalUrl: string;
        //@ts-ignore
        body: any;
        //@ts-ignore
        query: any;
    }
}

export class ExpressApiServer {
    public app: express.Express;
    private router: express.Router;
    private config: Config;

    constructor() {
        this.config = new ConfigManager().config;
        this.app = express();
        this.router = express.Router();
        this.configure();
    }

    private configure() {
        this.configureMiddleware();
        this.configureBaseRoute();
        this.configureRoutes();
        this.errorHandler();
    }

    private configureMiddleware() {
        this.app.use(json({ limit: '50mb' }));
        this.app.use(compression());
        this.app.use(urlencoded({ limit: '50mb', extended: true }));
        AppLogger.configureLogger();
    }

    private configureBaseRoute() {
        this.app.use((request: Request, res: Response, next: NextFunction) => {
            if (request.url === '/') {
                return ApiResponse.ok(request, res, new ConfigManager().config.info);
            } else {
                AppLogger.info(this.config.APP_ENV, `[${request.method}] : ${request.originalUrl}`);
                next();
            }
        });
        this.app.use(this.config.basePath, this.router);
        new AppRouting(this.router);
    }

    private configureRoutes() {
        this.app.use((request: Request, res: Response, next: NextFunction) => {
            for (const key in request.query) {
                if (key) {
                    // eslint-disable-next-line security/detect-object-injection
                    request.query[key.toLowerCase()] = request.query[key];
                }
            }
            next();
        });
    }

    private errorHandler() {
        this.app.use((error: ErrorRequestHandler, request: Request, res: Response, next: NextFunction) => {
            if (request.body) {
                AppLogger.error('Payload', JSON.stringify(request.body));
            }
            AppLogger.error('Error', error);
            ApiResponse.serverError(request, res, error);
        });

        // catch 404 and forward to error handler
        this.app.use((request: Request, res: Response) => {
            ApiResponse.notFound(request, res);
        });
    }

    public run() {
        const port = this.config.port;
        //@ts-ignore
        const server = http.createServer(this.app);
        server.listen(port);
        AppLogger.info(this.config.APP_ENV, 'Listen port at ' + port);
        server.on('error', this.onError);
    }

    private onError(error: any) {
        const port = error.port;
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
