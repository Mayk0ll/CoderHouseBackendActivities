import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    thumbnails: {
        type: Array,
        default: [],
    }
});

productSchema.methods.toJSON = function() {
    const { _id, __v, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

productSchema.plugin(paginate);

export default model('Product', productSchema);