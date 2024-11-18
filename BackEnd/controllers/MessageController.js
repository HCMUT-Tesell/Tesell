import Message from '../models/Message.model.js';

class MessageController {
    //[POST] / api/message
    async sendMessage(req, res) {
        const { senderId, receiverId, content, messageType, attachments } = req.body;
        try {
            const message = new Message({
                sender: senderId,
                receiver: receiverId,
                content,
                messageType,
                attachments,
            });
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Không thể gửi tin nhắn.', error });
            console.log('Loi o sendMessage')
        }
    }
    async getMessageOfTwoUser(req, res) {
        const { senderId, receiverId, page = 1, limit = 20 } = req.query;

        try {
            const messages = await Message.find({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            })
                .sort({ createdAt: -1 }) 
                .skip((page - 1) * limit)
                .limit(Number(limit));

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Can not get Message Of two people', error });
            console.log('loi o getMessageOfTwoUser, den va fixbug di')
        }
    }
}

export default new MessageController();
