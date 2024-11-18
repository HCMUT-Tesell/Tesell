import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    content: { type: String, required: true },  
    messageType: { type: String, default: 'text' }, 
    attachments: [{ type: String }], 
    isRead: { type: Boolean, default: false },
}, {
    timestamps: true,
});

Message.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});


export default mongoose.model('Message', Message);
