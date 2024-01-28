import { Router } from "express";
import ProductsMongoManager from "../dao/managers/mongo/productsMongo.manager.js";

const router = Router();
const productsManager = new ProductsMongoManager();

router.get('', async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.send({data: products});
    } catch (error) {
        console.log(error)
    }
})

router.get('/paginate', async (req, res) => {

    //  http://localhost:8080/api/products/paginate?page=1&category=clothing&direction=1

    try {
        const allProducts = await productsManager.getAllWithPaginate(req.query);
        const {docs, ...products} = allProducts;
        products.payload = docs;
        res.send({data: products});
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const product = await productsManager.getById(req.params.pid);
        res.send({data: product || 'No se encontro el producto con ese ID'});
    } catch (error) {
        console.log(error);
        res.status(400).send({data: 'No se encontro el producto con ese ID'});
    }
})

router.post('', async (req, res) => {
    try {
        const product = await productsManager.create(req.body);
        res.send({data: `El producto se creo correctamente \n ${product}`});
    } catch (error) {
        console.log(error);
        res.status(500).send({data: 'error al crear este producto'});
    }
})

router.put('', async (req, res) => {
    try {
        const product = await productsManager.update(req.body);
        res.send({data: `El producto se actualizo correctamente \n ${product}`});
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const product = await productsManager.delete(req.params.pid);
        res.send({product});
    } catch (error) {
        console.log(error);
    }
})


export default router;