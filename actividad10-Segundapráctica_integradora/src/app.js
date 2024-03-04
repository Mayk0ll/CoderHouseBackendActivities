import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { _dirname } from "./utils/index.js";
import routes from "./routes/index.js";
import viewsRouter from "./routes/views.routes.js";
import io from './socket.js';
import connectionMongoDB from './configs/config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './configs/passport.config.js';
import initializePassportGithub from './configs/passportGithub.config.js';

dotenv.config();
const port = 8080;
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('secret'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        ttl: 60*60*12, //12 horas
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
}));
initializePassport();
initializePassportGithub();
app.use(passport.initialize());
app.use(passport.session());

connectionMongoDB();
console.log(process.env.JWT_SECRET)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', _dirname+'/views');

app.use('/', express.static(_dirname+"/public"));

app.use('/api', routes);
app.use('/render', viewsRouter);

const httpServer = app.listen(port, () => console.log(`servidor escuchando el en puerto ${port}`));
const socketServer = new Server(httpServer);
io(socketServer);

