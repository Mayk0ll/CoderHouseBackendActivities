import cartModel from '../../models/cart.model.js';

class CartMongoManager {
    constructor() {
        this.cartModel = cartModel;
    }

    async getById(pid) {
        return await this.cartModel.findById(pid);
    }

    async create(cart) {
        return await this.cartModel.create(cart);
    }

    async update(cart) {
        
        return await this.cartModel.findByIdAndUpdate(cart.id, cart, {new: true}) ;
    }
}

export default CartMongoManager;