const BaseService = require('../base.service');

class LoginUser extends BaseService {
    async validate(data) {
        const rules = {
            data: [
                'required',
                {
                    nested_object: {
                        payload: ['required'],
                        password: ['required'],
                        type: ['required'],
                    },
                },
            ],
        };
        return validator.validate(data, rules);
    }

    async execute(data) {
        const auth = await Auth.login(data.data);
        return {
            data: dumpUser(auth),
        };
    }
}
