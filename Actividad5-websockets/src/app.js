import express from 'express';
import { engine } from 'express-handlebars';
import dirname from "./utils.js";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from "./routes/views.router.js";
import { Server } from 'socket.io';
import io from './socket.js';

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', dirname+'/views');

app.use('/', express.static(dirname+"/public"));

console.log(dirname+"/public")

app.use('/api', productsRouter, cartsRouter);
app.use('/render', viewsRouter);

const httpServer = app.listen(port, () => console.log(`servidor escuchando el en puerto ${port}`));
const socketServer = new Server(httpServer);
io(socketServer);

