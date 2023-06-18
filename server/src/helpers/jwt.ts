import * as jwt from 'jsonwebtoken';
import { Config, ConfigManager } from '../config';
import { IUserDoc } from 'src/types';

export class JWT {
    constructor() {
        this.configuration = new ConfigManager().config;
    }
    createJWTToken(payload: IUserDoc): Promise<any> {
        try {
            return jwt.sign(payload, this.configuration.jwt.secret, this.configuration.jwt.options);
        } catch (err) {
            throw new Error(err);
        }
    }
}
