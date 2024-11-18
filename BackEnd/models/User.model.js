// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');

import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email không hợp lệ']
    },
    password: { 
        type: String,
        required: true, 
    },
    firstName: {
        type: String, 
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    sex: {
        type: String,
        // required: true,
    },
    address: { type: String},
    cccd: { 
        type: String,
        match: [/^\d{12}$/, 'Số CCCD không hợp lệ'],
    },
    birthDay: { 
        type: Date,
        // required: true,
    },
    phone: { 
        type: String,
        match: [/^\d{10,15}$/, 'Số điện thoại không hợp lệ'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isRepairman: {
        type: Boolean,
        default: false,
    },
    isCustomer: {
        type: Boolean,
        default: true,
    },
    deleted: { 
        type: Boolean, 
        default: true
    }
},
{
    timestamp: true,
}
);
User.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

// module.exports = mongoose.model('User', User);
export default mongoose.model('User', User);


