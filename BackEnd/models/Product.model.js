import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Product = new Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    brand: {
        type: String,
        //required: true,
    },
    buyPrice: {
        type: Number,
        default: 0,
        //required: true,
    },
    sellPrice: {
        type: Number,
        default: 0,
        //required: true,
    },
    category: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        //required: true
    },
    stockProductCount: {
        type: Number,
        required: true,
    },
    storedProduct: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        //required: true,
    },
    numberReviews: {
        type: Number,
        default: 0,
    },
    isFeature: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

Product.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

// module.exports = mongoose.model('Product', Product);
export default mongoose.model('Product', Product);
