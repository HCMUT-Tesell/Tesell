// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');

import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Category = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    categoryType: {
        type: String,
    }
}, {
    timestamps: true,
});

Category.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

// module.exports = mongoose.model('Category', Category);
export default mongoose.model('Category', Category);
