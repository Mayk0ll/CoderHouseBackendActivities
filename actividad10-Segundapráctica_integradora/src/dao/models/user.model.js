import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: false
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function() {
    const { _id, password, __v, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

userSchema.pre('findOne', function () {
    this.populate('cartId');
});

userSchema.pre('find', function () {
    this.populate('cartId');
});

export default model('User', userSchema);
