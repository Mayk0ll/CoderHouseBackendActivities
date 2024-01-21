import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import dirname from "./utils.js";
import routes from "./routes/index.js";
import viewsRouter from "./routes/views.router.js";
import io from './socket.js';
import connectionMongoDB from './configs/config.js';

const port = 8080;
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectionMongoDB();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', dirname+'/views');

app.use('/', express.static(dirname+"/public"));

app.use('/api', routes);
app.use('/render', viewsRouter);

const httpServer = app.listen(port, () => console.log(`servidor escuchando el en puerto ${port}`));
const socketServer = new Server(httpServer);
io(socketServer);

