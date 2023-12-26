import { createNewItem, getDataFile, safeFile } from "./helpers/jsonFuntions.js";

const io = (io) => {
    io.on('connection', socket => {
        console.log('se ha conectado un usuario');

        socket.on('client:createNewProducts', async (product) => {
            await createNewItem('products', {...product, status: true, thumbnails: []})
            io.emit('server:listProducts', await getDataFile('products').filter(p => p.status == true))
        })

        socket.on('client:deleteProduct', async (id) => {

            const products = await getDataFile('products');
            const indexProd = products.findIndex(p => p.id == id);
            products[indexProd].status = false;
            await safeFile('products', products);
            
            io.emit('server:listProducts', products.filter(p => p.status == true))
        })
    })
}

export default io;