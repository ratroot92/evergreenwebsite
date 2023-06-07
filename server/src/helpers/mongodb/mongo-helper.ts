import mongoose from 'mongoose';

import { Config, ConfigManager } from '../../config';
import { AppLogger } from '../app-logger';

export class MongoDb {
    private config: Config;
    private db: any;
    constructor() {
        this.config = new ConfigManager().config;
    }

    public async connect(): Promise<any> {
        try {
            this.db = await mongoose.connect(`mongodb://${this.config.databases.mongodb.host}:${this.config.databases.mongodb.port}/${this.config.databases.mongodb.database}`, { ...this.config.databases.mongodb.options });
            AppLogger.info(this.config.APP_ENV, `mongodb://${this.config.databases.mongodb.host}:${this.config.databases.mongodb.port}`);
        } catch (err) {
            AppLogger.error(this.config.APP_ENV, `Failed to connect mongo db.`);
        }
    }

    public async drop(): Promise<any> {
        try {
            await mongoose.connection.db.dropDatabase();
            AppLogger.info(this.config.APP_ENV, `MongoDb dropped.`);
        } catch (err) {
            AppLogger.error(this.config.APP_ENV, `Failed to drop mongo db.`);
        }
    }
}
