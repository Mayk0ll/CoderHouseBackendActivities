import { Router } from "express";
import { getDataFile } from "../helpers/jsonFuntions.js";

const router = Router();

router.get('/home', (req, res) => {
    try {  
        const products = getDataFile('products');
        res.render('home', {products});
    } catch (error) {
        console.log(error);
    }
})

router.get('/realTimeProducts', (req, res) => {
    try {
        const products = getDataFile('products');
        res.render('realTimeProducts', {products})
    } catch (error) {
        console.log(error)
    }
})

export default router;