/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
const { RoleModel, UserModel } = require('../../../models')

async function remove(args = {}) {
    if (args.pathParams.id) {
        const role = await RoleModel.findById(args.pathParams.id)
        if (role !== null) {
            const roleInUse = await UserModel.findOne({ role: role._id })
            if (roleInUse) {
                return Object.freeze({
                    message: `A user with role '${role.name}' exists.`,
                    statusCode: 409,
                    headers: { 'Content-Type': 'application/json' },
                    //  accessToken: getJWTToken({ user: args.user }),
                })
            }

            await role.delete()

            return Object.freeze({
                data: { data: args.pathParams.id, message: 'role deleted successfully.' },
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                //  accessToken: getJWTToken({ user: args.user }),
            })
        }
    }
    throw new Error('notFound')
}

module.exports = remove
