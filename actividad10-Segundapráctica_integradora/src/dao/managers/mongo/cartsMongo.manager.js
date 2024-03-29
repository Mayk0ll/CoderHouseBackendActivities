import cartModel from '../../models/cart.model.js';

class CartMongoManager {
    constructor() {
        this.cartModel = cartModel;
    }

    async AllCarts() {
        return await this.cartModel.find();
    }

    async getById(pid) {
        return await this.cartModel.findById(pid).lean();
    }

    async create(cart) {
        return await this.cartModel.create(cart);
    }

    async update(cart) {
        return await this.cartModel.findByIdAndUpdate(cart._id, cart, {new: true}) ;
    }
}

export default CartMongoManager;