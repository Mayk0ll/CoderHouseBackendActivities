import { Router } from "express";
import { createNewItem, getDataFile, safeFile } from "../dao/managers/fileSystem/jsonFuntions.js";

const router = Router();

router.get('', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await getDataFile('products').filter(p => p.status == true);
        if(limit) products = [...products.slice(0, limit)];

        res.send({data: products});
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await getDataFile('products');
        const product = products.find(prod => prod.id == pid && prod.status == true);
        res.send({data: product || 'No se encontro el producto con ese ID'});
    } catch (error) {
        console.log(error);
    }
})

router.post('', async (req, res) => {
    try {
        const {title, description, code, price, status = true, stock, category, thumbnails = []} = req.body;
        if(!title || !description || !code || !price || !stock || !category) return res.status(400).send({data: 'Todos los campos son obligatorios'});
        createNewItem('products', {id: 0, title, description, code, price, status , stock, category, thumbnails});
        console.log('creado')
        res.send({data: 'El producto se creo correctamente'});
    } catch (error) {
        console.log(error);
    }
})

router.put('', async (req, res) => {
    try {
        const {id, title, description, code, price, status, stock, category, thumbnails = []} = req.body;
        const products = await getDataFile('products');
        const index = products.findIndex(prod => prod.id == id);

        if(index < 0) res.status(400).send({data: 'No se encontro el producto con ese ID'});
        if(!title || !description || !code || !price || !stock || !category) return res.status(400).send({data: 'Todos los campos son obligatorios'});

        products[index] = {...products[index], title, description, code, price, status, stock, category, thumbnails}
        await safeFile('products', products);
        res.send({data: 'El producto se actualizo correctamente'});
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await getDataFile('products');
        const indexProd = products.findIndex(p => p.id == pid)
        if(indexProd < 0) return res.status(400).send({data: ' No se encontro el producto con ese ID'})
        products[indexProd].status = false;
        safeFile('products', products);
        res.send({data: 'El producto se elemino correctamente'});
    } catch (error) {
        console.log(error);
    }
})

export default router;