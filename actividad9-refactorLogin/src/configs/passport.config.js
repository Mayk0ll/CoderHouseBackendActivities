import passport from 'passport';
import local from 'passport-local';
import UsersManager from '../dao/managers/mongo/usersMongo.manager.js';
import { hashPassword, isValidPassword } from '../utils/index.js';

const usersManager = new UsersManager();
const LocalStrategy = local.Strategy;

//Declaracion de una estrategia
//passport.use('nombreEstrategia', new LocalStrategy({}, async() => {}));

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {
        try {
            const user = await usersManager.getByEmail(email);
            if (user) done(null, false, { message: 'User already exists' });
            req.body.password = hashPassword(password);
            const createdUser = await usersManager.create(req.body);
            done(null, createdUser);
        } catch (error) {
            console.log(error)
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy({ 
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await usersManager.getByEmail(username);
            if (!user || !isValidPassword(password, user.password)) return done(null, false, { message: 'Email of password incorrect' });
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));
};

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.getById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default initializePassport;



/* 
    //app.js
    import passport from 'passport';
    import initializePassport from './configs/passport.config.js';
    import session from 'express-session';

    // Despues de la configuracion de session y mongoStore
    initializePassport();
    app.use(passport.initialize());
    app.use(passport.session()); 
*/

/*
    //routers

import passport from 'passport';

//router.post('/register', passport.authenticate('nombreEstrategia', {failureRedirect: '/rutaADireccionarEnCasoDeFallo'}, (req, res) => {}));
//router.get('/rutaADireccionarEnCasoDeFallo', (req, res) => { res.send({msg: 'Fallo el registro'}) }));

router.post('/register', passport.authenticate('nombreEstrategia', {failureRedirect: '/rutaADireccionarEnCasoDeFallo'}, (req, res) => {
    res.send({status: 'success', msg: 'Usuario creado correctamente'});
}));

*/