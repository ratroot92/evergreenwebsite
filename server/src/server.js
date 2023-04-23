/* eslint-disable no-promise-executor-return */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.router');
const productRouter = require('./routes/product.router');
const categoryRouter = require('./routes/category.router');

dotEnv.config({
    path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    console.log(`${req.method}:${req.originalUrl}`);
    await new Promise((r) => setTimeout(r, 1000));
    return next();
});
app.use('/api/public', express.static('public'));

async function connectDatabase() {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
    } catch (err) {
        throw new Error(err.message);
    }
}

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.use((err, req, res, next) => res.status(500).send(err.message));
app.use((req, res, next) => res.status(404).send('Route not found.'));

app.listen(process.env.PORT, process.env.HOST, () => {
    connectDatabase().then(() => {
        console.log(`Server listening at ${process.env.HOST}:${process.env.PORT}`);
    });
});
