import { Router } from "express";
import { createNewItem, getDataFile, safeFile } from "../helpers/jsonFuntions.js";

const router = Router();

router.get('/carts/:cid', (req, res) => {
    try {
        const {cid} = req.params;
        const carts = getDataFile('carts');
        const cart = carts.find(cart => cart.id == cid);
        if(!cart) return res.status(400).send({data: 'No se encontro este carrito'});
        
        const allProducts = getDataFile('products');
        const products = cart.products?.map(cart => {
            const findProd = allProducts.find(prod => prod.id == cart.productId);
            if(!findProd) return res.status(400).send({data: 'No se encontro este producto'});
            findProd.quantity = cart.quantity;
            return findProd;
        });

        res.send({data: products});
    } catch (error) {
        console.log(error);
    }
})

router.put('/:cid/carts/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carts = getDataFile('carts');
    const index = carts.findIndex(cart => cart.id == cid);
    if(index < 0) return res.status(400).send({data: 'No se encontro este carrito'});

    const indexProductId = carts[index].products.findIndex(prod => prod.productId == pid)

    if(indexProductId >= 0){
        const copuProductsInCart = [...carts[index].products];
        const copyProduct = {...copuProductsInCart[indexProductId], quantity: ++copuProductsInCart[indexProductId].quantity}
        copuProductsInCart[indexProductId] = copyProduct;
        const copyCart = {...carts[index], products: copuProductsInCart};
        carts[index] = copyCart;
    } else {
        const allProducts = getDataFile('products');
        const product = allProducts.find(cart => cart.id == pid);
        if(!product) return res.status(400).send({data: 'No se encontro este producto para añadir al carrito'});
        carts[index].products.push({productId: Number(pid), quantity: 1})
    }

    safeFile('carts', carts);


    res.send({data: 'Se actualizo el carrito correctamente'});
})

export default router;