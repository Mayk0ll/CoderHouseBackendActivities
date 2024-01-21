import { Router } from "express";
import { getDataFile } from "../dao/managers/fileSystem/jsonFuntions.js";
import ChatMongoManager from "../dao/managers/mongo/chatMongo.manager.js";
import ProductsMongoManager from "../dao/managers/mongo/productsMongo.manager.js";

const router = Router();
const chatManager = new ChatMongoManager();
const productsManager = new ProductsMongoManager();

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
        console.log(products)
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

export default router;