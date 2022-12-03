/* eslint-disable no-template-curly-in-string */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */

const { ApiError } = require("../../common/common.utils");

/* eslint-disable global-require */
const repoProvider = async function (repoName, functionName, args) {
    const repoPath = require(`${process.cwd()}/src/app/repo/${repoName}/`);

    if (typeof repoPath === 'object') {
        if (typeof repoPath[functionName] === 'function') {
            const data = await repoPath[functionName](args);
            return data;
        }

        throw new Error('repo not found!.')


    }
    else {
        throw new Error('repo not found!.')
    }
};
module.exports = repoProvider;
