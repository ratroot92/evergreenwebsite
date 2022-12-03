
const mongoose = require('mongoose')

async function connectMongoDB() {
    try {
        const { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env;
        if (!MONGO_HOST || !MONGO_PORT || !MONGO_DB_NAME) throw new Error('Mongo Db Environment variables are missing!.')
        const conn = await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 1000,
        });
        console.log("-------------------------------------------------------------")
        console.log(`MongoDB connected successfully at  mongo://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`)
        console.log("-------------------------------------------------------------")

        return conn
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = connectMongoDB