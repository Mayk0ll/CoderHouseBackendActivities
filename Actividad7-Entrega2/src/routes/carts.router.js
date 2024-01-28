import { Router } from "express";
import ProductsMongoManager from "../dao/managers/mongo/productsMongo.manager.js";
import CartsMongoManager from "../dao/managers/mongo/cartsMongo.manager.js";

const router = Router();
const cartsManager = new CartsMongoManager();
const productsManager = new ProductsMongoManager();


router.get('', async (req, res) => {
    try {
        const cart =  await cartsManager.AllCarts();
        res.send({data: cart});
    } catch (error) {
        console.log(error);
    }
})

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

        const index = cart.products.findIndex(p => p.product._id == req.params.pid)
        if(index >= 0) {
            cart.products[index].quantity += 1;
        } else {
            const product = await productsManager.getById(req.params.pid);
            if(!product) res.status(400).send({data: 'El producto no existe'});
            cart.products.push({product: req.params.pid, quantity: 1});
        }
        console.log(cart)

        const cartUpdate = await cartsManager.update(cart);

        res.send({data: 'Se actualizo el carrito correctamente', cartUpdate});
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity = 0 } = req.body;

        const product = await productsManager.getById(req.params.pid);
        if(!product) res.status(400).send({data: 'El producto no existe'});

        let cart = await cartsManager.getById(req.params.cid);
        if(!cart) cart = await cartsManager.create({});

        const index = cart.products.findIndex(p => p.product._id == req.params.pid)
        if(index >= 0) {
            cart.products[index].quantity = quantity;
        } else {
            const product = await productsManager.getById(req.params.pid);
            if(!product) res.status(400).send({data: 'El producto no existe'});
            cart.products.push({product: req.params.pid, quantity});
        }

        const cartUpdate = await cartsManager.update(cart);

        res.send({data: 'Se actualizo el carrito correctamente', cartUpdate});
    } catch (error) {
        console.log(error)
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        let cart = await cartsManager.getById(req.params.cid);
        if(!cart) res.status(400).send({data: 'El carrito no existe'});

        const index = cart.products.findIndex(p => p.product._id == req.params.pid)
        if(index >= 0) {
            cart.products.splice(index, 1);
        } else {
            res.status(400).send({data: 'El producto no existe en el carrito'});
        }

        const cartUpdate = await cartsManager.update(cart);

        res.send({data: 'Se actualizo el carrito correctamente', cartUpdate});
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.getById(req.params.cid);
        if(!cart) res.status(400).send({data: 'El carrito no existe'});
        cart.products = [];
        await cartsManager.update(cart)

        res.send({data: 'Se elimino todos los productos del carrito correctamente'});
    } catch (error) {
        console.log(error)
    }
})

export default router;