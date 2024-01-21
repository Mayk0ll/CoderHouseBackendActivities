import productsModel from '../../models/product.model.js';

class ProductsMongoManager {
    constructor() {
        this.products = productsModel;
    }

    async getAll() {
        return await this.products.find({status: true}).lean();
    }

    async getById(pid) {
        return await this.products.findById(pid);
    }

    async create(product) {
        return await this.products.create(product);
    }

    async update(product) {
        return await this.products.findByIdAndUpdate(product.id, product, {new: true}) ;
    }

    async delete(pid) {
        return await this.products.findByIdAndUpdate(pid, {status: false}, {new: true});
    }

}

export default ProductsMongoManager;