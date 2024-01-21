import { Router } from "express";
import ProductsMongoManager from "../dao/managers/mongo/productsMongo.manager.js";
import CartsMongoManager from "../dao/managers/mongo/cartsMongo.manager.js";
import cartModel from "../dao/models/cart.model.js";

const router = Router();
const cartsManager = new CartsMongoManager();
const productsManager = new ProductsMongoManager();

router.get('/:cid', async (req, res) => {
    try {
        const cart =  await cartsManager.getById(req.params.cid);
        res.send({data: cart});
    } catch (error) {
        console.log(error);
    }
})

router.post('', async (req, res) => {
    try {
        const cart = await cartsManager.create({});
        res.send({data: cart});
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid/cart/:pid', async (req, res) => {

    try {
        const product = await productsManager.getById(req.params.pid);
        if(!product) res.status(400).send({data: 'El producto no existe'});

        let cart = await cartsManager.getById(req.params.cid);
        if(!cart) cart = await cartsManager.create({});

        const index = cart.products.findIndex(p => p.product == req.params.pid)
        if(index >= 0) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({product: product._id, quantity: 1});
        }

        await cartModel.findByIdAndUpdate(cart._id, cart, {new: true});

        res.send({data: 'Se actualizo el carrito correctamente'});
    } catch (error) {
        console.log(error)
    }
})

export default router;