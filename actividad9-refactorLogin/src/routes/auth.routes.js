import { Router } from "express";
import UsersMongoManager from "../dao/managers/mongo/usersMongo.manager.js";

const router = Router();
const usersMongoManager = new UsersMongoManager();

router.post("/login", async (req, res) => {
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

router.post("/register", async (req, res) => {
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



export default router;