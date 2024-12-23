import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Order = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderDetail: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail',
        required: true
    }],
    shippingAddress:{
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    totalPrice: {
        type: Number
    },
    dateOrdered: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String, // paid, unpaid, pendingPayment
        required: true,
    },
    predictedShippedDate : {
        type: Date,
    },
    actualShippedDate: {
        type: Date,
    },
}, {
    timestamps: true,
});

Order.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

// module.exports = mongoose.model('Order', Order);
export default mongoose.model('Order', Order);