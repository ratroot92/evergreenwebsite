const authValidations = require('./auth.validations');
const userValidations = require('./user.validations');

const valdiations = { ...userValidations, ...authValidations, }
module.exports = {
    ...valdiations
};
