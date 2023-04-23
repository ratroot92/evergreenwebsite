const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

async function protect(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: true, message: 'unauthorized', dataReturned: {} });
        }
        const { id } = jwt.decode(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(401).json({ success: true, message: 'unauthorized', dataReturned: {} });
        }
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ success: true, message: 'unauthorized', dataReturned: {} });
    }
}

module.exports = protect;
