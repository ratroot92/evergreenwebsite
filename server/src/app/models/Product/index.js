const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
        // category: { type: String, required: true },
        avatar: { type: String },
        media: {
            images: [{ type: String }],
            videos: [{ type: String }],
        },
    },
    {
        timestamps: true,
        _id: true,
    }
);

productSchema.statics.existById = async function existById(id) {
    const product = await this.findById(id);
    if (product === null) throw new Error(`Product with id '${id}' does not exists!`);
    return id;
};
// productSchema.pre('find', function (next) {
//     console.log('find');
//     this.populate('category');
//     next();
// });
// productSchema.pre('findOne', function (next) {
//     console.log('findOne');
//     this.populate('category');
//     next();
// });
// productSchema.pre('findById', function (next) {
//     console.log('findById');
//     this.populate('category');
//     next();
// });
const Product = mongoose.model('product', productSchema);

module.exports = Product;
