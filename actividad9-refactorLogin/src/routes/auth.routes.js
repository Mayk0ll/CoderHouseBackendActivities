import { Router } from "express";
import passport from "passport";
import UsersMongoManager from "../dao/managers/mongo/usersMongo.manager.js";

const router = Router();
const usersMongoManager = new UsersMongoManager();

router.post("/loginWithoutPassport", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await usersMongoManager.getByEmail(email);
        req.session.user = user;
        if (!user || user.password !== password) return res.status(401).send({message: "Email o password invalidos"});
        res.send({status: "success", data: user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.post("/registerWithoutPassport", async (req, res) => {
    try {
        const emailExist = await usersMongoManager.getByEmail(req.body.email);
        if (emailExist) return res.status(400).send({message: "Email already exists"});
        const user = await usersMongoManager.create(req.body);
        req.session.user = user;
        res.send({status: "success", data: user});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/auth/fail' }), (req, res) => {
    res.json({status: 'success', message: 'Usuario creado correctamente'});
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/auth/fail' }), (req, res) => {
    res.send({status: 'success', message: 'Usuario logueado correctamente'});
});

router.get('/fail', (req, res) => res.status(401).send({status: 'fail', message: 'algo salio mal'}));


router.get('/github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {});
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/auth/fail' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/render/products');
});






export default router;