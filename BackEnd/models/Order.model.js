import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Order = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderDetail: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail',
    }],
    shippingAddress:{
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
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
    },
    dateOrdered: {
        type: Date,
    },
    status: {
        type: String,
        // đang chọn, đang chờ thanh toán, đang giao hàng, đã giao hàng
        // ["selecting", "confirmed", "exported", "delivering", "delivered"]
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