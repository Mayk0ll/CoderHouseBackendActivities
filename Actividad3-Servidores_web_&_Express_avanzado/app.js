
const express = require('express');
const ProductManager = require('./class/ProdcutManager');

const app = express();
const products = new ProductManager();

//Se ejecuta con el comando en consola  npm run dev !!!! IMPORTANTE TENER NODEMON 
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    let allProducts = await products.getAllProducts();

    if(limit) allProducts = [...allProducts.slice(0, limit)];

    res.send(allProducts);
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await products.getProductsById(pid);

    res.send(product);
});


app.listen(1234, () => {
    console.log('Servidor ejecutandose en el puerto 1234');
});