
const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
    {
        number: { type: Number, required: true, trim: true },
        delay: { type: Number, required: true, default: 60 },
        user: { type: mongoose.Types.ObjectId, ref: 'user' },
    },
    {
        timestamps: true,
        _id: true,
    }
);



otpSchema.statics.existById = async function existById(id) {
    const otp = await this.findById(id);
    if (otp === null) throw new Error(`Otp with id '${id}' does not exists!`);
    return id;
};

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp