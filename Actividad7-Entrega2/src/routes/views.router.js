import { Router } from "express";
import { getDataFile } from "../dao/managers/fileSystem/jsonFuntions.js";
import ChatMongoManager from "../dao/managers/mongo/chatMongo.manager.js";
import ProductsMongoManager from "../dao/managers/mongo/productsMongo.manager.js";
import CartsMongoManager from "../dao/managers/mongo/cartsMongo.manager.js";

const router = Router();
const chatManager = new ChatMongoManager();
const productsManager = new ProductsMongoManager();
const cartsManager = new CartsMongoManager();

router.get('/home', (req, res) => {
    try {  
        const products = productsManager.getAll();
        res.render('home', {products});
    } catch (error) {
        console.log(error);
    }
})

router.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.render('realTimeProducts', {products})
    } catch (error) {
        console.log(error)
    }
})

router.get('/chat', async (req, res) => {
    try {
        const historyChat = await chatManager.getAll();
        res.render('chat', {historyChat})
    } catch (error) {
        console.log(error)
    }
})

router.get('/products', async (req, res) => {
    try {
        const { page = 1, direction = 1, category = '' } = req.query;
        const {docs, ...products} = await productsManager.getAllWithPaginate({page, direction, category});
        products.payload = docs;        
        res.render('products', {products})
    } catch (error) {
        console.log(error)
    }
})

router.get('/cart', async (req, res) => {
    try {
        const {id} = req.query;
        const {products} = await cartsManager.getById(id);
        const total = products.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
        console.log(products)
        res.render('cart', {products, total})
    } catch (error) {
        console.log(error)
    }
});

export default router;