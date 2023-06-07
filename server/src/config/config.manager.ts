/* eslint-disable @typescript-eslint/ban-ts-comment */
import nconf from 'nconf';
import { Config } from './config';

export class ConfigManager {
    private configuration: any;
    constructor() {
        this.init();
    }

    public get config(): Config {
        return this.configuration;
    }

    private init() {
        nconf.use('memory');
        if (!nconf.get('info')) {
            this.getFile();
        }
        this.configuration = nconf.get();
        // @ts-ignore
        nconf.required['port'];
        if (!this.configuration) {
            process.exit(1);
        }
    }

    private getFile(): void {
        nconf.env(['APP_ENV']).file('default', {
            file: 'default.json',
            dir: 'env',
            type: 'json',
            search: true,
        });
        const filename = `${nconf.get().APP_ENV}.json`;
        nconf.file({
            file: filename,
            dir: 'env',
            type: 'json',
            search: true,
        });
    }
}
