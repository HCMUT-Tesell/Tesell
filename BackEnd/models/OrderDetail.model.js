// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');

import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const OrderDetail = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
}, {
    timestamp: true,
})

OrderDetail.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

// module.exports = mongoose.model('OrderDetail', OrderDetail);
export default mongoose.model('OrderDetail', OrderDetail);

