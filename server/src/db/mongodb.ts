import mongoose from "mongoose";

async function connectDatabase():Promise<any> {
    try {
       const db= await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
       return db
    } catch (err:any) {
        throw new Error(err.message);
    }
}