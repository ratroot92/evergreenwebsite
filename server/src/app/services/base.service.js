class BaseService {
    constructor(args) {
        if (!args.context) {
            throw new Error('CONTEXT_REQUIRED');
        }
        this.context = args.context;
    }

    run(params) {
        return this.validate(params).then((cleanedParams) => this.execute(cleanedParams));
    }
}

module.exports = BaseService;
