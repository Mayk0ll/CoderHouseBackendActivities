import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }]
    }
});

cartSchema.pre('findOne', function () {
    this.populate('products.product');
});

cartSchema.pre('find', function () {
    this.populate('products.product');
});

export default model('Cart', cartSchema);