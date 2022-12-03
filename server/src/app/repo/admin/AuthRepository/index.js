const otp = require('./otp');
const login = require('./login');
const isAuthenticated = require('./isAuthenticated');
const logout = require('./logout');
const adminLogin = require('./adminLogin');



module.exports = {
    otp,
    login,
    isAuthenticated,
    logout,
    adminLogin

};
