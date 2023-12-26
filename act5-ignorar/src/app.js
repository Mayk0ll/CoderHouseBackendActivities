const express = require('express');
const handlebars = require('express-handlebars')
const cartsRouter = require('./routes/carts.router.js')
const productsRouter = require('./routes/products.router.js');
const { dirname, pathViews } = require('./utils.js');

const port = 8080;
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', pathViews);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', productsRouter, cartsRouter); 

app.use('/api/products', (req, res) => {
    res.render('products')
})

app.listen(port, () => console.log(`servidor escuchando el en puerto ${port}`));

