import express from 'express';

import productsRouter from './routes/carts.router.js'
import cartsRouter from './routes/products.router.js'

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api', productsRouter, cartsRouter);

app.listen(port, () => console.log(`servidor escuchando el en puerto ${port}`));

