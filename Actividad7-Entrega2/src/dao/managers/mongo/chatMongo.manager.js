import chatModel from '../../models/chat.model.js';

class ChatMongoManager {
    constructor() {
        this.chatModel = chatModel;
    }

    async getAll() {
        return await this.chatModel.find().sort({date: 1}).lean();
    }

    async create(chat) {
        return await this.chatModel.create(chat);
    }
}


export default ChatMongoManager;