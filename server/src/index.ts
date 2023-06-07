import { ExpressApiServer } from './express.api';
import { MongoDb } from './helpers/mongodb/mongo-helper';
const api = new ExpressApiServer();
const mongodb = new MongoDb();
api.run();
mongodb.connect();
const app = api.app;
export { app };
