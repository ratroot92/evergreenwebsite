/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        username: { type: String, required: true, trim: true, unique: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true, trim: true },
        role: { type: mongoose.Types.ObjectId, ref: 'role', required: false },
        mobile: { type: Number, required: true, unique: true },
        tokens: [{ token: { type: Object } }],
    },
    {
        timestamps: true,
        _id: false,
    }
);

userSchema.virtual('id').get(function () {
    return this._id.toString();
});
userSchema.statics.existById = async function existById(id) {
    const role = await this.findById(id);
    if (role === null) throw new Error(`User with id '${id}' does not exists!`);
    return id;
};

// function preFindHook(next) {
//     this.select('-__v -createdAt -updatedAt -password');
//     this.populate('role');
//     next();
// }

// userSchema.pre('find', preFindHook);
// userSchema.pre('findById', preFindHook);
// userSchema.pre('findOne', preFindHook);
// userSchema.pre('save', async (next) =>
//     // if (!this.isModified('password')) {
//     //   return next();
//     // }
//     // const salt = await bcryptjs.genSalt(10);
//     // this.password = await bcryptjs.hash(this.password, 10);

//     next()
// );
const User = mongoose.model('user', userSchema);

module.exports = User;
