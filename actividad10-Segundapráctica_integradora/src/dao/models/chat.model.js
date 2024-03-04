import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

chatSchema.methods.toJSON = function () {
    const { __v, _id, ...chat } = this.toObject();
    return chat;
}

export default model('Chat', chatSchema);