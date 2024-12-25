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
        type: Number,
        required: true,
    },
    dateOrdered: {
        type: Date,
    },
    status: {
        type: String,
        // đang chọn, đang chờ thanh toán, đang giao hàng, đã giao hàng
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