import { createNewItem, getDataFile, safeFile } from "./dao/managers/fileSystem/jsonFuntions.js";
import ChatMongoManager from "./dao/managers/mongo/chatMongo.manager.js";
import ProductsMongoManager from "./dao/managers/mongo/productsMongo.manager.js";

const chatManager = new ChatMongoManager();
const productsManager = new ProductsMongoManager();

const io = (io) => {
    io.on('connection', socket => {
        console.log('se ha conectado un usuario');

        socket.on('client:createNewProducts', async (product) => {
            // await createNewItem('products', {...product, status: true, thumbnails: []})
            // io.emit('server:listProducts', await getDataFile('products').filter(p => p.status == true))
            await productsManager.create(product)
            console.log(await productsManager.getAll())
            io.emit('server:listProducts', await productsManager.getAll())
        })

        socket.on('client:deleteProduct', async (pid) => {

            // const products = await getDataFile('products');
            // const indexProd = products.findIndex(p => p.id == id);
            // products[indexProd].status = false;
            // await safeFile('products', products);
            
            // io.emit('server:listProducts', products.filter(p => p.status == true))
            
            await productsManager.delete(pid)
            io.emit('server:listProducts', await productsManager.getAll())

        })

        socket.on('client:join', (email) => {
            console.log(email)
            socket.broadcast.emit('server:join', email)
        })

        socket.on('client:sendMsg', async (message) => {
            await chatManager.create(message);
            io.emit('server:historial', await chatManager.getAll());
        })


        socket.on('disconnect', () => {
            console.log('se ha desconectado un usuario');
        })
    })



    
}

export default io;