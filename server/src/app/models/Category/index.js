const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        thumbnail: { type: String },
        avatar: { type: String },
        products: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
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

categorySchema.statics.existById = async function existById(id) {
    const category = await this.findById(id);
    if (category === null) throw new Error(`Category with id '${id}' does not exists!`);
    return id;
};

// categorySchema.pre('find', function (next) {
//     this.populate('products');
//     next();
// });
const Category = mongoose.model('category', categorySchema);

module.exports = Category;
