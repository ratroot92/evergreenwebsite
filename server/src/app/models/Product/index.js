const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        thumbnail: { type: String },
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

const Product = mongoose.model('product', productSchema);

module.exports = Product;
