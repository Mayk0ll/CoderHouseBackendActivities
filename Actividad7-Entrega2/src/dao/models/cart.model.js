import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: Array,
        default: [],
    }
});

export default model('Cart', cartSchema);