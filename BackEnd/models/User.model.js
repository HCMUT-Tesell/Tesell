import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const UserSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    address: { type: String},
    deleted: { type: Boolean, default: true}
}, {
    timestamp: true,
});

UserSchema.plugin(MongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

const User = mongoose.model('User', UserSchema)

export default User;
