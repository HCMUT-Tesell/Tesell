const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const User = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    address: { type: String},
    deleted: { type: Boolean, default: true}
},
{
    timestamp: true,
}
);

User.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
