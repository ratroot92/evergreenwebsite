const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv-safe').config({
    path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
    allowEmptyValues: true
});
const appRouter = require('./routes/index');
const connectMongoDB = require('./config/mongo.db');
const { ApiErrorMiddleware, AdaptRequest, ApplyApiValidation } = require('./common/common.utils');
const Joi = require('@hapi/joi');

class EvergreenServer {
    app;
    _server;

    async run() {
        this._server = this.app
            .listen(process.env.PORT, process.env.HOST, () => {
                console.log("-------------------------------------------------------------")
                console.log(`${process.env.SERVICE_NAME} listening at [${process.env.HOST}:${process.env.PORT}][${process.env.NODE_ENV}]`);
                console.log("-------------------------------------------------------------")

            })
            .on('error', function (error) {
                process.once('SIGUSR2', function () {
                    process.kill(process.pid, 'SIGUSR2');
                });
                process.on('SIGINT', function () {
                    process.kill(process.pid, 'SIGINT');
                });
                process.on('uncaughtException', function (err, origin) {
                    console.log({ logData: '*** UNCAUGHT EXCEPTION START ***' });
                    console.log({ logData: `err.message ==> ${err.message}` });
                    console.log({ logData: `err.stack ==> ${err.stack}` });
                    console.log({ logData: '*** UNCAUGHT EXCEPTION END ***' });
                });
            });
    }

    async setupExpress() {
        const server = express();
        server.set('strict routing', true);
        server.use(express.urlencoded({ limit: '50mb', extended: true }));
        server.use(express.json({ limit: '50mb', extended: true }));
        this.app = server;
    }

    async setupRoutes() {
        const root = express.Router({ strict: true });
        root.use((req, res, next) => (console.log(`${new Date().getTime()}[${req.method}:${req.url}]`), next()));
        root.use(cors());
        root.use('/public', express.static(path.join(__dirname, '../public')));
        root.use('/media', express.static(path.join(__dirname, '../media')));
        root.use(ApplyApiValidation({}))
        root.use('/api', appRouter);
        root.use(ApiErrorMiddleware)
        root.use((req, res, next) => res.status(404).send('Route not found.'));
        this.app.use(root);
    }


    async connectDB() {
        try {
            await connectMongoDB()
        } catch (err) {
            console.log("Failed to Connect MongoDB ... Retyring in a while!.")
            setTimeout(async () => {
                await this.connectDB()
            }, 3000)
        }
    }


    async letsGo() {
        try {
            await this.setupExpress();
            await this.setupRoutes();
            await this.connectDB();
            await this.run();
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async stop() {
        if (this._server) {
            await this._server.close();
        }
    }
}

module.exports = new EvergreenServer();
