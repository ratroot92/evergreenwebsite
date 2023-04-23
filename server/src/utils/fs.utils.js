const fs = require('fs');
const util = require('util');

const existsAsync = util.promisify(fs.exists);
const unlinkAsync = util.promisify(fs.unlink);
const mkdirAsync = util.promisify(fs.mkdir);

const ensureUploadDirExist = (dir) => async (req, res, next) => {
    try {
        const exist = await existsAsync(dir);
        if (!exist) {
            await mkdirAsync(dir, { recursive: true });
            return next();
        }

        return next();
    } catch (err) {
        return next(err);
    }
};
const fsUtils = {
    existsAsync,
    unlinkAsync,
    ensureUploadDirExist,
    mkdirAsync,
};

module.exports = fsUtils;
