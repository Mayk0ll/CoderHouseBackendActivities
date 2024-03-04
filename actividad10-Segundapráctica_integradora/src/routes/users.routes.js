import { Router } from "express";
import UsersMongoManager from "../dao/managers/mongo/usersMongo.manager.js";

const router = Router();
const usersMongoManager = new UsersMongoManager();

router.get("/", async (req, res) => {
    try {
        const users = await usersMongoManager.getAll();
        res.send(users);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.get("/:uid", async (req, res) => {
    try {
        const user = await usersMongoManager.getById(req.params.uid);
        if (!user) return res.status(404).send({message: "User not found"});
        res.send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.put("/", async (req, res) => {
    try {
        const emailExist = await usersMongoManager.getByEmail(req.body.email);
        if (emailExist) return res.status(400).send({message: "Email already exists"});
        const user = await usersMongoManager.update(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.delete("/:uid", async (req, res) => {
    try {
        await usersMongoManager.delete(req.params.uid);
        res.send({message: "User deleted"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});


export default router;